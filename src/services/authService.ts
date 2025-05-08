
import { toast } from 'sonner';

export const verifyAdminPassword = (password: string): boolean => {
  // Hard-coded admin password for demonstration purposes
  return password === 'testoradmintesty';
};

export const handleAdminVerification = (
  password: string,
  setIsAdmin: (isAdmin: boolean) => void,
  setSelectedRole: (role: 'user' | 'admin') => void
): void => {
  if (verifyAdminPassword(password)) {
    setIsAdmin(true);
    setSelectedRole('admin');
    toast.success('Admin verification successful');
  } else {
    toast.error('Invalid admin password');
  }
};

export const handleRoleChange = (
  value: string,
  setSelectedRole: (role: 'user' | 'admin') => void,
  setAdminPasswordDialogOpen: (open: boolean) => void
): void => {
  const role = value as 'user' | 'admin';
  setSelectedRole(role);

  if (role === 'admin') {
    setAdminPasswordDialogOpen(true);
  }
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
