import Head from 'next/head';
import { IoScanOutline } from 'react-icons/io5';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SpecialThanks() {
  return (
    <>
      <Head>
        <title>The following made this possible</title>
        <meta name="description" content="Special thanks to the technologies and people that made this project possible" />
      </Head>
      <Header />
      <section id="features">
        <div className="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-24 scroll-mt-12">
          <div className="mx-auto max-w-xl text-center">
            <div>
              <p className="text-4xl tracking-tight font-medium text-black md:text-5xl font-display">
                Thank You So Much
              </p>
              <p className="mt-4 text-lg text-na mx-auto tracking-tight text-gray-500">
                This project was made possible by the following technologies and the amazing teams behind them.
              </p>
            </div>
          </div>
          <div>
            <div className="mx-auto max-w-7xl pt-12">
              <h2 className="sr-only">Features.</h2>
              <div>
                <div className="grid gap-12 grid-cols-1 lg:space-y-0 lg:text-center md:grid-cols-3">
                  {[
                    {
                      title: "Michael Andreuzza",
                      description: "This design looks so good because of Michael Andreuzza. I knocked off his AstroSaaS Template. If you'd like to build something similar, check out Lexington Themes or reach out to him for custom work."
                    },
                    {
                      title: "Replit",
                      description: "Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces."
                    },
                    {
                      title: "Cursor",
                      description: "Supabase is an open source Firebase alternative, providing all the backend services you need to build a product."
                    },
                    {
                      title: "OpenAI",
                      description: "This project is built with accessibility in mind, ensuring a great experience for all users, including those using screen readers."
                    },
                    {
                      title: "Claude",
                      description: "The application has been tested across modern browsers to ensure compatibility and reliability."
                    },
                    {
                      title: "Simple deploys",
                      description: "This Next.js application can be easily deployed on platforms like Vercel, Netlify, or any other service supporting Node.js."
                    }
                  ].map((feature, index) => (
                    <div key={index}>
                      <div>
                        <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10 lg:mx-auto">
                          <IoScanOutline className="h-4 w-4" />
                        </div>
                        <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                          {feature.title}
                        </p>
                      </div>
                      <div className="mt-4 text-gray-500 text-sm">
                        {feature.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}