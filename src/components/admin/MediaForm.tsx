
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Media {
  id?: string;
  title: string;
  description?: string;
  file_url: string;
  file_type: string;
}

interface MediaFormProps {
  media?: Media;
  onSave: () => void;
  onCancel: () => void;
}

const MediaForm = ({ media, onSave, onCancel }: MediaFormProps) => {
  const [formData, setFormData] = useState<Media>({
    title: "",
    description: "",
    file_url: "",
    file_type: "image"
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (media) {
      setFormData(media);
    }
  }, [media]);

  const uploadFile = async (file: File): Promise<string> => {
    // Enhanced file validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
    const maxSize = 10 * 1024 * 1024; // 10MB limit
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, GIF, WebP, MP4, and WebM files are allowed.');
    }
    
    if (file.size > maxSize) {
      throw new Error('File size too large. Maximum size is 10MB.');
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let fileUrl = formData.file_url;

      // Upload new file if selected
      if (file) {
        fileUrl = await uploadFile(file);
      }

      const mediaData = {
        ...formData,
        file_url: fileUrl
      };

      if (media?.id) {
        // Update existing media
        const { error } = await supabase
          .from('media')
          .update(mediaData)
          .eq('id', media.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Media updated successfully",
        });
      } else {
        // Create new media
        const { error } = await supabase
          .from('media')
          .insert([mediaData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Media uploaded successfully",
        });
      }

      onSave();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save media",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {media?.id ? 'Edit Media' : 'Upload New Media'}
        </h3>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Media Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />

        <select
          value={formData.file_type}
          onChange={(e) => setFormData({...formData, file_type: e.target.value})}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>

        {!media?.id && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload File
            </label>
            <input
              type="file"
              accept={formData.file_type === 'image' ? 'image/*' : 'video/*'}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required={!media?.id}
            />
          </div>
        )}

        {media?.id && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Replace File (optional)
            </label>
            <input
              type="file"
              accept={formData.file_type === 'image' ? 'image/*' : 'video/*'}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        )}

        <textarea
          placeholder="Description (optional)"
          value={formData.description || ""}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700">
            {loading ? 'Saving...' : (media?.id ? 'Update Media' : 'Upload Media')}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MediaForm;
