
import { toast } from 'sonner';

export const verifyAdminPassword = (password: string): boolean => {
  // Always return true as we're removing admin restrictions
  return true;
};

export const handleAdminVerification = (
  password: string,
  setIsAdmin: (isAdmin: boolean) => void,
  setSelectedRole: (role: 'user' | 'admin') => void
): void => {
  // No verification needed anymore
  setIsAdmin(true);
};

export const handleRoleChange = (
  value: string,
  setSelectedRole: (role: 'user' | 'admin') => void,
  setAdminPasswordDialogOpen: (open: boolean) => void
): void => {
  const role = value as 'user' | 'admin';
  setSelectedRole(role);
  // No password dialog needed
};

export const cancelAdminRole = (
  setSelectedRole: (role: 'user' | 'admin') => void,
  setIsAdmin: (isAdmin: boolean) => void,
  setAdminPasswordDialogOpen: (open: boolean) => void,
  setAdminPassword: (password: string) => void
): void => {
  setSelectedRole('user');
  setIsAdmin(false);
  setAdminPasswordDialogOpen(false);
  setAdminPassword('');
};
