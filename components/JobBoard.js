import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SkeletonLoader from './SkeletonLoader';

export default function JobBoard({ jobs, isLoading }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    // Sort jobs by created_at in descending order (most recent first)
    const sortedJobs = [...jobs].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setFilteredJobs(sortedJobs);
  }, [jobs]);

  // Function to validate and format the logo URL
  const getLogoUrl = (logo) => {
    if (!logo) return null;
    if (logo.startsWith('http://') || logo.startsWith('https://')) return logo;
    if (logo.startsWith('//')) return `https:${logo}`;
    return `https://${logo}`;
  };

  // Function to format salary with commas
  const formatSalary = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    setSearchTerm(searchTerm);

    const filtered = jobs
      .filter(job => {
        const isSalarySearch = !isNaN(searchTerm) && searchTerm !== '';
        
        if (isSalarySearch) {
          return job.salary_amount >= parseInt(searchTerm);
        } else {
          return (
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.city.toLowerCase().includes(searchTerm) ||
            job.state.toLowerCase().includes(searchTerm)
          );
        }
      })
      // Sort filtered jobs by created_at in descending order
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    setFilteredJobs(filtered);
  };

  return (
    <section className="max-w-6xl mx-auto px-8 md:px-32 py-2">
      <div className="border-gray-200 pb-5 flex justify-between items-center">
        <h3 className="text-2xl lg:text-3xl font-semibold leading-6 text-slate-900">Latest jobs</h3>
        <p className="text-sm text-gray-500">Total jobs: {filteredJobs.length}</p>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search jobs by title, company, location, or minimum salary..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition duration-200 ease-in-out"
        />
      </div>
      <ul className="divide-y divide-slate-100">
        {isLoading ? (
          Array(10).fill().map((_, index) => (
            <li key={index}>
              <SkeletonLoader />
            </li>
          ))
        ) : (
          filteredJobs.map(job => (
            <li key={job.id}>
              <div className="group relative py-6 sm:rounded-2xl">
                <div className="absolute inset-x-4 -inset-y-px bg-slate-50 opacity-0 group-hover:opacity-100 sm:-inset-x-6 rounded-2xl lg:-inset-x-8 duration-200"></div>
                <div className="relative flex items-center">
                  <div className="relative h-[3.125rem] w-[3.125rem] sm:h-[3.75rem] sm:w-[3.75rem] flex-none">
                    {getLogoUrl(job.company_logo) ? (
                      <Image
                        src={getLogoUrl(job.company_logo)}
                        alt={`${job.company} Logo`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-500">
                          {job.company.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/[0.08]"></div>
                  </div>
                  <dl className="ml-4 flex-auto grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto] sm:items-center">
                    <div className="col-span-2 sm:col-span-1 flex-none">
                      <dt className="sr-only">Company</dt>
                      <dd className="text-xs font-semibold leading-6 text-slate-900">{job.company}</dd>
                    </div>
                    <div className="col-span-2 col-start-1 w-full flex-none">
                      <dt className="sr-only">Title</dt>
                      <dd className="text-base font-semibold leading-6 text-slate-900">
                        <Link href={`/jobs/${job.slug}`}>
                          <span className="absolute -inset-x-4 inset-y-[calc(-1*(theme(spacing.6)+1px))] sm:-inset-x-6 sm:rounded-2xl lg:-inset-x-8"></span>
                          {job.title}
                        </Link>
                      </dd>
                    </div>
                    <div className="col-start-1 row-start-3 sm:col-start-3 sm:row-start-2 flex-auto sm:pl-6">
                      <dt className="sr-only">Location</dt>
                      <dd className="flex items-center text-xs leading-6 text-slate-500 sm:justify-end">
                        {job.city}, {job.state}, {job.country}
                      </dd>
                    </div>
                    <div className="col-start-1 mr-2.5 flex-none">
                      <dt className="sr-only">Type</dt>
                      <dd className="text-xs leading-6 text-slate-500">{job.employment_type}</dd>
                    </div>
                    <div className="col-span-3 flex-none">
                      <dt className="sr-only">Salary</dt>
                      <dd className="flex items-center text-xs leading-6 text-slate-500">
                        {formatSalary(job.salary_amount, job.salary_currency)} {job.salary_unit}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}