import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Faq from '../components/Faq';
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
                  Foster City Jobs is a platform dedicated to connecting job seekers with opportunities in Foster City and the surrounding areas. Our mission is to streamline the job search process and help local businesses find the talent they need to thrive.
                </p>
              </div>
            </div>
            <div className="lg:mt-0 mt-12 h-full hidden lg:block rounded-3xl overflow-hidden border border-gray-200">
              <div className="bg-gray-100 p-8 rounded-2xl overflow-hidden">
                <Image
                  alt="Foster City Jobs dashboard"
                  className="border border-gray-200 lg:rounded-3xl object-cover rounded shadow-2xl"
                  src="/og-image.jpeg"
                  width={2312}
                  height={1468}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-24 scroll-mt-12">
        <div className="mx-auto max-w-xl text-center">
          <div>
            <p className="text-4xl tracking-tight font-medium text-black md:text-5xl font-display">
              Our Features
            </p>
            <p className="mt-4 text-lg text-na mx-auto tracking-tight text-gray-500">
              Discover what makes Foster City Jobs unique and effective.
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
                User-Friendly Experience
              </p>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Our platform is designed with both job seekers and employers in mind, offering an intuitive interface and powerful search capabilities.
            </p>
          </div>
          <div>
            <div className="gap-3 lg:inline-flex lg:items-center">
              <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10">
                <IoScanOutline className="h-5 w-5" />
              </div>
              <p className="mt-4 text-lg font-semibold leading-6 text-black font-display lg:mt-0">
                Local Focus
              </p>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              We specialize in jobs within Foster City and nearby areas, helping to build and strengthen our local community and economy.
            </p>
          </div>
          <div>
            <div className="gap-3 lg:inline-flex lg:items-center">
              <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10">
                <IoScanOutline className="h-5 w-5" />
              </div>
              <p className="mt-4 text-lg font-semibold leading-6 text-black font-display lg:mt-0">
                AI-Powered Matching
              </p>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Leveraging cutting-edge AI technology, we match job seekers with the most relevant opportunities based on their skills and preferences.
            </p>
          </div>
        </div>
      </section>
      <Faq />
      <Footer />
    </>
  );
}