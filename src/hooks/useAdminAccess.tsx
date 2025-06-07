
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { checkAdminRole } from '@/services/authService';
import { toast } from 'sonner';

export function useAdminAccess() {
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [showPasswordDialog, setShowPasswordDialog] = useState<boolean>(false);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        setHasAccess(false);
        setShowPasswordDialog(false);
        setIsVerifying(false);
        return;
      }

      try {
        const isAdmin = await checkAdminRole();
        setHasAccess(isAdmin);
        
        if (!isAdmin) {
          toast.error('Admin access required');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error checking admin access:', error);
        setHasAccess(false);
        toast.error('Error verifying admin access');
        navigate('/dashboard');
      } finally {
        setIsVerifying(false);
      }
    };

    checkAccess();
  }, [user, navigate]);

  const verifyPassword = () => {
    // This function is kept for backwards compatibility but doesn't do anything
    toast.info('Please contact your administrator to get admin access');
  };

  const cancelVerification = () => {
    navigate('/');
    toast.info('Admin access canceled');
  };

  return {
    isVerifying,
    showPasswordDialog: false, // Never show password dialog anymore
    hasAccess,
    verifyPassword,
    cancelVerification,
    setShowPasswordDialog: () => {} // No-op function
  };
}
