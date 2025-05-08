
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";

interface AdminVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerify: (password: string) => void;
}

const AdminVerificationDialog: React.FC<AdminVerificationDialogProps> = ({
  open,
  onOpenChange,
  onVerify
}) => {
  const [adminPassword, setAdminPassword] = useState('');

  const handleVerify = () => {
    onVerify(adminPassword);
    setAdminPassword('');
  };

  const handleCancel = () => {
    onOpenChange(false);
    setAdminPassword('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" /> Admin Verification
          </DialogTitle>
          <DialogDescription>
            Enter the admin password to gain delete permissions.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            id="admin-password"
            type="password"
            placeholder="Enter admin password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="w-full"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleVerify();
              }
            }}
          />
          <p className="text-xs text-muted-foreground">
            Enter the admin password to enable file deletion functionality.
          </p>
        </div>
        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleVerify}>
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminVerificationDialog;
