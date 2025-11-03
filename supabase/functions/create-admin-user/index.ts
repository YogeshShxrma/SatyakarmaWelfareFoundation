import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Rate limiting: Track requests by IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 3 // Max attempts per window
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordMinLength = 8

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const now = Date.now()
    const rateLimitData = rateLimitMap.get(clientIP)
    
    if (rateLimitData) {
      if (now < rateLimitData.resetTime) {
        if (rateLimitData.count >= RATE_LIMIT) {
          return new Response(
            JSON.stringify({ error: 'Too many requests. Please try again later.' }),
            { 
              status: 429, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }
        rateLimitData.count++
      } else {
        rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
      }
    } else {
      rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    }

    // Require authentication - only existing admins can create new admins
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create a Supabase client with the service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify the requesting user is an admin
    const supabaseUser = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    const { data: { user }, error: userError } = await supabaseUser.auth.getUser()
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication token' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Check if requesting user is admin using their session
    const { data: isAdmin, error: adminCheckError } = await supabaseUser.rpc('is_admin')
    if (adminCheckError || !isAdmin) {
      await supabaseAdmin
        .from('admin_audit_log')
        .insert({
          admin_email: user.email || 'unknown',
          action: 'UNAUTHORIZED_ADMIN_CREATION_ATTEMPT',
          table_name: 'admin_users'
        })
      
      return new Response(
        JSON.stringify({ error: 'Admin privileges required' }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const { email, password } = await req.json()

    // Enhanced input validation
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (password.length < passwordMinLength) {
      return new Response(
        JSON.stringify({ error: `Password must be at least ${passwordMinLength} characters long` }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers()
    const userExists = existingUser.users?.some(u => u.email === email)
    
    if (userExists) {
      await supabaseAdmin
        .from('admin_audit_log')
        .insert({
          admin_email: user.email || 'unknown',
          action: 'DUPLICATE_ADMIN_CREATION_ATTEMPT',
          table_name: 'admin_users'
        })
      
      return new Response(
        JSON.stringify({ error: 'User with this email already exists' }),
        { 
          status: 409, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create user in auth.users
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true // Auto-confirm email for admin users
    })

    if (authError) {
      return new Response(
        JSON.stringify({ error: authError.message }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Add user to admin_users table
    const { error: adminError } = await supabaseAdmin
      .from('admin_users')
      .insert([
        {
          id: authData.user.id,
          email: email,
          password_hash: 'managed_by_supabase_auth' // Password is handled by Supabase Auth
        }
      ])

    if (adminError) {
      // Clean up the auth user if admin_users insert failed
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      
      // Log failed admin creation
      await supabaseAdmin
        .from('admin_audit_log')
        .insert({
          admin_email: user.email || 'unknown',
          action: 'ADMIN_CREATION_FAILED',
          table_name: 'admin_users'
        })
      
      return new Response(
        JSON.stringify({ error: 'Failed to create admin user' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Log successful admin creation
    await supabaseAdmin
      .from('admin_audit_log')
      .insert({
        admin_email: user.email || 'unknown',
        action: 'ADMIN_CREATED',
        table_name: 'admin_users',
        record_id: authData.user.id
      })

    return new Response(
      JSON.stringify({ 
        message: 'Admin user created successfully',
        user_id: authData.user.id 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    // Log unexpected errors without exposing details
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})