
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

interface AdminAccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerify: (password: string) => void;
  onCancel: () => void;
}

const AdminAccessDialog: React.FC<AdminAccessDialogProps> = ({
  open,
  onOpenChange,
  onCancel
}) => {
  const handleClose = () => {
    onCancel();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" /> Access Method Updated
          </DialogTitle>
          <DialogDescription>
            Admin access is now managed through secure user roles instead of passwords.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded">
            <Shield className="h-4 w-4 text-blue-600" />
            <p className="text-sm text-blue-800">
              For security reasons, admin access is now granted through proper user role management. 
              Contact your administrator if you need admin privileges.
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

export default AdminAccessDialog;
