
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import AuthFormInputs from './AuthFormInputs';

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
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
          <AuthFormInputs 
            mode={mode}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            selectedRole="user"
            handleRoleChange={() => {}}
            isAdmin={false}
          />

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
