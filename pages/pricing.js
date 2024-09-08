import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pricing from '../components/Pricing';

export default function PricingPage() {
  return (
    <>
      <Head>
        <title>Pricing - Foster City Jobs</title>
        <meta name="description" content="Transparent pricing for Foster City Jobs" />
      </Head>
      <Header />
      <Pricing />
      <Footer />
    </>
  );
}