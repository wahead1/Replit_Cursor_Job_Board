import { useState, useEffect, useCallback } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import JobBoard from '../components/JobBoard'
import Footer from '../components/Footer'

export default function Home() {
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = useSupabaseClient()

  const fetchJobs = useCallback(async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
    if (error) {
      console.error('Error fetching jobs:', error)
    } else {
      setJobs(data)
    }
    setIsLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  return (
    <>
      <Head>
        <title>Foster City Jobs | Find Your Next Career Opportunity</title>
        <meta name="description" content="Discover exciting job opportunities in Foster City and surrounding areas. Connect with top employers and take the next step in your career journey." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fostercityjobs.com/" />
        <meta property="og:title" content="Foster City Jobs | Find Your Next Career Opportunity" />
        <meta property="og:description" content="Discover exciting job opportunities in Foster City and surrounding areas. Connect with top employers and take the next step in your career journey." />
        <meta property="og:image" content="https://www.fostercityjobs.com/og-image.jpeg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://fostercityjobs.com/" />
        <meta property="twitter:title" content="Foster City Jobs | Find Your Next Career Opportunity" />
        <meta property="twitter:description" content="Discover exciting job opportunities in Foster City and surrounding areas. Connect with top employers and take the next step in your career journey." />
        <meta property="twitter:image" content="https://www.fostercityjobs.com/og-image.jpeg" />
      </Head>
      <Header />
      <Hero />
      <div className="pt-4 pb-8">
        <JobBoard jobs={jobs} isLoading={isLoading} />
      </div>
      <Footer />
    </>
  )
}