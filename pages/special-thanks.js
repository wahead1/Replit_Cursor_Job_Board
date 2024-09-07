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
              <h1 className="text-4xl tracking-tight font-medium text-black md:text-5xl font-display">
                Thank You So Much 🎉
              </h1>
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
                      description: "This design looks so good because of Michael Andreuzza. I knocked off his AstroSaaS Template. If you'd like to build something similar, check out Lexington Themes or reach out to him for custom work.",
                      link: "https://example.com/michael-andreuzza" 
                    },
                    {
                      title: "Replit",
                      description: "Truly remarkable what Amjad is doing for people breaking into coding. I've been a Replit free plan user for years. Just upgraded and their AI Agent does wonders for those who aren't familiar with setting up a proper environment."
                    },
                    {
                      title: "Cursor",
                      description: "Simply amazing product. This is the 5th job board I've built in the last 3 days using it. I just paid to support them. But all of this could have been done on the free plan. Very generous."
                    },
                    {
                      title: "OpenAI",
                      description: "What can you say that hasn't been said? Been working with their API for years. Helped me build and sell a few projects. I talk to ChatGPT everyday, 4+ hours per day."
                    },
                    {
                      title: "Anthropic",
                      description: "Claude is a serious competitor to OpenAI. I've been using Claude for a few months now. And noticed some serious improvement with Claude 3.5 Sonnet. The AI games have begun!"
                    },
                    {
                      title: "Vercel",
                      description: "Similar to Replit in that they make coding easier. One click deployments and a really nice interface for managing projects. Let's hope nobody DDOS attacks me so I can stay on their free plan."
                    },
                    {
                        title: "Supabase",
                        description: "First time every using Supabase. Seems like a no brainer for Postgres. I highly doubt I'll need to upgrade with this project. Will use on the next project I launch. Very well done."
                      },
                      {
                        title: "Free Code Camp",
                        description: "When I started to learn how to code, I thought about a bootcamp. This is free, it feels like school, but guess what? You'll learn! I can't stress how important the process of learning is."
                      },
                      {
                        title: "CodeCademy",
                        description: "Besides sitting with problems for hours and sometimes days, CodeCademy is the best resource to get fundamentals down. Ultimately, nothing is going to do the work for you. But, they make it fun."
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
          <div className="mx-auto max-w-xl mt-24 text-center">
            <div>
              <p className="text-4xl tracking-tight font-medium text-black md:text-5xl font-display">
                Thank you!
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}