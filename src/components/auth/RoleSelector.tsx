import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
interface RoleSelectorProps {
  selectedRole: 'user' | 'admin';
  onRoleChange: (value: string) => void;
  isAdmin: boolean;
}
const RoleSelector: React.FC<RoleSelectorProps> = ({
  selectedRole,
  onRoleChange,
  isAdmin
}) => {
  return <div className="space-y-2">
      
      
      {isAdmin && <p className="text-xs text-green-600 mt-1">
          Admin role verified
        </p>}
    </div>;
};
export default RoleSelector;