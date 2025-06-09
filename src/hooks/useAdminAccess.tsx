
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/contexts/AuthContext';

export function useAdminAccess() {
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        setHasAccess(false);
        setIsVerifying(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('has_role', {
          _role: 'admin'
        });

        if (error) {
          console.error("Error checking admin role:", error);
          setHasAccess(false);
        } else {
          setHasAccess(data === true);
          if (data !== true) {
            toast.error('You do not have admin privileges to access this page');
          }
        }
      } catch (error) {
        console.error("Error checking admin access:", error);
        setHasAccess(false);
      } finally {
        setIsVerifying(false);
      }
    };

    checkAdminAccess();
  }, [user]);

  const redirectToHome = () => {
    navigate('/');
    toast.info('Redirected to home page');
  };

  return {
    isVerifying,
    hasAccess,
    redirectToHome
  };
}
