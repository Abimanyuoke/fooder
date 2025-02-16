'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="p-10 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Welcome to Our Platform</h1>
        <p className="text-white/80 mb-6">Click the button below to login as Manager</p>
        <button
          onClick={() => router.push('/login')}
          className="px-6 py-3 bg-white text-purple-600 font-semibold text-lg rounded-lg shadow-md hover:bg-purple-100 transition-all duration-300"
        >
          Go to Login
        </button>
      </div>
    </main>
  );
}
