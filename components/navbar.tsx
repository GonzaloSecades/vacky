'use client';

import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { login, logout } from '../lib/auth-actions';
import { GithubSvg } from './githubSvg';

const Navbar = ({ session }: { session: Session | null }) => {
  return (
    <nav className="border-b border-gray-200 bg-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="h-auto w-auto"
          />
          <span className="text-2xl font-bold text-gray-800">Vacky</span>
        </Link>
        {session && (
          <>
            <div className="flex items-center space-x-4">
              <Link
                href="/trips"
                className="text-slate-900 transition-colors duration-200 hover:text-sky-500"
              >
                My Trips
              </Link>
              <Link
                href="/globe"
                className="text-slate-900 transition-colors duration-200 hover:text-sky-500"
              >
                Globe
              </Link>
            </div>

            <form action={logout}>
              <button
                type="submit"
                className="flex cursor-pointer items-center justify-center rounded-sm bg-gray-100 p-2 text-gray-800 transition-colors duration-200 hover:bg-gray-200"
              >
                Sign Out
                <Image
                  src={session.user?.image || '/default-avatar.png'}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="ml-2 h-8 w-8 rounded-full object-cover"
                />
              </button>
            </form>
          </>
        )}

        {!session && (
          <form action={login}>
            <button
              type="submit"
              className="flex cursor-pointer items-center justify-center rounded-sm bg-gray-800 p-2 text-white transition-colors duration-200 hover:bg-gray-900"
            >
              Sign In
              <GithubSvg />
            </button>
          </form>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
