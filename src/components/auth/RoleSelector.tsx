
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
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Role</label>
      <RadioGroup value={selectedRole} onValueChange={onRoleChange} className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="user" id="role-user" />
          <Label htmlFor="role-user">User</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="admin" id="role-admin" />
          <Label htmlFor="role-admin">Admin</Label>
        </div>
      </RadioGroup>
      {isAdmin && (
        <p className="text-xs text-green-600 mt-1">
          Admin role verified
        </p>
      )}
    </div>
  );
};

export default RoleSelector;
