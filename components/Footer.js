import Link from 'next/link';
import Mailto from 'react-mailto-link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/about" className="text-gray-400 hover:text-gray-500">
            About
          </Link>
          <Link href="/post-ajob" className="text-gray-400 hover:text-gray-500">
            Post a Job
          </Link>
          <Link href="https://www.linkedin.com/in/will-gordon1/" target="_blank" className="text-gray-400 hover:text-gray-500">
            LinkedIn
          </Link>
          
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">
            &copy; 2024 Foster City Jobs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}