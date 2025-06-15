
import { FileText, Upload, Image } from "lucide-react";

interface AdminTabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminTabNavigation = ({ activeTab, onTabChange }: AdminTabNavigationProps) => {
  const tabs = [
    { id: "blog", label: "Blog Posts", icon: FileText },
    { id: "news", label: "News Updates", icon: Upload },
    { id: "media", label: "Media Upload", icon: Image },
  ];

  return (
    <div className="mb-8">
      <nav className="flex space-x-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`pb-2 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="inline h-5 w-5 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminTabNavigation;
