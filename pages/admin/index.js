import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    description: '',
    jobId: '',
    employmentType: '',
    companyWebsite: '',
    companyLogo: '',
    salaryCurrency: '',
    salaryAmount: '',
    salaryUnit: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  })
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editingJobId, setEditingJobId] = useState(null)
  const supabase = useSupabaseClient()

  const fetchJobs = useCallback(async () => {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
    if (error) console.error('Error fetching jobs:', error)
    else setJobs(data)
  }, [supabase])

  const checkAuthAndFetchJobs = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/login')
    } else {
      await fetchJobs()
      setIsLoading(false)
    }
  }, [supabase, router, fetchJobs])

  useEffect(() => {
    checkAuthAndFetchJobs()
  }, [checkAuthAndFetchJobs])

  async function handleSubmit(e) {
    e.preventDefault()
    console.log('Submitting job:', newJob)
    try {
      const url = isEditing ? `/api/jobs/${editingJobId}` : '/api/jobs'
      const method = isEditing ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      })
      const data = await response.json()
      console.log('Response from job operation:', data)
      if (response.ok) {
        setNewJob({
          title: '',
          company: '',
          description: '',
          jobId: '',
          employmentType: '',
          companyWebsite: '',
          companyLogo: '',
          salaryCurrency: '',
          salaryAmount: '',
          salaryUnit: '',
          streetAddress: '',
          city: '',
          state: '',
          postalCode: '',
          country: ''
        })
        setIsEditing(false)
        setEditingJobId(null)
        fetchJobs()
      } else {
        console.error('Failed to create/update job:', data.error)
        alert(`Failed to create/update job: ${data.error}`)
      }
    } catch (error) {
      console.error('Error submitting job:', error)
      alert(`Error submitting job: ${error.message}`)
    }
  }

  async function deleteJob(id) {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .match({ id })
    if (error) {
      console.error('Error deleting job:', error)
    } else {
      fetchJobs()
    }
  }

  async function duplicateJob(job) {
    setNewJob({
      title: job.title,
      company: job.company,
      description: job.description,
      jobId: `${job.job_id}-copy`,
      employmentType: job.employment_type || '',
      companyWebsite: job.company_website || '',
      companyLogo: job.company_logo || '',
      salaryCurrency: job.salary_currency || '',
      salaryAmount: job.salary_amount || '',
      salaryUnit: job.salary_unit || '',
      streetAddress: job.street_address || '',
      city: job.city || '',
      state: job.state || '',
      postalCode: job.postal_code || '',
      country: job.country || ''
    })
    window.scrollTo(0, 0)
  }

  function editJob(job) {
    setNewJob({
      title: job.title,
      company: job.company,
      description: job.description,
      jobId: job.job_id,
      employmentType: job.employment_type || '',
      companyWebsite: job.company_website || '',
      companyLogo: job.company_logo || '',
      salaryCurrency: job.salary_currency || '',
      salaryAmount: job.salary_amount || '',
      salaryUnit: job.salary_unit || '',
      streetAddress: job.street_address || '',
      city: job.city || '',
      state: job.state || '',
      postalCode: job.postal_code || '',
      country: job.country || ''
    })
    setIsEditing(true)
    setEditingJobId(job.id)
    window.scrollTo(0, 0)
  }

  function handleInputChange(e) {
    const { name, value } = e.target
    setNewJob(prev => ({ ...prev, [name]: value }))
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error logging out:', error)
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="mb-12 bg-white shadow-md rounded px-8 pt-6 pb-8">
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Job Title
              </label>
              <input
                id="title"
                name="title"
                value={newJob.title}
                onChange={handleInputChange}
                placeholder="Job Title"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                Company
              </label>
              <input
                id="company"
                name="company"
                value={newJob.company}
                onChange={handleInputChange}
                placeholder="Company"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newJob.description}
              onChange={handleInputChange}
              placeholder="Job Description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-64"
            />
          </div>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobId">
                Job ID
              </label>
              <input
                id="jobId"
                name="jobId"
                value={newJob.jobId}
                onChange={handleInputChange}
                placeholder="Job ID"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employmentType">
                Employment Type
              </label>
              <input
                id="employmentType"
                name="employmentType"
                value={newJob.employmentType}
                onChange={handleInputChange}
                placeholder="Employment Type"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
              />
            </div>
          </div>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyWebsite">
                Company Website
              </label>
              <input
                id="companyWebsite"
                name="companyWebsite"
                value={newJob.companyWebsite}
                onChange={handleInputChange}
                placeholder="Company Website"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyLogo">
                Company Logo URL
              </label>
              <input
                id="companyLogo"
                name="companyLogo"
                value={newJob.companyLogo}
                onChange={handleInputChange}
                placeholder="Company Logo URL"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
              />
            </div>
          </div>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salaryCurrency">
                Salary Currency
              </label>
              <input
                id="salaryCurrency"
                name="salaryCurrency"
                value={newJob.salaryCurrency}
                onChange={handleInputChange}
                placeholder="Salary Currency"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salaryAmount">
                Salary Amount
              </label>
              <input
                id="salaryAmount"
                name="salaryAmount"
                value={newJob.salaryAmount}
                onChange={handleInputChange}
                placeholder="Salary Amount"
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
              />
            </div>
          </div>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salaryUnit">
                Salary Unit
              </label>
              <input
                id="salaryUnit"
                name="salaryUnit"
                value={newJob.salaryUnit}
                onChange={handleInputChange}
                placeholder="Salary Unit"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
              />
            </div>
          </div>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="streetAddress">
                Street Address
              </label>
              <input
                id="streetAddress"
                name="streetAddress"
                value={newJob.streetAddress}
                onChange={handleInputChange}
                placeholder="Street Address"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                City
              </label>
              <input
                id="city"
                name="city"
                value={newJob.city}
                onChange={handleInputChange}
                placeholder="City"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
              />
            </div>
          </div>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                State
              </label>
              <input
                id="state"
                name="state"
                value={newJob.state}
                onChange={handleInputChange}
                placeholder="State"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postalCode">
                Postal Code
              </label>
              <input
                id="postalCode"
                name="postalCode"
                value={newJob.postalCode}
                onChange={handleInputChange}
                placeholder="Postal Code"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
              />
            </div>
          </div>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                Country
              </label>
              <input
                id="country"
                name="country"
                value={newJob.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out cursor-pointer"
            >
              {isEditing ? 'Submit Job Edit' : 'Create Job'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false)
                  setEditingJobId(null)
                  setNewJob({
                    title: '',
                    company: '',
                    description: '',
                    jobId: '',
                    employmentType: '',
                    companyWebsite: '',
                    companyLogo: '',
                    salaryCurrency: '',
                    salaryAmount: '',
                    salaryUnit: '',
                    streetAddress: '',
                    city: '',
                    state: '',
                    postalCode: '',
                    country: ''
                  })
                }}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out cursor-pointer ml-4"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border border-gray-300 p-3 text-left">Title</th>
                <th className="border border-gray-300 p-3 text-left">Company</th>
                <th className="border border-gray-300 p-3 text-left">Valid Through</th>
                <th className="border border-gray-300 p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id} className="border-b border-gray-300">
                  <td className="border border-gray-300 p-3">{job.title}</td>
                  <td className="border border-gray-300 p-3">{job.company}</td>
                  <td className="border border-gray-300 p-3">
                    {new Date(job.valid_through).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-3">
                    <button onClick={() => deleteJob(job.id)} className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-600 transition duration-300 ease-in-out cursor-pointer">Delete</button>
                    <button onClick={() => duplicateJob(job)} className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600 transition duration-300 ease-in-out cursor-pointer">Duplicate</button>
                    <button onClick={() => editJob(job)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}