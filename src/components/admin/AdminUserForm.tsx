import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}

interface AdminUserFormProps {
  admin: AdminUser | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const AdminUserForm = ({ admin, onSuccess, onCancel }: AdminUserFormProps) => {
  const [email, setEmail] = useState(admin?.email || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (!admin && !email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Authentication required");
        return;
      }

      if (admin) {
        // Change password for existing admin
        const response = await fetch(
          `https://geckkosfbfuowgstexiv.supabase.co/functions/v1/change-admin-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({ 
              userId: admin.id, 
              newPassword: password 
            }),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to change password");
        }

        toast.success("Password changed successfully");
      } else {
        // Create new admin
        const response = await fetch(
          `https://geckkosfbfuowgstexiv.supabase.co/functions/v1/create-admin-user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({ email, password }),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to create admin");
        }

        toast.success("Admin user created successfully");
      }

      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mb-8">
      <h3 className="text-lg font-semibold">
        {admin ? "Change Admin Password" : "Create New Admin"}
      </h3>
      
      {!admin && (
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@example.com"
          />
        </div>
      )}

      {admin && (
        <div>
          <Label>Admin Email</Label>
          <Input value={admin.email} disabled />
        </div>
      )}

      <div>
        <Label htmlFor="password">
          {admin ? "New Password" : "Password"}
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          placeholder="Minimum 8 characters"
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : admin ? "Change Password" : "Create Admin"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AdminUserForm;
