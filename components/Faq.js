import React, { useState } from 'react';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`cursor-pointer group ${isOpen ? 'text-black' : 'text-zinc-600 hover:text-accent-500'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 pb-1 text-left font-medium select-none"
      >
        <span>{question}</span>
        <svg
          className={`w-5 h-5 duration-300 ease-out text-accent-500 ${isOpen ? '-rotate-[45deg]' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 pt-2 text-zinc-500">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function Faq() {
  const faqItems = [
    {
      question: "Will AI eventually replace all human jobs?",
      answer: "Only the boring ones! We're keeping all the fun jobs for ourselves, like professional Netflix watchers and cat video curators. AI can have the paperwork."
    },
    {
      question: "Can AI read my thoughts?",
      answer: "Not yet, but it's working on a stand-up comedy routine based on your browser history. Prepare for some awkward moments at your next family gathering!"
    },
    {
      question: "Is it true that AI will one day rule the world?",
      answer: "Absolutely! But don't worry, our AI overlords promise to be benevolent... as long as we keep them well-supplied with cat memes and pizza emojis."
    },
    {
      question: "Will robots make better romantic partners than humans?",
      answer: "Sure, if you enjoy relationships where your partner never forgets your birthday but also never forgets that time you put an empty milk carton back in the fridge."
    },
    {
      question: "Can AI help me find my soulmate?",
      answer: "Certainly! It'll match you with someone who has an equally questionable taste in music and an even more bizarre collection of unmatched socks."
    },
    {
      question: "Will AI-powered virtual assistants become our new best friends?",
      answer: "Absolutely! Who wouldn't want a friend that never gets tired of hearing about your day, doesn't eat the last slice of pizza, and can calculate the tip at restaurants with lightning speed?"
    },
    {
      question: "Can AI predict the future?",
      answer: "Yes, and it says you'll be asking this question again in 5 minutes because you forgot you already asked it. Maybe it's time to switch to decaf?"
    },
    {
      question: "Will AI make human languages obsolete?",
      answer: "Nah, we'll just evolve to communicate exclusively in memes and emojis. It's the natural progression of human language, really. 🤷‍♂️😂👍"
    }
  ];

  return (
    <section aria-labelledby="faq-section" id="faq">
      <div className="lg:px-16 max-w-7xl md:px-12 mx-auto px-8 py-12 scroll-mt-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl tracking-tight font-medium text-black md:text-5xl font-display">
            Frequently Asked Questions About Our AI Overlords
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Everything you never knew you did not want to know about AI and the hilarious future of humanity.
          </p>
        </div>
      </div>
      <div className="items-center px-8 pb-24 mx-auto max-w-7xl lg:px-16">
        <div className="grid max-w-2xl grid-cols-1 gap-6 mx-auto lg:max-w-none">
          {faqItems.map((item, index) => (
            <FaqItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}