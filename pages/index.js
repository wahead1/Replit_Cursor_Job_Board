import { useState, useEffect, useCallback } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Home() {
  const [jobs, setJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredJobs, setFilteredJobs] = useState([])
  const supabase = useSupabaseClient()

  const fetchJobs = useCallback(async () => {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
    if (error) {
      console.error('Error fetching jobs:', error)
    } else {
      setJobs(data)
      setFilteredJobs(data)
    }
  }, [supabase])

  const filterJobs = useCallback(() => {
    const filtered = jobs.filter(job => {
      const searchTermLower = searchTerm.toLowerCase()
      const isSalarySearch = !isNaN(searchTerm) && searchTerm.trim() !== ''
      
      return (
        job.title.toLowerCase().includes(searchTermLower) ||
        job.company.toLowerCase().includes(searchTermLower) ||
        job.city.toLowerCase().includes(searchTermLower) ||
        job.state.toLowerCase().includes(searchTermLower) ||
        (isSalarySearch && job.salary_amount >= parseInt(searchTerm))
      )
    })
    setFilteredJobs(filtered)
  }, [jobs, searchTerm])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  useEffect(() => {
    if (searchTerm.length >= 2) {
      filterJobs()
    } else {
      setFilteredJobs(jobs)
    }
  }, [searchTerm, jobs, filterJobs])

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Foster City Jobs
        </h1>
        <p className="text-xl text-center text-gray-600 mb-8">
          This job board was built entirely with AI thanks in large part to the teams at Replit and Cursor.
        </p>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-4">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-600">{job.city}, {job.state}</p>
              {job.salary_amount && (
                <p className="text-gray-600">
                  Salary: {job.salary_currency} {job.salary_amount} {job.salary_unit}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}