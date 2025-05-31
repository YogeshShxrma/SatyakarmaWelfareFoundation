
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Upload, FileText, Image, Video, LogOut } from "lucide-react";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("blog");

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

  const [blogPost, setBlogPost] = useState({
    title: "",
    category: "",
    content: "",
    excerpt: "",
    image: null
  });

  const [newsUpdate, setNewsUpdate] = useState({
    title: "",
    description: "",
    date: "",
    priority: "normal"
  });

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Blog post submitted:", blogPost);
    // Here you would typically send the data to your backend
    alert("Blog post saved successfully!");
    setBlogPost({ title: "", category: "", content: "", excerpt: "", image: null });
  };

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("News update submitted:", newsUpdate);
    // Here you would typically send the data to your backend
    alert("News update saved successfully!");
    setNewsUpdate({ title: "", description: "", date: "", priority: "normal" });
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

        {/* Blog Post Tab */}
        {activeTab === "blog" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Blog Post</h2>
            <form onSubmit={handleBlogSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Blog Post Title"
                  value={blogPost.title}
                  onChange={(e) => setBlogPost({...blogPost, title: e.target.value})}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <select
                  value={blogPost.category}
                  onChange={(e) => setBlogPost({...blogPost, category: e.target.value})}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Tree Plantation">Tree Plantation</option>
                  <option value="Children's Health">Children's Health</option>
                  <option value="Environmental">Environmental</option>
                  <option value="Education">Education</option>
                  <option value="Conservation">Conservation</option>
                  <option value="Community">Community</option>
                </select>
              </div>
              
              <textarea
                placeholder="Brief excerpt (appears in blog listing)"
                value={blogPost.excerpt}
                onChange={(e) => setBlogPost({...blogPost, excerpt: e.target.value})}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              ></textarea>

              <textarea
                placeholder="Full blog post content"
                value={blogPost.content}
                onChange={(e) => setBlogPost({...blogPost, content: e.target.value})}
                rows={10}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              ></textarea>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBlogPost({...blogPost, image: e.target.files?.[0] || null})}
                  className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Publish Blog Post
              </button>
            </form>
          </div>
        )}

        {/* News Updates Tab */}
        {activeTab === "news" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create News Update</h2>
            <form onSubmit={handleNewsSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="News Title"
                value={newsUpdate.title}
                onChange={(e) => setNewsUpdate({...newsUpdate, title: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={newsUpdate.date}
                  onChange={(e) => setNewsUpdate({...newsUpdate, date: e.target.value})}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <select
                  value={newsUpdate.priority}
                  onChange={(e) => setNewsUpdate({...newsUpdate, priority: e.target.value})}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="normal">Normal Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <textarea
                placeholder="News description..."
                value={newsUpdate.description}
                onChange={(e) => setNewsUpdate({...newsUpdate, description: e.target.value})}
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              ></textarea>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Publish News Update
              </button>
            </form>
          </div>
        )}

        {/* Media Upload Tab */}
        {activeTab === "media" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Event Media</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Image className="inline h-5 w-5 mr-2" />
                  Upload Photos
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Upload photos from recent events, tree plantation drives, workshops, etc.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Video className="inline h-5 w-5 mr-2" />
                  Upload Videos
                </label>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Upload videos showcasing activities, testimonials, or event highlights.
                </p>
              </div>

              <textarea
                placeholder="Describe the uploaded media (event details, date, participants, etc.)"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>

              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Upload Media
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
