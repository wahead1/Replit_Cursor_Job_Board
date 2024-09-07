import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 items-start gap-x-8 gap-y-24 ">
          <Link href="/" className="xl:col-span-1 text-black inline-flex items-center gap-3">
            <svg className="h-4" viewBox="0 0 78 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" className="ccustom" fill="#283CFF"></path>
              <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" className="ccompli1" fill="#5263FF"></path>
              <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" className="ccompli2" fill="#808CFF"></path>
            </svg>
            <span className="font-bold font-display">Foster City Jobs</span>
          </Link>
          <div className="md:grid md:grid-cols-2 xl:grid-cols-4 md:gap-8 text-sm text-gray-400 lg:col-span-3">
            <div>
              <h3 className="text-lg text-black font-medium tracking-tight">
                All pages
              </h3>
              <ul role="list" className="mt-4 space-y-1">
                <li>
                  <Link href="/" className="hover:text-black">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-black">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-black">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-black">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-12 md:mt-0">
              <h3 className="text-lg text-black font-medium tracking-tight">
                Resources
              </h3>
              <ul role="list" className="mt-4 space-y-1">
                <li>
                  <a
                    href="https://github.com/wcgordon1/Replit_Cursor_Job_Board"
                    className="hover:text-black"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub repo
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg text-black font-medium tracking-tight">
                NoCode Boards
              </h3>
              <ul role="list" className="mt-4 space-y-1">
                <li>
                  <a
                    href="https://www.tustinrecruiting.com/"
                    className="hover:text-black"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tustin Recruiting
                  </a>
                </li>
              </ul>
              <ul role="list" className="mt-4 space-y-1">
                <li>
                  <a
                    href="https://nocodejobs.org/"
                    className="hover:text-black"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    No Code Jobs
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-12 md:mt-0">
              <h3 className="text-lg text-black font-medium tracking-tight">Socials</h3>
              <ul role="list" className="mt-4 space-y-1">
                <li>
                  <a
                    href="https://www.linkedin.com/in/will-gordon1/"
                    className="hover:text-black"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
  <div className="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-6">
    <div className="border-t pt-6">
      <p className="text-sm text-neutral-600 lg:col-span-2">
        © 2024 Foster City Jobs. All rights reserved. Foster City Jobs is not
        affiliated with OpenAI, Replit, Cursor, Claude, Vercel, Lexington Themes, Astro or Tailwind teams, nor is it endorsed by or
        sponsored by them. It is a side project by <a
          className="text-sm text-black hover:text-accent-400 underline"
          href="https://www.linkedin.com/in/will-gordon1/"
          target="_blank"
          rel="noopener noreferrer"
        >Will Gordon</a>.
      </p>
      <p className="text-sm text-neutral-600 lg:col-span-2 mt-4">☕️ & 🏋️ & 🐶 in Newport Beach, California.</p> {/* Add margin here */}
    </div>
  </div>
</div>
    </footer>
  );
}