import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

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

interface MemberTableProps {
  members: Member[];
  loading: boolean;
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
}

const MemberTable = ({ members, loading, onEdit, onDelete }: MemberTableProps) => {
  if (loading) {
    return (
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Display Order</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(3)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center">
        <p className="text-gray-500">No members found. Click "Add Member" to create your first member.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Photo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Display Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <div className="w-12 h-12 rounded-full overflow-hidden border">
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.designation}</TableCell>
              <TableCell>{member.display_order}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(member)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(member.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MemberTable;