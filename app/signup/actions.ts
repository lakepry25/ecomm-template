'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export async function signup(formData: FormData) {
  const supabase = createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Sign up the user
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });
  console.log("test")
  console.log(signUpData);

  if (signUpError) {
    console.error(signUpError);
    //return redirect('/');
  }

  // Ensure user data exists and get the user ID
  const userId = signUpData.user?.id;

  if (!userId) {
    console.error('User ID not found after sign up');
    return redirect('/error');
  }

  // Add the new user to the organizers table
  const { error: usersError } = await supabase.from('users').insert({
    user_id: userId,
    role: "customer",
  });

  if (usersError) {
    console.error(usersError);
    return redirect('/error');
  }

  // Revalidate the path and redirect
  revalidatePath('/');
  redirect('/');
}