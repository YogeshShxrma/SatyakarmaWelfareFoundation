
import { FileText, Upload, Image, Users, Shield } from "lucide-react";

interface AdminTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onTabSwitch: () => void;
}

const tabButtons = [
  {
    key: "blog",
    label: "Blog Posts",
    icon: <FileText className="inline h-5 w-5 mr-2" />,
  },
  {
    key: "news",
    label: "News Updates",
    icon: <Upload className="inline h-5 w-5 mr-2" />,
  },
  {
    key: "media",
    label: "Media Upload",
    icon: <Image className="inline h-5 w-5 mr-2" />,
  },
  {
    key: "members",
    label: "Members",
    icon: <Users className="inline h-5 w-5 mr-2" />,
  },
  {
    key: "admins",
    label: "Admin Users",
    icon: <Shield className="inline h-5 w-5 mr-2" />,
  },
];

const AdminTabs = ({ activeTab, setActiveTab, onTabSwitch }: AdminTabsProps) => {
  return (
    <nav className="flex space-x-8 mb-8">
      {tabButtons.map((tab) => (
        <button
          key={tab.key}
          onClick={() => {
            setActiveTab(tab.key);
            onTabSwitch();
          }}
          className={`pb-2 border-b-2 font-medium text-sm ${
            activeTab === tab.key
              ? "border-green-500 text-green-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default AdminTabs;
