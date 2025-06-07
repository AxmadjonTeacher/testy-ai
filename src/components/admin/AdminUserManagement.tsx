
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { checkAdminRole } from '@/services/authService';

interface AdminUser {
  id: string;
  email: string;
  role: string;
}

const AdminUserManagement: React.FC = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [canManageAdmins, setCanManageAdmins] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkPermissions = async () => {
      if (user) {
        const isAdmin = await checkAdminRole();
        setCanManageAdmins(isAdmin);
        if (isAdmin) {
          loadAdminUsers();
        }
      }
    };

    checkPermissions();
  }, [user]);

  const loadAdminUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          id,
          user_id,
          role,
          profiles!inner(id)
        `)
        .eq('role', 'admin');

      if (error) throw error;

      // Note: We can't get email from profiles as it's in auth.users
      // This is a limitation of Supabase RLS - we can only show user IDs
      const adminData = data.map(item => ({
        id: item.user_id,
        email: `User ID: ${item.user_id}`,
        role: item.role
      }));

      setAdminUsers(adminData);
    } catch (error: any) {
      console.error('Error loading admin users:', error);
      toast.error('Failed to load admin users');
    }
  };

  const promoteToAdmin = async () => {
    if (!newAdminEmail.trim()) {
      toast.error('Please enter a user email');
      return;
    }

    setLoading(true);
    try {
      // Note: This requires server-side implementation to look up user by email
      // For now, we'll show a message about the limitation
      toast.info('Admin promotion requires server-side implementation. Contact your system administrator.');
    } catch (error: any) {
      console.error('Error promoting user to admin:', error);
      toast.error('Failed to promote user to admin');
    } finally {
      setLoading(false);
    }
  };

  if (!canManageAdmins) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-neutral-dark">
            You do not have permission to manage admin users.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin User Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Current Admin Users</h3>
          {adminUsers.length > 0 ? (
            <div className="space-y-2">
              {adminUsers.map((admin) => (
                <div key={admin.id} className="flex items-center justify-between p-2 border rounded">
                  <span>{admin.email}</span>
                  <span className="text-sm text-neutral-dark">Admin</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-dark">No admin users found.</p>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Promote User to Admin</h3>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter user email"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              className="flex-1"
            />
            <Button onClick={promoteToAdmin} disabled={loading}>
              {loading ? 'Adding...' : 'Promote to Admin'}
            </Button>
          </div>
          <p className="text-xs text-neutral-dark">
            Note: Admin promotion currently requires server-side implementation for security.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUserManagement;
