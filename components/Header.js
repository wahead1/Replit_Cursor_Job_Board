import { useState } from 'react';
import Link from 'next/link';
import Mailto from 'react-mailto-link';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-white border-b border-black/5">
      <div className="w-full mx-auto md:px-12 px-8 max-w-7xl lg:px-16">
        <div className="relative flex flex-col w-full py-5 mx-auto bg-white md:items-center md:justify-between md:flex-row md:px-6">
          <div className="flex flex-row items-center justify-between lg:justify-start">
            <Link href="/" className="text-black inline-flex items-center gap-3">
            <Image
            src="/logotime.png"
            alt="Logo"
            width={28} // Adjust width based on your desired size
            height={28} // Adjust height as needed
            priority={true} // Ensures the logo is loaded quickly
          />
              <span className="font-bold font-display">Foster City Jobs</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-black focus:outline-none focus:text-black md:hidden"
            >
              <svg
                className="w-6 h-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={isOpen ? 'hidden' : 'inline-flex'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
                <path
                  className={isOpen ? 'inline-flex' : 'hidden'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <nav
            className={`${
              isOpen ? 'flex' : 'hidden'
            } flex-col items-center flex-grow md:pb-0 md:flex md:justify-end md:flex-row`}
          >
            <Link
              className="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400 lg:ml-auto"
              href="/special-thanks"
            >
              Thank You
            </Link>
            <Link
              className="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400"
              href="/post-a-job"
            >
              Post a Job
            </Link>
            <Link
              className="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400"
              href="/about"
            >
              About
            </Link>
            <Link
            target="_blank"
              className="px-2 lg:px-6 py-2 md:px-3 text-sm font-medium text-black hover:text-accent-400"
              href="https://www.linkedin.com/in/will-gordon1/"
            >
              LinkedIn
            </Link>
            <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
              <Link
                target="_blank"
                href="https://github.com/wcgordon1/Replit_Cursor_Job_Board"
                className="inline-flex items-center h-8 justify-center px-4 py-2 text-sm font-medium text-black bg-gray-100 rounded-lg group focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-gray-50 active:bg-gray-200 active:text-accent-400 focus-visible:outline-black"
              >
                Github
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}