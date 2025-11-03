import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import AdminUserTable from "./AdminUserTable";
import AdminUserForm from "./AdminUserForm";

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}

interface AdminUsersManagerProps {
  refreshTrigger: number;
  onRefresh: () => void;
}

const AdminUsersManager = ({ refreshTrigger, onRefresh }: AdminUsersManagerProps) => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);

  useEffect(() => {
    fetchAdmins();
  }, [refreshTrigger]);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAdmins(data || []);
    } catch (error: any) {
      toast.error("Failed to fetch admins: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingAdmin(null);
    setShowForm(true);
  };

  const handleChangePassword = (admin: AdminUser) => {
    setEditingAdmin(admin);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admin? This action cannot be undone.")) {
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Authentication required");
        return;
      }

      const response = await fetch(
        `https://geckkosfbfuowgstexiv.supabase.co/functions/v1/delete-admin-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ userId: id }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete admin");
      }

      toast.success("Admin deleted successfully");
      fetchAdmins();
      onRefresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete admin");
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingAdmin(null);
    fetchAdmins();
    onRefresh();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingAdmin(null);
  };

  return (
    <div>
      {!showForm && (
        <Button onClick={handleCreate} className="mb-4">
          Add Admin User
        </Button>
      )}

      {showForm && (
        <AdminUserForm
          admin={editingAdmin}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      {!showForm && (
        <AdminUserTable
          admins={admins}
          loading={loading}
          onChangePassword={handleChangePassword}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default AdminUsersManager;
