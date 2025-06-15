
import { useState } from "react";
import MediaForm from "@/components/admin/MediaForm";
import MediaTable from "@/components/admin/MediaTable";

interface Media {
  id?: string;
  title: string;
  description?: string;
  file_url: string;
  file_type: string;
}

interface AdminMediaManagerProps {
  refreshTrigger: number;
  onRefresh: () => void;
}

const AdminMediaManager = ({ refreshTrigger, onRefresh }: AdminMediaManagerProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editingMedia, setEditingMedia] = useState<Media | null>(null);

  const handleEdit = (media: Media) => {
    setEditingMedia(media);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingMedia(null);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingMedia(null);
    onRefresh();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMedia(null);
  };

  return (
    <>
      {showForm ? (
        <MediaForm media={editingMedia} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <MediaTable
          onEdit={handleEdit}
          onAdd={handleAdd}
          refreshTrigger={refreshTrigger}
        />
      )}
    </>
  );
};

export default AdminMediaManager;
