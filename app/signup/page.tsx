// pages/signup.tsx
'use client';

import { signup} from './actions';

export default function SignUp() {

  return (
    <div className='w-full p-4'>
      <div className='w-full pt-16 max-w-96 mx-auto'>
        <h1 className='text-3xl font-extrabold text-center'>Sign Up</h1>
        <p className='text-center text-gray-600 mt-4'>Enter your email and a password to create you account.</p>
        <form className='w-full flex flex-col mt-6'>
          <label htmlFor="email" className='mt-4 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Email</label>
          <input id="email" name="email" type="email" required className='mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'/>
          <label htmlFor="password" className='mt-4 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Password</label>
          <input id="password" name="password" type="password" required  className='mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'/>
          <button formAction={signup} className='h-10 bg-blue-600 rounded-md text-white mt-6'>Sign Up</button>
        </form>
      </div>
      <div>
      </div>
    </div>
  );
}
