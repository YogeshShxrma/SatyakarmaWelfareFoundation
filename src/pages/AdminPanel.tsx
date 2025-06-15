
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminTabNavigation from "@/components/admin/AdminTabNavigation";
import AdminContent from "@/components/admin/AdminContent";
import { useAdminState } from "@/hooks/useAdminState";

const AdminPanel = () => {
  const navigate = useNavigate();
  const adminState = useAdminState();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("adminAuth");
    if (!isAuthenticated) {
      navigate("/admin-login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminTabNavigation
          activeTab={adminState.activeTab}
          onTabChange={adminState.handleTabChange}
        />

        <AdminContent
          activeTab={adminState.activeTab}
          refreshTrigger={adminState.refreshTrigger}
          showBlogForm={adminState.showBlogForm}
          showNewsForm={adminState.showNewsForm}
          showMediaForm={adminState.showMediaForm}
          editingBlog={adminState.editingBlog}
          editingNews={adminState.editingNews}
          editingMedia={adminState.editingMedia}
          onBlogEdit={adminState.handleBlogEdit}
          onBlogAdd={adminState.handleBlogAdd}
          onNewsEdit={adminState.handleNewsEdit}
          onNewsAdd={adminState.handleNewsAdd}
          onMediaEdit={adminState.handleMediaEdit}
          onMediaAdd={adminState.handleMediaAdd}
          onFormSave={adminState.handleFormSave}
          onFormCancel={adminState.handleFormCancel}
        />
      </div>
    </div>
  );
};

export default AdminPanel;
