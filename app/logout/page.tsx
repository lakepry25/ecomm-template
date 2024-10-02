
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function Logout() {
  const supabase = createClient();

  await supabase.auth.signOut();

  const { data: user, error: error } = await supabase.auth.getUser();

  console.log('User: ', user)
  console.log('Error: ', error)

  if (error || !user) {
    console.error('Authentication error or no user:', error);
    redirect('/login');
  }

  return <div>Error logging out... Please refresh page!</div>;
};
