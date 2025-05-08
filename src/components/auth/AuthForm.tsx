
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import { makeUserAdmin } from '@/utils/adminUtils';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
        // Once signed up, sign in automatically
        await signIn(email, password);
        
        // Make the user admin if they selected the admin role and the password was verified
        if (isAdmin && user?.id) {
          await makeUserAdmin(user.id);
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

  const handleRoleChange = (value: string) => {
    const role = value as 'user' | 'admin';
    setSelectedRole(role);
    
    if (role === 'admin') {
      setAdminPasswordDialogOpen(true);
    } else {
      setIsAdmin(false);
    }
  };

  const verifyAdminPassword = () => {
    const correctPassword = "testoradmintesty";
    
    if (adminPassword === correctPassword) {
      setIsAdmin(true);
      toast.success("Admin role verified");
    } else {
      setIsAdmin(false);
      setSelectedRole('user');
      toast.error("Incorrect admin password");
    }
    
    setAdminPasswordDialogOpen(false);
    setAdminPassword('');
  };

  const cancelAdminRole = () => {
    setSelectedRole('user');
    setIsAdmin(false);
    setAdminPasswordDialogOpen(false);
    setAdminPassword('');
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
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {/* Show role selection only when signing up */}
            {mode === 'signUp' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">Role</label>
                <RadioGroup value={selectedRole} onValueChange={handleRoleChange} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="role-user" />
                    <Label htmlFor="role-user">User</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="role-admin" />
                    <Label htmlFor="role-admin">Admin</Label>
                  </div>
                </RadioGroup>
                {isAdmin && (
                  <p className="text-xs text-green-600 mt-1">
                    Admin role verified
                  </p>
                )}
              </div>
            )}

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

      {/* Admin password verification dialog */}
      <Dialog open={adminPasswordDialogOpen} onOpenChange={setAdminPasswordDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Admin Verification</DialogTitle>
            <DialogDescription>
              Please enter the admin password to continue.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              id="admin-password"
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={cancelAdminRole}>
              Cancel
            </Button>
            <Button onClick={verifyAdminPassword}>
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthForm;
