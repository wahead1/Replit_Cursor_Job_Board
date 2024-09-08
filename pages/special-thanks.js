import Head from 'next/head';
import { IoScanOutline } from 'react-icons/io5';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SpecialThanks() {
  return (
    <>
      <Head>
        <title>Special Thanks - Foster City Jobs</title>
        <meta name="description" content="Special thanks to the technologies and people that made this project possible" />
      </Head>
      <Header />
      <section id="features">
        <div className="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-24 scroll-mt-12">
          <div className="mx-auto max-w-xl text-center">
            <div>
              <p className="text-4xl tracking-tight font-medium text-black md:text-5xl font-display">
                Special Thanks to Our Tech Stack
              </p>
              <p className="mt-4 text-lg text-na mx-auto tracking-tight text-gray-500">
                This project was made possible by the following technologies and the amazing teams behind them. It is not endorsed by or sponsored by anyone on this list.
              </p>
            </div>
          </div>
          <div>
            <div className="mx-auto max-w-7xl pt-24">
              <h2 className="sr-only">Features.</h2>
              <div>
                <div className="grid gap-12 grid-cols-1 lg:space-y-0 lg:text-center md:grid-cols-3">
                  {[
                    {
                      title: "Michael Andreuzza",
                      description: "For designing this awesome website. I ran his work through AI with his blessing. GNU License. You ROCK!"
                    },
                    {
                      title: "Tailwind CSS",
                      description: "Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces."
                    },
                    {
                      title: "Supabase",
                      description: "Supabase is an open source Firebase alternative, providing all the backend services you need to build a product."
                    },
                    {
                      title: "Replit",
                      description: "For making it easier for people to code around the world. Their new AI Agent is going to help non-technical people build awesome products."
                    },
                    {
                      title: "Cursor",
                      description: "Wow! The pricing section is a little harsh! Such an amazing AI coding assistant. I built this at lightning speed. Well done!"
                    },
                    {
                      title: "OpenAI",
                      description: "What can I say that hasn't already been said? Been using OpenAI for years. Incredible platform. Thank you for all your hard work!"
                    },
                    {
                        title: "Anthropic",
                        description: "Claude 3.5 Sonnet is a serious LLM competitor for OpenAI. Incredibly powerful. The AI games have begun!!"
                      },
                      {
                        title: "Free Code Camp",
                        description: "For helping me learn how to code many moons ago. A free platform that changed my life. Thank you!"
                      },
                      {
                        title: "Codecademy",
                        description: "My personal favoritet learning tool. Ultimately, you'll have to find what works for you. But Codecademy is one of the best."
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