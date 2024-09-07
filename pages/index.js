import { useState, useEffect, useCallback } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import JobBoard from '../components/JobBoard'
import Footer from '../components/Footer'

export default function Home() {
  const [jobs, setJobs] = useState([])
  const supabase = useSupabaseClient()

  const fetchJobs = useCallback(async () => {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
    if (error) {
      console.error('Error fetching jobs:', error)
    } else {
      setJobs(data)
    }
  }, [supabase])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  return (
    <>
      <Header />
      <Hero />
      <div className="pt-4 pb-8">
        <JobBoard jobs={jobs} />
      </div>
      <Footer />
    </>
  )
}