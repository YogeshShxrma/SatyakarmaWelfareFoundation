import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  priority: string;
  created_at: string;
}
const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchNews();
  }, []);
  const fetchNews = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('news').select('*').order('date', {
        ascending: false
      }).limit(5);
      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };
  if (loading) {
    return <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Latest News</h2>
          <div className="text-center">Loading news...</div>
        </div>
      </section>;
  }
  return <section className="py-[32px] bg-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Latest News</h2>
        
        {news.length === 0 ? <div className="text-center text-gray-600">No news updates available.</div> : <div className="space-y-6">
            {news.map(item => <article key={item.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex-1">{item.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)} ml-4`}>
                    {item.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                <div className="text-sm text-gray-500">
                  {formatDate(item.date)}
                </div>
              </article>)}
          </div>}
      </div>
    </section>;
};
export default News;