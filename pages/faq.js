import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Faq from '../components/Faq';

export default function FaqPage() {
  return (
    <>
      <Head>
        <title>FAQ - Foster City Jobs</title>
        <meta name="description" content="Frequently Asked Questions about Foster City Jobs" />
      </Head>
      <Header />
      <Faq />
      <Footer />
    </>
  );
}