
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

export const verifyAdminRole = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('has_role', {
      _role: 'admin'
    });

    if (error) {
      console.error("Error checking admin role:", error);
      return false;
    }

    return data === true;
  } catch (error) {
    console.error("Error verifying admin role:", error);
    return false;
  }
};

export const handleAdminVerification = async (
  setIsAdmin: (isAdmin: boolean) => void,
  setSelectedRole: (role: 'user' | 'admin') => void
): Promise<void> => {
  const isAdmin = await verifyAdminRole();
  
  if (isAdmin) {
    setIsAdmin(true);
    setSelectedRole('admin');
    toast.success('Admin verification successful');
  } else {
    toast.error('You do not have admin privileges');
  }
};

export const handleRoleChange = async (
  value: string,
  setSelectedRole: (role: 'user' | 'admin') => void,
  setAdminPasswordDialogOpen: (open: boolean) => void
): Promise<void> => {
  const role = value as 'user' | 'admin';
  setSelectedRole(role);

  if (role === 'admin') {
    // Check if user already has admin role
    const isAdmin = await verifyAdminRole();
    if (!isAdmin) {
      toast.error('You do not have admin privileges');
      setSelectedRole('user');
    }
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
