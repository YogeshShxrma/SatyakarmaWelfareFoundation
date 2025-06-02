
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
    if (blog) {
      setFormData(blog);
    }
  }, [blog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (blog?.id) {
        // Update existing blog
        const { error } = await supabase
          .from('blogs')
          .update({
            title: formData.title,
            category: formData.category,
            content: formData.content,
            excerpt: formData.excerpt,
            image_url: formData.image_url,
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
          .insert([formData]);

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
        
        <Input
          placeholder="Image URL (optional)"
          value={formData.image_url || ""}
          onChange={(e) => setFormData({...formData, image_url: e.target.value})}
        />

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
          <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
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
