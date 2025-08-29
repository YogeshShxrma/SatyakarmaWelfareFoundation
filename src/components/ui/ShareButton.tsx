import React, { useState } from "react";
import { Share, Facebook, Twitter, MessageCircle, Link, Check, Linkedin, Send } from "lucide-react";
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
  url,
  className = ""
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Ensure we have a valid URL
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(excerpt);
  const encodedUrl = encodeURIComponent(shareUrl);

  // Create rich sharing content for different platforms
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}%0A%0A${encodedText}%0A%0A${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%0A%0A${encodedText}%0A%0A${encodedUrl}`,
    whatsappStatus: `https://wa.me/?text=${encodedTitle}%0A%0A${encodedText}%0A%0A${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}%0A%0A${encodedText}`,
  };

  const handleShare = (platform: string) => {
    const link = shareLinks[platform as keyof typeof shareLinks];
    if (link) {
      try {
        const popup = window.open(link, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
        if (!popup) {
          // Fallback if popup is blocked - open in same tab
          window.open(link, '_blank');
        }
      } catch (error) {
        console.error('Error opening share link:', error);
        toast({
          title: "Share failed",
          description: "Could not open sharing window. Please check your popup blocker settings.",
          variant: "destructive"
        });
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      if (!navigator.clipboard) {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
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
      
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The blog post link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy link to clipboard.",
        variant: "destructive"
      });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url: shareUrl,
        });
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Native sharing failed:', err);
        }
        // Native sharing cancelled or failed - ignore silently for AbortError
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`flex items-center gap-2 hover:bg-sage-50 hover:border-sage-300 ${className}`}
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
          <Facebook className="h-4 w-4 text-ocean-600" />
          Facebook
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleShare('twitter')} 
          className="flex items-center gap-2"
        >
          <Twitter className="h-4 w-4 text-ocean-400" />
          Twitter / X
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleShare('linkedin')} 
          className="flex items-center gap-2"
        >
          <Linkedin className="h-4 w-4 text-ocean-600" />
          LinkedIn
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleShare('whatsapp')} 
          className="flex items-center gap-2"
        >
          <MessageCircle className="h-4 w-4 text-sage-600" />
          WhatsApp
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleShare('telegram')} 
          className="flex items-center gap-2"
        >
          <Send className="h-4 w-4 text-ocean-500" />
          Telegram
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={handleCopyLink} 
          className="flex items-center gap-2"
        >
          {copied ? (
            <Check className="h-4 w-4 text-sage-600" />
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