import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Trash2, ExternalLink } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SiteAsset {
  id: string;
  name: string;
  description: string;
  file_path: string;
  file_url: string;
  category: string;
  created_at: string;
}

export const AdminSiteAssetsManager = () => {
  const [assets, setAssets] = useState<SiteAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("logo");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const { data, error } = await supabase
        .from("site_assets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAssets(data || []);
    } catch (error) {
      console.error("Error fetching assets:", error);
      toast({
        title: "Error",
        description: "Failed to load site assets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name) {
      toast({
        title: "Error",
        description: "Please provide a name and select a file",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      // Upload file to storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${name.replace(/\s+/g, "-").toLowerCase()}.${fileExt}`;
      const filePath = `${category}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("site-assets")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("site-assets")
        .getPublicUrl(filePath);

      // Save to database
      const { error: dbError } = await supabase
        .from("site_assets")
        .insert({
          name,
          description,
          category,
          file_path: filePath,
          file_url: publicUrl,
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Asset uploaded successfully",
      });

      // Reset form
      setName("");
      setDescription("");
      setCategory("logo");
      setFile(null);
      fetchAssets();
    } catch (error: any) {
      console.error("Error uploading asset:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload asset",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (asset: SiteAsset) => {
    if (!confirm(`Are you sure you want to delete "${asset.name}"?`)) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("site-assets")
        .remove([asset.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from("site_assets")
        .delete()
        .eq("id", asset.id);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Asset deleted successfully",
      });

      fetchAssets();
    } catch (error: any) {
      console.error("Error deleting asset:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete asset",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Upload New Site Asset</h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <Label htmlFor="name">Asset Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., logo, hero-image"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="logo">Logo</SelectItem>
                <SelectItem value="focus-area">Focus Area</SelectItem>
                <SelectItem value="hero">Hero Image</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="file">Image File</Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <Button type="submit" disabled={uploading}>
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Asset
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* Assets List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Current Site Assets</h3>
        {assets.length === 0 ? (
          <p className="text-muted-foreground">No assets uploaded yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assets.map((asset) => (
              <Card key={asset.id} className="p-4">
                <div className="aspect-video mb-3 overflow-hidden rounded-md bg-muted">
                  <img
                    src={asset.file_url}
                    alt={asset.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-sm mb-1">{asset.name}</h4>
                {asset.description && (
                  <p className="text-xs text-muted-foreground mb-2">
                    {asset.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {asset.category}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mb-3 break-all">
                  {asset.file_url}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(asset.file_url, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(asset)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
