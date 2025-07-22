import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in production, this should be more secure
    if (credentials.username === "admin" && credentials.password === "satyakarma2024") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin-panel");
    } else {
      setError("Invalid credentials");
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
              Username
            </label>
            <input type="text" value={credentials.username} onChange={e => setCredentials({
            ...credentials,
            username: e.target.value
          })} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" required />
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

          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Login
          </button>
        </form>

        {/* Go to Home Button */}
        <div className="mt-4 flex justify-center">
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo credentials:</p>
          <p>Username: admin</p>
          <p>Password: satyakarma2024</p>
        </div>
      </div>
    </div>;
};
export default AdminLogin;