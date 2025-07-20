import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MemberForm from "./MemberForm";
import MemberTable from "./MemberTable";

interface Member {
  id: string;
  name: string;
  designation: string;
  photo_url: string;
  introduction: string;
  achievements: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface AdminMembersManagerProps {
  refreshTrigger: number;
  onRefresh: () => void;
}

const AdminMembersManager = ({ refreshTrigger, onRefresh }: AdminMembersManagerProps) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMembers();
  }, [refreshTrigger]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch members",
          variant: "destructive",
        });
        return;
      }

      setMembers(data || []);
    } catch (error) {
      console.error("Error fetching members:", error);
      toast({
        title: "Error",
        description: "Failed to fetch members",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingMember(null);
    setIsFormOpen(true);
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) {
      return;
    }

    try {
      const { error } = await supabase.from("members").delete().eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete member",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Member deleted successfully",
      });

      fetchMembers();
      onRefresh();
    } catch (error) {
      console.error("Error deleting member:", error);
      toast({
        title: "Error",
        description: "Failed to delete member",
        variant: "destructive",
      });
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingMember(null);
    fetchMembers();
    onRefresh();
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingMember(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Members Management</h2>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Member
        </Button>
      </div>

      {isFormOpen && (
        <MemberForm
          member={editingMember}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      <MemberTable
        members={members}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminMembersManager;