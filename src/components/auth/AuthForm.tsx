
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import { makeUserAdmin, makeSelfAdmin } from '@/utils/adminUtils';
import AdminPasswordDialog from './AdminPasswordDialog';
import AuthFormInputs from './AuthFormInputs';
import { handleAdminVerification, handleRoleChange, cancelAdminRole } from '@/services/authService';

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPasswordDialogOpen, setAdminPasswordDialogOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin'>('user');
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signIn') {
        await signIn(email, password);
        navigate('/dashboard');
      } else {
        // Sign up new user
        await signUp(email, password);
        
        // Sign in automatically after signup
        await signIn(email, password);
        
        // If admin role was selected and verified, apply it after sign in
        if (isAdmin) {
          await makeSelfAdmin();
          toast.success("Admin role has been applied to your account");
        }
        
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'signIn' ? 'signUp' : 'signIn');
    // Reset form when toggling modes
    setEmail('');
    setPassword('');
    setIsAdmin(false);
    setSelectedRole('user');
    setAdminPassword('');
  };

  const handleAdminPasswordVerify = () => {
    handleAdminVerification(adminPassword, setIsAdmin, setSelectedRole);
    setAdminPasswordDialogOpen(false);
    setAdminPassword('');
  };

  const handleAdminRoleChange = (value: string) => {
    handleRoleChange(value, setSelectedRole, setAdminPasswordDialogOpen);
  };

  const handleCancelAdminRole = () => {
    cancelAdminRole(setSelectedRole, setIsAdmin, setAdminPasswordDialogOpen, setAdminPassword);
  };

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {mode === 'signIn' ? 'Sign In' : 'Create Account'}
          </CardTitle>
          <CardDescription className="text-center">
            {mode === 'signIn'
              ? 'Enter your email and password to access your account'
              : 'Enter your details to create a new account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthFormInputs 
              mode={mode}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              selectedRole={selectedRole}
              handleRoleChange={handleAdminRoleChange}
              isAdmin={isAdmin}
            />

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white"
              disabled={loading || (mode === 'signUp' && selectedRole === 'admin' && !isAdmin)}
            >
              {loading ? (
                <span>Loading...</span>
              ) : mode === 'signIn' ? (
                'Sign In'
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <Button variant="link" onClick={toggleMode}>
            {mode === 'signIn'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </Button>
        </CardFooter>
      </Card>

      <AdminPasswordDialog
        open={adminPasswordDialogOpen}
        onOpenChange={setAdminPasswordDialogOpen}
        adminPassword={adminPassword}
        setAdminPassword={setAdminPassword}
        onVerify={handleAdminPasswordVerify}
        onCancel={handleCancelAdminRole}
      />
    </>
  );
};

export default AuthForm;
