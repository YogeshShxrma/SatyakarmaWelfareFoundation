
import { useState } from "react";

interface Blog {
  id?: string;
  title: string;
  category: string;
  content: string;
  excerpt: string;
  image_url?: string;
}

interface News {
  id?: string;
  title: string;
  description: string;
  date: string;
  priority: string;
}

interface Media {
  id?: string;
  title: string;
  description?: string;
  file_url: string;
  file_type: string;
}

export const useAdminState = () => {
  const [activeTab, setActiveTab] = useState("blog");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Form states
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showMediaForm, setShowMediaForm] = useState(false);
  
  // Edit states
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [editingMedia, setEditingMedia] = useState<Media | null>(null);

  const refreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    handleFormCancel();
  };

  const handleBlogEdit = (blog: Blog) => {
    console.log('Editing blog:', blog);
    setEditingBlog(blog);
    setShowBlogForm(true);
  };

  const handleBlogAdd = () => {
    console.log('Adding new blog');
    setEditingBlog(null);
    setShowBlogForm(true);
  };

  const handleNewsEdit = (news: News) => {
    console.log('Editing news:', news);
    setEditingNews(news);
    setShowNewsForm(true);
  };

  const handleNewsAdd = () => {
    console.log('Adding new news');
    setEditingNews(null);
    setShowNewsForm(true);
  };

  const handleMediaEdit = (media: Media) => {
    console.log('Editing media:', media);
    setEditingMedia(media);
    setShowMediaForm(true);
  };

  const handleMediaAdd = () => {
    console.log('Adding new media');
    setEditingMedia(null);
    setShowMediaForm(true);
  };

  const handleFormSave = () => {
    console.log('Form saved, refreshing data');
    setShowBlogForm(false);
    setShowNewsForm(false);
    setShowMediaForm(false);
    setEditingBlog(null);
    setEditingNews(null);
    setEditingMedia(null);
    refreshData();
  };

  const handleFormCancel = () => {
    console.log('Form cancelled');
    setShowBlogForm(false);
    setShowNewsForm(false);
    setShowMediaForm(false);
    setEditingBlog(null);
    setEditingNews(null);
    setEditingMedia(null);
  };

  return {
    activeTab,
    refreshTrigger,
    showBlogForm,
    showNewsForm,
    showMediaForm,
    editingBlog,
    editingNews,
    editingMedia,
    handleTabChange,
    handleBlogEdit,
    handleBlogAdd,
    handleNewsEdit,
    handleNewsAdd,
    handleMediaEdit,
    handleMediaAdd,
    handleFormSave,
    handleFormCancel,
  };
};
