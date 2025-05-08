
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { makeUserAdmin } from '@/utils/adminUtils';

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [makeAdmin, setMakeAdmin] = useState(false); // For development only
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
        
        // Only on development: make the user admin if checkbox is checked
        if (makeAdmin && user?.id) {
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
    setMakeAdmin(false);
  };

  // Helper to check if we're in development mode
  const isDevelopment = () => {
    return process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';
  };

  return (
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

          {/* Development only: Show admin checkbox when signing up */}
          {isDevelopment() && mode === 'signUp' && (
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="make-admin" 
                checked={makeAdmin}
                onCheckedChange={(checked) => 
                  setMakeAdmin(checked === true)
                }
              />
              <Label htmlFor="make-admin" className="text-sm text-neutral-dark">
                Make this user an admin (Development Only)
              </Label>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white"
            disabled={loading}
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
  );
};

export default AuthForm;
