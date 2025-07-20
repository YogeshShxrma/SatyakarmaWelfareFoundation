import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Link as LinkIcon } from "lucide-react";

interface Member {
  id: string;
  name: string;
  designation: string;
  photo_url: string;
  introduction: string;
  achievements: string;
  display_order: number;
}

interface MemberFormProps {
  member?: Member | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const MemberForm = ({ member, onSuccess, onCancel }: MemberFormProps) => {
  const [formData, setFormData] = useState({
    name: member?.name || "",
    designation: member?.designation || "",
    photo_url: member?.photo_url || "",
    introduction: member?.introduction || "",
    achievements: member?.achievements || "",
    display_order: member?.display_order || 0,
  });
  const [useFileUpload, setUseFileUpload] = useState(!member?.photo_url);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(member?.photo_url || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, photo_url: url }));
    setPreviewUrl(url);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const filePath = `members/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.designation.trim() || !formData.introduction.trim() || !formData.achievements.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let photoUrl = formData.photo_url;

      if (useFileUpload && selectedFile) {
        const uploadedUrl = await uploadImage(selectedFile);
        if (!uploadedUrl) {
          toast({
            title: "Error",
            description: "Failed to upload image",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        photoUrl = uploadedUrl;
      }

      if (!photoUrl) {
        toast({
          title: "Error",
          description: "Please provide a photo URL or upload an image",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const memberData = {
        ...formData,
        photo_url: photoUrl,
      };

      let error;

      if (member) {
        ({ error } = await supabase
          .from("members")
          .update(memberData)
          .eq("id", member.id));
      } else {
        ({ error } = await supabase
          .from("members")
          .insert([memberData]));
      }

      if (error) {
        console.error("Database error:", error);
        toast({
          title: "Error",
          description: `Failed to ${member ? "update" : "create"} member`,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `Member ${member ? "updated" : "created"} successfully`,
      });

      onSuccess();
    } catch (error) {
      console.error("Error saving member:", error);
      toast({
        title: "Error",
        description: `Failed to ${member ? "update" : "create"} member`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {member ? "Edit Member" : "Add New Member"}
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter member name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation">Designation *</Label>
              <Input
                id="designation"
                value={formData.designation}
                onChange={(e) => handleInputChange("designation", e.target.value)}
                placeholder="Enter member designation"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="display_order">Display Order</Label>
            <Input
              id="display_order"
              type="number"
              value={formData.display_order}
              onChange={(e) => handleInputChange("display_order", parseInt(e.target.value) || 0)}
              placeholder="Enter display order (0 for first)"
            />
          </div>

          <div className="space-y-4">
            <Label>Photo *</Label>
            <div className="flex gap-2 mb-4">
              <Button
                type="button"
                variant={useFileUpload ? "default" : "outline"}
                onClick={() => setUseFileUpload(true)}
                size="sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
              <Button
                type="button"
                variant={!useFileUpload ? "default" : "outline"}
                onClick={() => setUseFileUpload(false)}
                size="sm"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                External URL
              </Button>
            </div>

            {useFileUpload ? (
              <div className="space-y-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium"
                />
                <p className="text-sm text-gray-500">
                  Maximum file size: 5MB. Supported formats: JPG, PNG, GIF, WebP
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Input
                  placeholder="Enter image URL"
                  value={formData.photo_url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                />
              </div>
            )}

            {previewUrl && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="w-32 h-32 border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => setPreviewUrl("")}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="introduction">Introduction *</Label>
            <Textarea
              id="introduction"
              value={formData.introduction}
              onChange={(e) => handleInputChange("introduction", e.target.value)}
              placeholder="Enter member introduction"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="achievements">Achievements *</Label>
            <Textarea
              id="achievements"
              value={formData.achievements}
              onChange={(e) => handleInputChange("achievements", e.target.value)}
              placeholder="Enter member achievements"
              rows={4}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : member ? "Update Member" : "Create Member"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MemberForm;