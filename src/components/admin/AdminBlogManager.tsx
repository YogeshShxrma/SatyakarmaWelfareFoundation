
import { useState } from "react";
import BlogForm from "@/components/admin/BlogForm";
import BlogTable from "@/components/admin/BlogTable";

interface Blog {
  id?: string;
  title: string;
  category: string;
  content: string;
  excerpt: string;
  image_url?: string;
}

interface AdminBlogManagerProps {
  refreshTrigger: number;
  onRefresh: () => void;
}

const AdminBlogManager = ({ refreshTrigger, onRefresh }: AdminBlogManagerProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingBlog(null);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingBlog(null);
    onRefresh();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBlog(null);
  };

  return (
    <>
      {showForm ? (
        <BlogForm
          blog={editingBlog}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <BlogTable
          onEdit={handleEdit}
          onAdd={handleAdd}
          refreshTrigger={refreshTrigger}
        />
      )}
    </>
  );
};

export default AdminBlogManager;
