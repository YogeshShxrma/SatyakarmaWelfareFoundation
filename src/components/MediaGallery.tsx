
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Image, Video, Play } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
interface MediaItem {
  id: string;
  title: string;
  description?: string;
  file_url: string;
  file_type: string;
  created_at: string;
  // If you add localized fields in future, add here: e.g.
  // title_hi?: string;
  // description_hi?: string;
}
const MediaGallery = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("all");
  const { t, lang } = useTranslation();
  useEffect(() => {
    fetchMedia();
  }, []);
  const fetchMedia = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('media').select('*').order('created_at', {
        ascending: false
      });
      if (error) throw error;
      setMedia(data || []);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };
  const filteredMedia = selectedType === "all" ? media : media.filter(item => item.file_type === selectedType);

  // Helper for translated media type label (for card badges, etc)
  const getFileTypeLabel = (type: string) => {
    switch (type) {
      case "image":
        return t("mediaGallery.images");
      case "video":
        return t("mediaGallery.videos");
      default:
        return t("mediaGallery.allMedia");
    }
  };

  // Helper for localized title/desc if you add more fields in future
  const getTitle = (item: MediaItem) => {
    // If you add title_hi to db, use: if (lang==="hi" && item.title_hi) return item.title_hi;
    return item.title;
  };
  const getDescription = (item: MediaItem) => {
    // If you add description_hi to db, use: if (lang==="hi" && item.description_hi) return item.description_hi;
    return item.description;
  };

  if (loading) {
    return <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t("mediaGallery.title")}</h2>
          <div className="text-center">{t("mediaGallery.loading")}</div>
        </div>
      </section>;
  }
  return <section className="py-16 bg-white">
      <div className="max-w-max mx-auto px-4 sm:px-6 lg:px-8 py-[32px] bg-green-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{t("mediaGallery.title")}</h2>
        
        {/* Filter Buttons */}
        <div className="flex justify-center mb-8 space-x-4">
          <button onClick={() => setSelectedType("all")} className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedType === "all" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {t("mediaGallery.allMedia")}
          </button>
          <button onClick={() => setSelectedType("image")} className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${selectedType === "image" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            <Image className="h-4 w-4" />
            {t("mediaGallery.images")}
          </button>
          <button onClick={() => setSelectedType("video")} className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${selectedType === "video" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            <Video className="h-4 w-4" />
            {t("mediaGallery.videos")}
          </button>
        </div>

        {filteredMedia.length === 0 ? <div className="text-center text-gray-600">{t("mediaGallery.noItems")}</div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedia.map(item => <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100 relative">
                  {item.file_type === 'image' ? <img src={item.file_url} alt={getTitle(item)} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <Play className="h-12 w-12 text-gray-400" />
                      <video src={item.file_url} className="absolute inset-0 w-full h-full object-cover" poster="" />
                    </div>}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{getTitle(item)}</h3>
                  {getDescription(item) && <p className="text-gray-600 text-sm">{getDescription(item)}</p>}
                  {/* Example of translated type label */}
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-200 text-green-800 font-medium">
                      {getFileTypeLabel(item.file_type)}
                    </span>
                  </div>
                </div>
              </div>)}
          </div>}
      </div>
    </section>;
};
export default MediaGallery;

