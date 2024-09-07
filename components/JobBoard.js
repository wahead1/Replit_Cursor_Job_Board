import { useState } from 'react';
import Link from 'next/link';

export default function JobBoard({ jobs }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter(job => {
    const searchTermLower = searchTerm.toLowerCase().trim();
    const isSalarySearch = !isNaN(searchTermLower) && searchTermLower !== '';
    
    return (
      job.title.toLowerCase().includes(searchTermLower) ||
      job.company.toLowerCase().includes(searchTermLower) ||
      job.city.toLowerCase().includes(searchTermLower) ||
      job.state.toLowerCase().includes(searchTermLower) ||
      (isSalarySearch && job.salary_amount >= parseInt(searchTermLower))
    );
  });

  return (
    <section className="max-w-6xl mx-auto px-8 md:px-32 py-8"> {/* Changed py-4 to py-8 */}
      <div className="border-gray-200 pb-5">
        <h3 className="text-2xl lg:text-3xl font-semibold leading-6 text-slate-900 mb-4">Latest jobs</h3> {/* Increased text size */}
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition duration-200 ease-in-out"
        />
      </div>
      <ul className="divide-y divide-slate-100">
        {filteredJobs.map(job => (
          <li key={job.id}>
            <div className="group relative py-6 sm:rounded-2xl">
              <div className="absolute inset-x-4 -inset-y-px bg-slate-50 opacity-0 group-hover:opacity-100 sm:-inset-x-6 rounded-2xl lg:-inset-x-8 duration-200"></div>
              <div className="relative flex items-center">
                <div className="relative h-[3.125rem] w-[3.125rem] sm:h-[3.75rem] sm:w-[3.75rem] flex-none">
                  <img className="absolute inset-0 h-full w-full rounded-full object-cover" src={job.company_logo || "/logos/default.svg"} alt={`${job.company} Logo`} />
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/[0.08]"></div>
                </div>
                <dl className="ml-4 flex-auto grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto] sm:items-center">
                  <div className="col-span-2 sm:col-span-1 flex-none">
                    <dt className="sr-only">Company</dt>
                    <dd className="text-xs font-semibold leading-6 text-slate-900">{job.company}</dd>
                  </div>
                  <div className="col-start-3 row-start-2 -ml-2.5 flex-auto sm:ml-0 sm:pl-6">
                    <dt className="sr-only">Location</dt>
                    <dd className="flex items-center text-xs leading-6 text-slate-500">
                      <svg viewBox="0 0 2 2" aria-hidden="true" className="mr-2 h-0.5 w-0.5 flex-none fill-slate-400 sm:hidden">
                        <circle cx="1" cy="1" r="1"></circle>
                      </svg>
                      {job.city}, {job.state}, {job.country}
                    </dd>
                  </div>
                  <div className="col-span-2 col-start-1 w-full flex-none">
                    <dt className="sr-only">Title</dt>
                    <dd className="text-base font-semibold leading-6 text-slate-900">
                      <Link href={`/jobs/${job.id}`}>
                        <span className="absolute -inset-x-4 inset-y-[calc(-1*(theme(spacing.6)+1px))] sm:-inset-x-6 sm:rounded-2xl lg:-inset-x-8"></span>
                        {job.title}
                      </Link>
                    </dd>
                  </div>
                  <div className="col-start-1 mr-2.5 flex-none">
                    <dt className="sr-only">Type</dt>
                    <dd className="text-xs leading-6 text-slate-500">{job.employment_type}</dd>
                  </div>
                  <div className="col-span-3 -ml-2.5 flex-none">
                    <dt className="sr-only">Salary</dt>
                    <dd className="flex items-center text-xs leading-6 text-slate-500">
                      <svg viewBox="0 0 2 2" aria-hidden="true" className="mr-2 h-0.5 w-0.5 flex-none fill-slate-400">
                        <circle cx="1" cy="1" r="1"></circle>
                      </svg>
                      {job.salary_currency} {job.salary_amount} {job.salary_unit}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}