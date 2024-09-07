import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { IoScanOutline } from 'react-icons/io5';

export default function About() {
  return (
    <>
      <Head>
        <title>About Foster City Jobs</title>
        <meta name="description" content="Learn more about Foster City Jobs and our mission" />
      </Head>
      <Header />
      <section>
        <div className="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-24 scroll-mt-12">
          <div className="grid grid-cols-1 gap-4 mt-6 items-center list-none lg:grid-cols-2 lg:gap-24">
            <div className="text-center lg:text-left">
              <div>
                <p className="text-4xl tracking-tight font-medium text-black md:text-5xl font-display">
                  Foster City Jobs
                </p>
                <p className="text-base mt-4 text-gray-500">
                Foster City Jobs was built entirely using free resources available to anyone with internet access. My hope is to inspire others to explore new skills and try something new. 
                 </p>
                 <p className="text-base mt-4 text-gray-500">
                 If you would like to support this project, please consider sharing it on your preferred social media platform.               
                 </p>
              </div>
            </div>
            <div className="lg:mt-0 mt-12 h-full hidden lg:block rounded-3xl overflow-hidden border border-gray-200">
              <div className="bg-gray-100 p-8 rounded-2xl overflow-hidden">
                <Image
                  alt="Foster City Jobs dashboard"
                  className="border border-gray-200 lg:rounded-3xl object-cover rounded shadow-2xl"
                  src="/images/dashboard.svg"
                  width={500}
                  height={300}
                />
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-xl mt-24 text-center">
            <div>
              <h2 className="text-4xl tracking-tight font-medium text-black md:text-5xl font-display">
                Endless Possibilities 🎉
              </h2>
              <p className="mt-4 text-lg text-na mx-auto tracking-tight text-gray-500">
                If you feel inspired I hope you take the initiative to learn something new. Anything. Go out there and do it.
              </p>
            </div>
          </div>
          <div className="mt-24 w-full gap-12 grid grid-cols-1 lg:gap-24 lg:grid-cols-3">
            <div>
              <div className="gap-3 lg:inline-flex lg:items-center">
                <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10">
                  <IoScanOutline className="h-5 w-5" />
                </div>
                <p className="mt-4 text-lg font-semibold leading-6 text-black font-display lg:mt-0">
                GNU License
                 </p>
              </div>
              <p className="text-gray-500 text-sm mt-4">
              The licenses for most software and other practical works are designed
to take away your freedom to share and change the works.  By contrast,
the GNU General Public License is intended to guarantee your freedom to
share and change all versions of a program--to make sure it remains free
software for all its users.
              </p>
            </div>
            <div>
              <div className="gap-3 lg:inline-flex lg:items-center">
                <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10">
                  <IoScanOutline className="h-5 w-5" />
                </div>
                <p className="mt-4 text-lg font-semibold leading-6 text-black font-display lg:mt-0">
                  Will add more later
                </p>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                Placeholder...
              </p>
            </div>
            <div>
              <div className="gap-3 lg:inline-flex lg:items-center">
                <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10">
                  <IoScanOutline className="h-5 w-5" />
                </div>
                <p className="mt-4 text-lg font-semibold leading-6 text-black font-display lg:mt-0">
                  And more
                </p>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                Placeholder...
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}