
import { createClient } from "@/lib/supabase/server";
import Dashboard from "./dashboard";

import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  // Fetch the current session on the server side
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user) {
    console.error('Authentication error or no user:', error);
    redirect('/login');
  }

  return (
    <div className="h-full w-full flex">
      <Dashboard />
    </div>
  );
}