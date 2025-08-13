import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Authenticate with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (authError) {
        setError("Invalid admin credentials");
        return;
      }

      if (authData.user) {
        // Check if the user exists in admin_users table
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('id')
          .eq('email', credentials.email)
          .single();

        if (adminError || !adminData) {
          // Sign out if not an admin
          await supabase.auth.signOut();
          setError("Access denied. Admin privileges required.");
          return;
        }

        // Store admin session
        localStorage.setItem("adminAuth", "true");
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        });
        navigate("/admin-panel");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <img src="/assets/logo.png" alt="SatyaKarma Logo" draggable={false} className="h-24 w-24 mx-auto mb-4 rounded-full object-cover shadow-xl" />
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-600">SatyaKarma Foundation Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input 
              type="email" 
              value={credentials.email} 
              onChange={e => setCredentials({
                ...credentials,
                email: e.target.value
              })} 
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input type="password" value={credentials.password} onChange={e => setCredentials({
            ...credentials,
            password: e.target.value
          })} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" required />
          </div>

          {error && <div className="text-red-600 text-sm text-center">
              {error}
            </div>}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Go to Home Button */}
        <div className="mt-4 flex justify-center">
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Use your admin email and password to access the panel</p>
        </div>
      </div>
    </div>;
};
export default AdminLogin;