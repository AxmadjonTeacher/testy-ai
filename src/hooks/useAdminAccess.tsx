
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function useAdminAccess() {
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [showPasswordDialog, setShowPasswordDialog] = useState<boolean>(false);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has previously verified as admin in this session
    const adminVerified = sessionStorage.getItem('admin_verified') === 'true';
    
    if (adminVerified) {
      setHasAccess(true);
    } else {
      setShowPasswordDialog(true);
    }
    
    setIsVerifying(false);
  }, []);

  const verifyPassword = (password: string) => {
    if (password === 'letmecook') {
      setHasAccess(true);
      setShowPasswordDialog(false);
      sessionStorage.setItem('admin_verified', 'true');
      toast.success('Admin access granted');
    } else {
      toast.error('Incorrect password');
    }
  };

  const cancelVerification = () => {
    navigate('/');
    toast.info('Admin access canceled');
  };

  return {
    isVerifying,
    showPasswordDialog,
    hasAccess,
    verifyPassword,
    cancelVerification,
    setShowPasswordDialog
  };
}
