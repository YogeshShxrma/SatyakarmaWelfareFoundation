
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SubscriptionRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: SubscriptionRequest = await req.json();

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send welcome email
    const emailResponse = await resend.emails.send({
      from: "SatyaKarma <newsletter@satyakarma.org>",
      to: [email],
      subject: "Welcome to SatyaKarma Newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #16a34a;">Welcome to SatyaKarma!</h1>
          <p>Thank you for subscribing to our newsletter. You'll receive updates about:</p>
          <ul>
            <li>Environmental initiatives and tree plantation drives</li>
            <li>Children's health and wellness programs</li>
            <li>Community partnership opportunities</li>
            <li>Plastic pollution awareness campaigns</li>
          </ul>
          <p>Together, we can create a sustainable future for our communities.</p>
          <p style="color: #6b7280;">कर्म में सत्य की खोज करें</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 14px; color: #9ca3af;">
            SatyaKarma Welfare Foundation Society<br>
            Searching for truth through action
          </p>
        </div>
      `,
    });

    console.log("Newsletter subscription email sent:", emailResponse);

    return new Response(
      JSON.stringify({ message: "Successfully subscribed to newsletter!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in newsletter subscription:", error);
    return new Response(
      JSON.stringify({ error: "Failed to subscribe. Please try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
