
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminPanelLayout from "@/components/admin/AdminPanelLayout";
import AdminTabs from "@/components/admin/AdminTabs";
import AdminBlogManager from "@/components/admin/AdminBlogManager";
import AdminNewsManager from "@/components/admin/AdminNewsManager";
import AdminMediaManager from "@/components/admin/AdminMediaManager";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("blog");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("adminAuth");
    if (!isAuthenticated) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <AdminPanelLayout onLogout={handleLogout}>
        <AdminTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onTabSwitch={handleTabSwitch}
        />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300">
          {activeTab === "blog" && (
            <AdminBlogManager refreshTrigger={refreshTrigger} onRefresh={refreshData} />
          )}
          {activeTab === "news" && (
            <AdminNewsManager refreshTrigger={refreshTrigger} onRefresh={refreshData} />
          )}
          {activeTab === "media" && (
            <AdminMediaManager refreshTrigger={refreshTrigger} onRefresh={refreshData} />
          )}
        </div>
      </AdminPanelLayout>
    </div>
  );
};

export default AdminPanel;
