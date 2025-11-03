
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminPanelLayout from "@/components/admin/AdminPanelLayout";
import AdminTabs from "@/components/admin/AdminTabs";
import AdminBlogManager from "@/components/admin/AdminBlogManager";
import AdminNewsManager from "@/components/admin/AdminNewsManager";
import AdminMediaManager from "@/components/admin/AdminMediaManager";
import AdminMembersManager from "@/components/admin/AdminMembersManager";
import AdminUsersManager from "@/components/admin/AdminUsersManager";

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

      // Use the secure is_admin function to verify admin status
      const { data: isAdminResult, error } = await supabase
        .rpc('is_admin');

      if (error || !isAdminResult) {
        await supabase.auth.signOut();
        navigate("/admin-login");
      }
    };

    checkAdminAuth();
    
    // Set up auth state listener for real-time auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          navigate("/admin-login");
        } else if (event === 'SIGNED_IN') {
          // Verify admin status on sign in
          const { data: isAdminResult, error } = await supabase.rpc('is_admin');
          if (error || !isAdminResult) {
            await supabase.auth.signOut();
            navigate("/admin-login");
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
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
        {activeTab === "admins" && (
          <AdminUsersManager refreshTrigger={refreshTrigger} onRefresh={refreshData} />
        )}
      </div>
    </AdminPanelLayout>
  );
};

export default AdminPanel;
