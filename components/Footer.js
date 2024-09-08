import Link from 'next/link';

export default function Footer() {
  const usefulLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'Accessibility', href: '/accessibility' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="w-full mx-auto md:px-12 px-8 max-w-7xl lg:px-16">
        <div className="flex flex-col md:flex-row justify-between py-12">
          <div className="mb-6 md:mb-0">
            <p className="text-base text-gray-400">
              &copy; 2024 Foster City Jobs.
            </p>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <Link href="/about" className="text-gray-400 hover:text-gray-500">
              About
            </Link>
            <Link href="/post-a-job" className="text-gray-400 hover:text-gray-500">
              Post a Job
            </Link>
            <Link href="https://tustinrecruiting.com/" target="_blank" className="text-gray-400 hover:text-gray-500">
              Tustin Recruiting
            </Link><Link href="https://www.linkedin.com/in/will-gordon1/" target="_blank" className="text-gray-400 hover:text-gray-500">
              LinkedIn
            </Link>
          </div>
        </div>
        <div className="mb-6">
            <p className="text-basemb-6 text-gray-400">
              No cookies on this site. Sorry.
            </p>
          </div>
      </div>
    </footer>
  );
}