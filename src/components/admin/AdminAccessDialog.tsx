
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

interface AdminAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerify: (password: string) => void;
  onCancel: () => void;
}

const AdminAccessDialog: React.FC<AdminAccessDialogProps> = ({
  open,
  onOpenChange,
  onVerify,
  onCancel
}) => {
  const [password, setPassword] = useState('');

  const handleVerify = () => {
    onVerify(password);
    setPassword('');
  };

  const handleCancel = () => {
    onCancel();
    setPassword('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" /> Admin Access Required
          </DialogTitle>
          <DialogDescription>
            Please enter the admin password to access the upload functionality.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            id="admin-password"
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleVerify();
              }
            }}
            autoFocus
          />
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

export default AdminAccessDialog;
