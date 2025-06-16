
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

interface Blog {
  id?: string;
  title: string;
  category: string;
  content: string;
  excerpt: string;
  image_url?: string;
}

interface BlogFormProps {
  blog?: Blog;
  onSave: () => void;
  onCancel: () => void;
}

const BlogForm = ({ blog, onSave, onCancel }: BlogFormProps) => {
  const [formData, setFormData] = useState<Blog>({
    title: "",
    category: "",
    content: "",
    excerpt: "",
    image_url: ""
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    if (blog) {
      setFormData(blog);
      setPreviewUrl(blog.image_url || "");
    }
  }, [blog]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Clear the external URL field since we're uploading a file
      setFormData(prev => ({ ...prev, image_url: "" }));
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setFormData(prev => ({ ...prev, image_url: "" }));
    
    // Clear the file input
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = formData.image_url;

      // Upload image if a file is selected
      if (selectedFile) {
        const uploadedUrl = await uploadImage(selectedFile);
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        } else {
          setLoading(false);
          return; // Stop if upload failed
        }
      }

      const blogData = {
        title: formData.title,
        category: formData.category,
        content: formData.content,
        excerpt: formData.excerpt,
        image_url: finalImageUrl,
      };

      if (blog?.id) {
        // Update existing blog
        const { error } = await supabase
          .from('blogs')
          .update({
            ...blogData,
            updated_at: new Date().toISOString()
          })
          .eq('id', blog.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Blog post updated successfully",
        });
      } else {
        // Create new blog
        const { error } = await supabase
          .from('blogs')
          .insert([blogData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Blog post created successfully",
        });
      }

      onSave();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
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
          {blog?.id ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h3>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            placeholder="Blog Post Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
        
        {/* Image Upload Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label htmlFor="image-upload" className="block text-sm font-medium mb-2">
                Upload Image
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image-upload')?.click()}
                  disabled={uploading}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {uploading ? 'Uploading...' : 'Choose Image'}
                </Button>
                {(previewUrl || selectedFile) && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeImage}
                    className="flex items-center gap-1"
                  >
                    <X className="h-4 w-4" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* OR separator */}
          <div className="flex items-center gap-4">
            <hr className="flex-1" />
            <span className="text-sm text-gray-500">OR</span>
            <hr className="flex-1" />
          </div>

          <Input
            placeholder="Image URL (external link)"
            value={formData.image_url || ""}
            onChange={(e) => {
              setFormData({...formData, image_url: e.target.value});
              if (e.target.value) {
                setSelectedFile(null);
                setPreviewUrl(e.target.value);
              }
            }}
            disabled={!!selectedFile}
          />

          {/* Image Preview */}
          {previewUrl && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Preview</label>
              <div className="relative w-full max-w-md">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border"
                  onError={() => {
                    toast({
                      title: "Error",
                      description: "Failed to load image preview",
                      variant: "destructive",
                    });
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <textarea
          placeholder="Brief excerpt (appears in blog listing)"
          value={formData.excerpt}
          onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <textarea
          placeholder="Full blog post content"
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          rows={10}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <div className="flex gap-4">
          <Button 
            type="submit" 
            disabled={loading || uploading} 
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? 'Saving...' : (blog?.id ? 'Update Post' : 'Create Post')}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
