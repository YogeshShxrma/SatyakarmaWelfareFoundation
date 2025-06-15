
import { useState } from "react";
import NewsForm from "@/components/admin/NewsForm";
import NewsTable from "@/components/admin/NewsTable";

interface News {
  id?: string;
  title: string;
  description: string;
  date: string;
  priority: string;
}

interface AdminNewsManagerProps {
  refreshTrigger: number;
  onRefresh: () => void;
}

const AdminNewsManager = ({ refreshTrigger, onRefresh }: AdminNewsManagerProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);

  const handleEdit = (news: News) => {
    setEditingNews(news);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingNews(null);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingNews(null);
    onRefresh();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingNews(null);
  };

  return (
    <>
      {showForm ? (
        <NewsForm news={editingNews} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <NewsTable
          onEdit={handleEdit}
          onAdd={handleAdd}
          refreshTrigger={refreshTrigger}
        />
      )}
    </>
  );
};

export default AdminNewsManager;
