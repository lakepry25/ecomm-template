import Link from 'next/link'
import { login } from './actions'

export default function LoginPage() {
  return (
    <div className='w-full p-4'>
      <div className='w-full pt-16 max-w-96 mx-auto'>
        <h1 className='text-3xl font-extrabold text-center'>Login</h1>
        <p className='text-center text-gray-600 mt-4'>Enter your email below to login to your account</p>
        <form className='w-full flex flex-col mt-6'>
          <label htmlFor="email" className='font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Email</label>
          <input id="email" name="email" type="email" required className='mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'/>
          <label htmlFor="password" className='mt-4 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Password</label>
          <input id="password" name="password" type="password" required  className='mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'/>
          <button formAction={login} className='h-10 bg-blue-600 rounded-md text-white mt-6'>Log in</button>
          <p className='text-center mt-6'>Don&apos;t have an account? <Link href='/signup' className='text-center mt-4 text-blue-600 underline'>Register here</Link></p>
        </form>
      </div>
      <div>
      </div>
    </div>
  )
}