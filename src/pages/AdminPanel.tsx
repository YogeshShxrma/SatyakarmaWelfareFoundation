
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminPanelLayout from "@/components/admin/AdminPanelLayout";
import AdminTabs from "@/components/admin/AdminTabs";
import AdminBlogManager from "@/components/admin/AdminBlogManager";
import AdminNewsManager from "@/components/admin/AdminNewsManager";
import AdminMediaManager from "@/components/admin/AdminMediaManager";
import AdminMembersManager from "@/components/admin/AdminMembersManager";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("blog");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const checkAdminAuth = async () => {
      // Check if user is authenticated with Supabase
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin-login");
        return;
      }

      // Verify user is an admin
      const { data: adminData, error } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', session.user.email)
        .single();

      if (error || !adminData) {
        await supabase.auth.signOut();
        localStorage.removeItem("adminAuth");
        navigate("/admin-login");
      }
    };

    checkAdminAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("adminAuth");
    navigate("/admin-login");
  };

  const refreshData = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // Cancel active forms for tab switch, handled inside managers by their state reset.
  const handleTabSwitch = () => {
    // intentionally left blank, as modal state resets automatically when switching tabs due to remount
  };

  return (
    <AdminPanelLayout onLogout={handleLogout}>
      <AdminTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onTabSwitch={handleTabSwitch}
      />

      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === "blog" && (
          <AdminBlogManager refreshTrigger={refreshTrigger} onRefresh={refreshData} />
        )}
        {activeTab === "news" && (
          <AdminNewsManager refreshTrigger={refreshTrigger} onRefresh={refreshData} />
        )}
        {activeTab === "media" && (
          <AdminMediaManager refreshTrigger={refreshTrigger} onRefresh={refreshData} />
        )}
        {activeTab === "members" && (
          <AdminMembersManager refreshTrigger={refreshTrigger} onRefresh={refreshData} />
        )}
      </div>
    </AdminPanelLayout>
  );
};

export default AdminPanel;
