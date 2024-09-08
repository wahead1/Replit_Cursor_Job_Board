import React from 'react';
import { IoCheckmarkOutline } from 'react-icons/io5';
import Mailto from 'react-mailto-link';

const PricingTier = ({ title, description, price, features, isPopular }) => (
  <section className={`flex flex-col px-6 rounded-3xl lg:py-8 ${isPopular ? 'bg-black lg:-mt-24' : ''}`}>
    <h3 className={`mt-5 text-lg font-display ${isPopular ? 'text-white' : 'text-black'}`}>{title}</h3>
    <p className={`mt-2 text-sm ${isPopular ? 'text-accent-100' : 'text-gray-500'}`}>{description}</p>
    <p className={`order-first text-5xl font-light tracking-tight font-display ${isPopular ? 'text-white' : 'text-black'}`}>{price}</p>
    <ul role="list" className={`flex flex-col order-last mt-10 text-sm gap-y-3 ${isPopular ? 'text-white' : 'text-gray-600'}`}>
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <IoCheckmarkOutline className="w-4 h-4" />
          <span className="ml-4">{feature}</span>
        </li>
      ))}
    </ul>
    <Mailto
      email="will@tustinrecruiting.com"
      options={{
        subject: `Inquiry about ${title} plan`,
        body: `Hi, I'm interested in the ${title} plan. Can you provide more information?`
      }}
      className={`inline-flex items-center justify-center w-full px-6 py-3 h-12 mt-8 text-center transition duration-200 ease-in-out transform border rounded-xl focus:outline-none ${
        isPopular
          ? 'text-black bg-white border-2 border-white hover:bg-transparent hover:text-white'
          : 'text-black bg-white border-gray-200 hover:bg-gray-200 hover:border-gray-200'
      }`}
    >
      Email me
    </Mailto>
  </section>
);

export default function Pricing() {
  const tiers = [
    {
      title: "Penny Pincher",
      description: "For those who think free air is too expensive",
      price: "Free",
      features: [
        "Post 1 job listing",
        "Reach up to 3 candidates (maybe)",
        "24/7 support (from your imaginary friend)",
        "Exclusive access to our 'Hire Someone, Anyone!' guide"
      ]
    },
    {
      title: "Bargain Hunter",
      description: "Because why pay for something when you can get it for free?",
      price: "Free",
      features: [
        "Post 3 job listings",
        "Reach up to 10 candidates (if they're not busy)",
        "Priority support (we'll think about your problem really hard)",
        "Free 'How to Convince People to Work for Free' e-book"
      ]
    },
    {
      title: "Thrifty Recruiter",
      description: "For those who want champagne hiring on a water budget",
      price: "Free",
      features: [
        "Post 10 job listings",
        "Reach up to 50 candidates (we'll wake them up)",
        "VIP support (we'll pretend to know what we're talking about)",
        "Access to our 'Jedi Mind Tricks for Recruiters' course",
        "Free 'How to Look Busy While Doing Nothing' guide"
      ],
      isPopular: true
    },
    {
      title: "Faux Mogul",
      description: "Act like a big shot without spending a dime",
      price: "Free",
      features: [
        "Post unlimited job listings (go wild!)",
        "Reach unlimited candidates (good luck managing that)",
        "24/7 premium support (from our team of highly trained hamsters)",
        "Access to our 'Fake It Till You Make It' masterclass",
        "Free 'How to Pretend You're a Fortune 500 Company' toolkit"
      ]
    }
  ];

  return (
    <section aria-labelledby="pricing-section" id="pricing">
      <div className="lg:px-16 max-w-7xl md:px-12 mx-auto px-8 py-12 scroll-mt-12">
        <div className="text-center max-w-3xl mx-auto">
        </div>
      </div>
      <div className="items-center px-8 pb-24 mx-auto max-w-7xl lg:px-16">
        <div className="grid max-w-2xl grid-cols-1 py-4 -mx-4 sm:grid-cols-2 gap-y-10 sm:mx-auto lg:max-w-none lg:grid-cols-4 xl:gap-x-4 lg:bg-gray-50 lg:border border-gray-500/10 lg:rounded-3xl">
          {tiers.map((tier, index) => (
            <PricingTier key={index} {...tier} />
          ))}
        </div>
      </div>
    </section>
  );
}