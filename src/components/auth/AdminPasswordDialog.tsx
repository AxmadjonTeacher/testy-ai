
import React from 'react';
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

interface AdminPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  adminPassword: string;
  setAdminPassword: (password: string) => void;
  onVerify: () => void;
  onCancel: () => void;
}

const AdminPasswordDialog: React.FC<AdminPasswordDialogProps> = ({
  open,
  onOpenChange,
  adminPassword,
  setAdminPassword,
  onVerify,
  onCancel
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Verification</DialogTitle>
          <DialogDescription>
            Please enter the admin password to continue.
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
          />
        </div>
        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onVerify}>
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPasswordDialog;
