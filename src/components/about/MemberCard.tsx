import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Member {
  id: string;
  name: string;
  designation: string;
  photo_url: string;
  introduction: string;
  achievements: string;
}

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div 
        className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <div className="aspect-square overflow-hidden">
            <img
              src={member.photo_url}
              alt={member.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{member.name}</h3>
            <p className="text-sm text-green-600 font-medium">{member.designation}</p>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h2>
                <p className="text-lg text-green-600 font-semibold mb-4">{member.designation}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Introduction</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{member.introduction}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Achievements</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{member.achievements}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MemberCard;