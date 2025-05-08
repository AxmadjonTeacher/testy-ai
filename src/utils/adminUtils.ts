import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Keep these functions but make them simple stubs that always return true
// This way any code that relies on them won't break
export async function makeUserAdmin(userId: string) {
  console.log("Admin functionality disabled - all users can access admin features");
  return true;
}

export async function makeSelfAdmin() {
  console.log("Admin functionality disabled - all users can access admin features");
  return true;
}
