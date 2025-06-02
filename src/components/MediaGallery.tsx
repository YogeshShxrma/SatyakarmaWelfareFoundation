
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Image, Video, Play } from "lucide-react";

interface MediaItem {
  id: string;
  title: string;
  description?: string;
  file_url: string;
  file_type: string;
  created_at: string;
}

const MediaGallery = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("all");

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMedia = selectedType === "all" 
    ? media 
    : media.filter(item => item.file_type === selectedType);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Media Gallery</h2>
          <div className="text-center">Loading media...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Media Gallery</h2>
        
        {/* Filter Buttons */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setSelectedType("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedType === "all" 
                ? "bg-green-600 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Media
          </button>
          <button
            onClick={() => setSelectedType("image")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              selectedType === "image" 
                ? "bg-green-600 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Image className="h-4 w-4" />
            Images
          </button>
          <button
            onClick={() => setSelectedType("video")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              selectedType === "video" 
                ? "bg-green-600 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Video className="h-4 w-4" />
            Videos
          </button>
        </div>

        {filteredMedia.length === 0 ? (
          <div className="text-center text-gray-600">No media items found.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedia.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100 relative">
                  {item.file_type === 'image' ? (
                    <img 
                      src={item.file_url} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <Play className="h-12 w-12 text-gray-400" />
                      <video 
                        src={item.file_url}
                        className="absolute inset-0 w-full h-full object-cover"
                        poster=""
                      />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaGallery;
