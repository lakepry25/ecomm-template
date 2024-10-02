import Link from 'next/link';

const Home = () => {
  return (
    <main className="w-full p-4">
      <h1>Welcome to QwikLeagues</h1>
      <p>Want to create an account?</p>
      <Link href="/signup" className='w-40 block p-4 bg-black text-white text-center'>Sign Up</Link>
      <p>Already have an account?</p>
      <Link href="/login" className='w-40 block p-4 bg-black text-white text-center'>Login</Link>
      <p>Admin?</p>
      <Link href="/dashboard" className='w-40 block p-4 bg-black text-white text-center'>Dashboard</Link>
    </main>
  );
}

export default Home