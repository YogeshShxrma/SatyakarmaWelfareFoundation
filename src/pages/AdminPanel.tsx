
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, FileText, Upload, Image, LogOut } from "lucide-react";
import BlogTable from "@/components/admin/BlogTable";
import NewsTable from "@/components/admin/NewsTable";
import MediaTable from "@/components/admin/MediaTable";
import BlogForm from "@/components/admin/BlogForm";
import NewsForm from "@/components/admin/NewsForm";
import MediaForm from "@/components/admin/MediaForm";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("blog");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Form states
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showMediaForm, setShowMediaForm] = useState(false);
  
  // Edit states
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [editingMedia, setEditingMedia] = useState(null);

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
    setRefreshTrigger(prev => prev + 1);
  };

  const handleBlogEdit = (blog: any) => {
    setEditingBlog(blog);
    setShowBlogForm(true);
  };

  const handleNewsEdit = (news: any) => {
    setEditingNews(news);
    setShowNewsForm(true);
  };

  const handleMediaEdit = (media: any) => {
    setEditingMedia(media);
    setShowMediaForm(true);
  };

  const handleFormSave = () => {
    setShowBlogForm(false);
    setShowNewsForm(false);
    setShowMediaForm(false);
    setEditingBlog(null);
    setEditingNews(null);
    setEditingMedia(null);
    refreshData();
  };

  const handleFormCancel = () => {
    setShowBlogForm(false);
    setShowNewsForm(false);
    setShowMediaForm(false);
    setEditingBlog(null);
    setEditingNews(null);
    setEditingMedia(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="font-bold text-xl text-gray-800">SatyaKarma Admin</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("blog")}
              className={`pb-2 border-b-2 font-medium text-sm ${
                activeTab === "blog"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <FileText className="inline h-5 w-5 mr-2" />
              Blog Posts
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={`pb-2 border-b-2 font-medium text-sm ${
                activeTab === "news"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Upload className="inline h-5 w-5 mr-2" />
              News Updates
            </button>
            <button
              onClick={() => setActiveTab("media")}
              className={`pb-2 border-b-2 font-medium text-sm ${
                activeTab === "media"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Image className="inline h-5 w-5 mr-2" />
              Media Upload
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* Blog Posts Tab */}
          {activeTab === "blog" && (
            <>
              {showBlogForm ? (
                <BlogForm
                  blog={editingBlog}
                  onSave={handleFormSave}
                  onCancel={handleFormCancel}
                />
              ) : (
                <BlogTable
                  onEdit={handleBlogEdit}
                  onAdd={() => setShowBlogForm(true)}
                  refreshTrigger={refreshTrigger}
                />
              )}
            </>
          )}

          {/* News Updates Tab */}
          {activeTab === "news" && (
            <>
              {showNewsForm ? (
                <NewsForm
                  news={editingNews}
                  onSave={handleFormSave}
                  onCancel={handleFormCancel}
                />
              ) : (
                <NewsTable
                  onEdit={handleNewsEdit}
                  onAdd={() => setShowNewsForm(true)}
                  refreshTrigger={refreshTrigger}
                />
              )}
            </>
          )}

          {/* Media Upload Tab */}
          {activeTab === "media" && (
            <>
              {showMediaForm ? (
                <MediaForm
                  media={editingMedia}
                  onSave={handleFormSave}
                  onCancel={handleFormCancel}
                />
              ) : (
                <MediaTable
                  onEdit={handleMediaEdit}
                  onAdd={() => setShowMediaForm(true)}
                  refreshTrigger={refreshTrigger}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
