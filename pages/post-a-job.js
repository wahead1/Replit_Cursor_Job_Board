import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pricing from '../components/Pricing';

export default function PostAJob() {
  return (
    <>
      <Head>
        <title>Post a Job - Foster City Jobs</title>
        <meta name="description" content="Post a new job listing on Foster City Jobs" />
      </Head>
      <Header />
      <main>
        <section className="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-24 scroll-mt-12">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-4xl tracking-tight font-medium text-black md:text-5xl font-display">
              Post a Job
            </h1>
            <p className="mt-4 text-lg text-gray-500">
            If you ever want to seriously post a job on this platform, link to Foster City Jobs and tag me on <a 
        href="https://www.linkedin.com/in/will-gordon1/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-500 underline"
    >
         LinkedIn
    </a>. Will remain free.
</p>
          </div>
        </section>
        <Pricing />
      </main>
      <Footer />
    </>
  );
}