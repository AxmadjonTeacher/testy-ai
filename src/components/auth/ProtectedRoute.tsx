
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';
import AccessDenied from './AccessDenied';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = 'user' 
}) => {
  const { user, loading } = useAuth();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [checkingPermission, setCheckingPermission] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      // First ensure the user is authenticated
      if (!user) {
        setHasPermission(false);
        setCheckingPermission(false);
        return;
      }

      // For regular user routes, being logged in is sufficient
      if (requiredRole === 'user') {
        setHasPermission(true);
        setCheckingPermission(false);
        return;
      }

      try {
        console.log("Checking user role for:", user.id);
        
        // Check if user has the required admin role
        const { data, error } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', user.id)
          .eq('role', requiredRole)
          .single();

        if (error) {
          console.error("Error checking role:", error);
          if (error.code === 'PGRST116') { // No rows returned
            setHasPermission(false);
            console.log("User does not have admin role");
          } else {
            throw error;
          }
        } else {
          setHasPermission(true);
          console.log("User has admin permission:", data);
        }
        
        if (!data) {
          toast.error("You don't have permission to access this page");
        }
      } catch (error) {
        console.error("Error checking permissions:", error);
        toast.error("Error verifying permissions");
        setHasPermission(false);
      } finally {
        setCheckingPermission(false);
      }
    };

    if (!loading) {
      checkUserRole();
    }
  }, [user, loading, requiredRole]);

  // Show loading while checking authentication or permissions
  if (loading || checkingPermission) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-neutral-dark">Verifying permissions...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // If authenticated but doesn't have the required role, show Access Denied
  if (!hasPermission) {
    return <AccessDenied />;
  }

  // If all checks pass, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
