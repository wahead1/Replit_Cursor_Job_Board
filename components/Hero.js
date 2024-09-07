import Link from 'next/link';

export default function Hero() {
  return (
    <section className="pb-8"> {/* Added pb-8 for bottom padding */}
      <div className="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-12"> {/* Reduced py-24 to py-12 */}
        <div>
          <div className="text-center max-w-4xl mx-auto">
            <div className="sm:flex sm:justify-center">
              <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                <Link href="https://lexingtonthemes.com/free-templates/" className="font-semibold text-accent-600">
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  <span className="block lg:inline">
                    Foster City Jobs <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              </div>
            </div>
            <p className="text-4xl tracking-tight font-medium text-black md:text-5xl font-display mt-8">
              Your Gateway to Local Opportunities
            </p>
            <p className="text-gray-500 lg:text-xl max-w-2xl mt-4 mx-auto text-base">
                This Job Board was made entirely with Artificial Intelligence.
            </p>
          </div>
          <div className="flex justify-center gap-3 mt-10 flex-col sm:flex-row">
            <Link href="https://github.com/your-github-repo" className="items-center justify-center h-12 font-medium rounded-xl focus-visible:outline-black focus:outline-none inline-flex duration-200 text-black lg:w-auto px-6 py-3 text-center text-black/80 w-full border">
              About This Project
            </Link>
            <Link href="/jobs" className="items-center justify-center h-12 font-medium rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-black border-2 border-black duration-200 focus-visible:ring-black hover:bg-transparent hover:border-black hover:text-black lg:w-auto px-6 py-3 text-center text-white w-full">
              Post a Job &nbsp; &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}