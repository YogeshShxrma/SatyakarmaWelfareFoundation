
import BlogTable from "@/components/admin/BlogTable";
import NewsTable from "@/components/admin/NewsTable";
import MediaTable from "@/components/admin/MediaTable";
import BlogForm from "@/components/admin/BlogForm";
import NewsForm from "@/components/admin/NewsForm";
import MediaForm from "@/components/admin/MediaForm";

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

interface AdminContentProps {
  activeTab: string;
  refreshTrigger: number;
  
  // Form states
  showBlogForm: boolean;
  showNewsForm: boolean;
  showMediaForm: boolean;
  
  // Edit states
  editingBlog: Blog | null;
  editingNews: News | null;
  editingMedia: Media | null;
  
  // Handlers
  onBlogEdit: (blog: Blog) => void;
  onBlogAdd: () => void;
  onNewsEdit: (news: News) => void;
  onNewsAdd: () => void;
  onMediaEdit: (media: Media) => void;
  onMediaAdd: () => void;
  onFormSave: () => void;
  onFormCancel: () => void;
}

const AdminContent = ({
  activeTab,
  refreshTrigger,
  showBlogForm,
  showNewsForm,
  showMediaForm,
  editingBlog,
  editingNews,
  editingMedia,
  onBlogEdit,
  onBlogAdd,
  onNewsEdit,
  onNewsAdd,
  onMediaEdit,
  onMediaAdd,
  onFormSave,
  onFormCancel,
}: AdminContentProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Blog Posts Tab */}
      {activeTab === "blog" && (
        <>
          {showBlogForm ? (
            <BlogForm
              blog={editingBlog}
              onSave={onFormSave}
              onCancel={onFormCancel}
            />
          ) : (
            <BlogTable
              onEdit={onBlogEdit}
              onAdd={onBlogAdd}
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
              onSave={onFormSave}
              onCancel={onFormCancel}
            />
          ) : (
            <NewsTable
              onEdit={onNewsEdit}
              onAdd={onNewsAdd}
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
              onSave={onFormSave}
              onCancel={onFormCancel}
            />
          ) : (
            <MediaTable
              onEdit={onMediaEdit}
              onAdd={onMediaAdd}
              refreshTrigger={refreshTrigger}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AdminContent;
