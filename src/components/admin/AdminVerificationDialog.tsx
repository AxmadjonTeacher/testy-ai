
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
import { Shield, AlertTriangle } from "lucide-react";

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
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" /> Admin Access Required
          </DialogTitle>
          <DialogDescription>
            Admin access is now managed through user roles. If you need admin privileges, please contact your system administrator.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded">
            <Shield className="h-4 w-4 text-amber-600" />
            <p className="text-sm text-amber-800">
              Security has been enhanced - admin access is now role-based rather than password-based.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminVerificationDialog;
