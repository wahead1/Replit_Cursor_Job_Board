import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import JobApplicationForm from '../../components/JobApplicationForm';

export default function JobDetails({ job }) {
  if (!job) {
    return <div>Job not found</div>;
  }

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "identifier": {
      "@type": "PropertyValue",
      "name": job.company,
      "value": job.job_id
    },
    "datePosted": job.created_at,
    "validThrough": job.valid_through,
    "employmentType": job.employment_type,
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company,
      "sameAs": job.company_website,
      "logo": job.company_logo
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": job.street_address,
        "addressLocality": job.city,
        "addressRegion": job.state,
        "postalCode": job.postal_code,
        "addressCountry": job.country
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": job.salary_currency,
      "value": {
        "@type": "QuantitativeValue",
        "value": job.salary_amount,
        "unitText": job.salary_unit
      }
    }
  };

  // Function to validate and format the logo URL
  const getLogoUrl = (logo) => {
    if (!logo) return null;
    if (logo.startsWith('http://') || logo.startsWith('https://')) return logo;
    if (logo.startsWith('//')) return `https:${logo}`;
    return `https://${logo}`;
  };

  // Function to format salary with commas
  const formatSalary = (amount, currency) => {
    // List of valid currency codes
    const validCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'NZD'];
    
    // Check if the provided currency is valid
    const isValidCurrency = validCurrencies.includes(currency);

    if (isValidCurrency) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    } else {
      // If currency is invalid, just format the number without currency symbol
      return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount) + (currency ? ` ${currency}` : '');
    }
  };

  return (
    <>
      <Head>
        <title>{`${job.title} - ${job.company}`}</title>
        <meta name="description" content={`${job.title} job at ${job.company} in ${job.city}, ${job.state}`} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Head>
      <Header />
      <main className="max-w-6xl mx-auto px-8 md:px-32 py-8">
        <div className="flex flex-col items-center mb-8">
          {getLogoUrl(job.company_logo) ? (
            <div className="relative w-[100px] h-[100px] mb-4">
              <Image
                src={getLogoUrl(job.company_logo)}
                alt={`${job.company} logo`}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                unoptimized
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/[0.08]"></div>
            </div>
          ) : (
            <div className="w-[100px] h-[100px] bg-gray-200 rounded-full flex items-center justify-center mb-4 relative">
              <span className="text-2xl font-bold text-gray-500">
                {job.company.charAt(0)}
              </span>
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/[0.08]"></div>
            </div>
          )}
          <h1 className="text-3xl font-bold text-center mb-2">{job.title}</h1>
          <h2 className="text-xl text-center mb-2">{job.company}</h2>
          <p className="text-center">{job.city}, {job.state}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Salary</h3>
          <p>{formatSalary(job.salary_amount, job.salary_currency)} {job.salary_unit}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Employment Type</h3>
          <p>{job.employment_type}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Description</h3>
          <div dangerouslySetInnerHTML={{ __html: job.description }} />
        </div>
        <a href={job.company_website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        {job.company} Website
        </a>
        <div className="mt-12">
          <JobApplicationForm jobId={job.id} jobTitle={job.title} companyName={job.company} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const supabase = createPagesServerClient(context);
  const { slug } = context.params;

  const { data: job, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !job) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      job,
    },
  };
}