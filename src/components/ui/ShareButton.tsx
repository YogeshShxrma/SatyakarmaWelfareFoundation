import React, { useState } from "react";
import { Share, Facebook, Twitter, MessageCircle, Link, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface ShareButtonProps {
  title: string;
  excerpt: string;
  url?: string;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ 
  title, 
  excerpt, 
  url = window.location.href,
  className = ""
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(excerpt);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    whatsappStatus: `https://wa.me/?text=${encodedTitle}%20-%20${encodedText}%20${encodedUrl}`,
  };

  const handleShare = (platform: string) => {
    console.log('Share button clicked for platform:', platform);
    const link = shareLinks[platform as keyof typeof shareLinks];
    console.log('Generated share link:', link);
    if (link) {
      window.open(link, '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = async () => {
    console.log('Copy link clicked, URL:', url);
    try {
      if (!navigator.clipboard) {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        toast({
          title: "Link copied!",
          description: "The blog post link has been copied to your clipboard.",
        });
        setTimeout(() => setCopied(false), 2000);
        return;
      }
      
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The blog post link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
      toast({
        title: "Copy failed",
        description: "Could not copy link to clipboard.",
        variant: "destructive"
      });
    }
  };

  const handleNativeShare = async () => {
    console.log('Native share clicked');
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url,
        });
        console.log('Native share successful');
      } catch (err) {
        console.log('Native sharing cancelled or failed:', err);
      }
    } else {
      console.log('Native share not supported');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`flex items-center gap-2 hover:bg-green-50 hover:border-green-300 ${className}`}
        >
          <Share className="h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {navigator.share && (
          <DropdownMenuItem onClick={handleNativeShare} className="flex items-center gap-2">
            <Share className="h-4 w-4" />
            Share via...
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem 
          onClick={() => handleShare('facebook')} 
          className="flex items-center gap-2"
        >
          <Facebook className="h-4 w-4 text-blue-600" />
          Facebook
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleShare('twitter')} 
          className="flex items-center gap-2"
        >
          <Twitter className="h-4 w-4 text-blue-400" />
          Twitter / X
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleShare('whatsapp')} 
          className="flex items-center gap-2"
        >
          <MessageCircle className="h-4 w-4 text-green-600" />
          WhatsApp
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleShare('whatsappStatus')} 
          className="flex items-center gap-2"
        >
          <MessageCircle className="h-4 w-4 text-green-500" />
          WhatsApp Status
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={handleCopyLink} 
          className="flex items-center gap-2"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Link className="h-4 w-4" />
          )}
          {copied ? "Copied!" : "Copy Link"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;