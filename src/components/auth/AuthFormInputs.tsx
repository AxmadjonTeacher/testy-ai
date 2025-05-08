
import React from 'react';
import { Input } from "@/components/ui/input";
import RoleSelector from './RoleSelector';

interface AuthFormInputsProps {
  mode: 'signIn' | 'signUp';
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  selectedRole: 'user' | 'admin';
  handleRoleChange: (value: string) => void;
  isAdmin: boolean;
}

const AuthFormInputs: React.FC<AuthFormInputsProps> = ({
  mode,
  email,
  setEmail,
  password,
  setPassword,
  selectedRole,
  handleRoleChange,
  isAdmin
}) => {
  return (
    <div className="space-y-4">
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
        <RoleSelector 
          selectedRole={selectedRole} 
          onRoleChange={handleRoleChange} 
          isAdmin={isAdmin} 
        />
      )}
    </div>
  );
};

export default AuthFormInputs;
