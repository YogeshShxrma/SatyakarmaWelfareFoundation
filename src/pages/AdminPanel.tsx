import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, FileText, Upload, Image, LogOut } from "lucide-react";
import BlogTable from "@/components/admin/BlogTable";
import NewsTable from "@/components/admin/NewsTable";
import MediaTable from "@/components/admin/MediaTable";
import BlogForm from "@/components/admin/BlogForm";
import NewsForm from "@/components/admin/NewsForm";
import MediaForm from "@/components/admin/MediaForm";
import Button from "@/components/Button";

interface Blog {
  id?: string;
  title: string;
  category: string;
  content: string;
  excerpt: string;
  image_url?: string;
}

interface News {
  id?: string;
  title: string;
  description: string;
  date: string;
  priority: string;
}

interface Media {
  id?: string;
  title: string;
  description?: string;
  file_url: string;
  file_type: string;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("blog");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Form states
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showMediaForm, setShowMediaForm] = useState(false);
  
  // Edit states
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [editingMedia, setEditingMedia] = useState<Media | null>(null);

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

  const handleBlogEdit = (blog: Blog) => {
    console.log('Editing blog:', blog);
    setEditingBlog(blog);
    setShowBlogForm(true);
  };

  const handleBlogAdd = () => {
    console.log('Adding new blog');
    setEditingBlog(null);
    setShowBlogForm(true);
  };

  const handleNewsEdit = (news: News) => {
    console.log('Editing news:', news);
    setEditingNews(news);
    setShowNewsForm(true);
  };

  const handleNewsAdd = () => {
    console.log('Adding new news');
    setEditingNews(null);
    setShowNewsForm(true);
  };

  const handleMediaEdit = (media: Media) => {
    console.log('Editing media:', media);
    setEditingMedia(media);
    setShowMediaForm(true);
  };

  const handleMediaAdd = () => {
    console.log('Adding new media');
    setEditingMedia(null);
    setShowMediaForm(true);
  };

  const handleFormSave = () => {
    console.log('Form saved, refreshing data');
    setShowBlogForm(false);
    setShowNewsForm(false);
    setShowMediaForm(false);
    setEditingBlog(null);
    setEditingNews(null);
    setEditingMedia(null);
    refreshData();
  };

  const handleFormCancel = () => {
    console.log('Form cancelled');
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
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => navigate("/")}>
                Go to Home
              </Button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => {
                setActiveTab("blog");
                handleFormCancel();
              }}
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
              onClick={() => {
                setActiveTab("news");
                handleFormCancel();
              }}
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
              onClick={() => {
                setActiveTab("media");
                handleFormCancel();
              }}
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
                  onAdd={handleBlogAdd}
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
                  onAdd={handleNewsAdd}
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
                  onAdd={handleMediaAdd}
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
