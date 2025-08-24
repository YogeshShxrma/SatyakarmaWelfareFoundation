
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface News {
  id?: string;
  title: string;
  description: string;
  date: string;
  priority: string;
}

interface NewsFormProps {
  news?: News;
  onSave: () => void;
  onCancel: () => void;
}

const NewsForm = ({ news, onSave, onCancel }: NewsFormProps) => {
  const [formData, setFormData] = useState<News>({
    title: "",
    description: "",
    date: "",
    priority: "normal"
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (news) {
      setFormData(news);
    }
  }, [news]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (news?.id) {
        // Update existing news
        const { error } = await supabase
          .from('news')
          .update({
            title: formData.title,
            description: formData.description,
            date: formData.date,
            priority: formData.priority,
            updated_at: new Date().toISOString()
          })
          .eq('id', news.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "News update saved successfully",
        });
      } else {
        // Create new news
        const { error } = await supabase
          .from('news')
          .insert([formData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "News update created successfully",
        });
      }

      onSave();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save news update",
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
          {news?.id ? 'Edit News Update' : 'Create News Update'}
        </h3>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="News Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required
          />
          <select
            value={formData.priority}
            onChange={(e) => setFormData({...formData, priority: e.target.value})}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="normal">Normal Priority</option>
            <option value="high">High Priority</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <textarea
          placeholder="News description..."
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={6}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
            {loading ? 'Saving...' : (news?.id ? 'Update News' : 'Create News')}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;
