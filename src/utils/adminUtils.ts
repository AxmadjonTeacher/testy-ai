
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function makeUserAdmin(userId: string) {
  try {
    // Check if the role already exists for this user
    const { data: existingRole, error: checkError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      // Error other than "no rows returned"
      throw checkError;
    }
    
    if (existingRole) {
      toast.info("User is already an admin");
      return;
    }
    
    // Insert the admin role for this user
    const { error } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role: 'admin'
      });
    
    if (error) throw error;
    
    toast.success("Admin role granted successfully");
    return true;
  } catch (error) {
    console.error("Error making user admin:", error);
    toast.error("Failed to grant admin role");
    return false;
  }
}
