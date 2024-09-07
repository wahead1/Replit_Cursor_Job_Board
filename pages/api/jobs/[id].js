import { supabase } from '../../../lib/supabase'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'PUT') {
    return updateJob(req, res, id)
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}

async function updateJob(req, res, id) {
  try {
    const { 
      title, company, description, jobId, employmentType, 
      companyWebsite, companyLogo, salaryCurrency, salaryAmount, 
      salaryUnit, streetAddress, city, state, postalCode, country 
    } = req.body

    console.log('Updating job data:', req.body)

    const slug = `${title.toLowerCase().replace(/\s+/g, '-')}-${jobId}`.replace(/[^a-z0-9-]/g, '')

    // Fetch the current job to get its created_at date
    const { data: currentJob, error: fetchError } = await supabase
      .from('jobs')
      .select('created_at')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Error fetching current job:', fetchError)
      return res.status(500).json({ error: fetchError.message })
    }

    const createdAt = new Date(currentJob.created_at)
    const validThrough = new Date(createdAt.getTime() + 60 * 24 * 60 * 60 * 1000) // 60 days from created_at

    const { data, error } = await supabase
      .from('jobs')
      .update({ 
        title, 
        company, 
        description, 
        job_id: jobId, 
        employment_type: employmentType, 
        company_website: companyWebsite, 
        company_logo: companyLogo, 
        salary_currency: salaryCurrency, 
        salary_amount: salaryAmount, 
        salary_unit: salaryUnit, 
        street_address: streetAddress,
        city,
        state,
        postal_code: postalCode,
        country,
        slug,
        valid_through: validThrough
      })
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error updating job:', error)
      return res.status(500).json({ error: error.message })
    }

    console.log('Job updated successfully:', data)
    return res.status(200).json(data)
  } catch (error) {
    console.error('Unexpected error in updateJob:', error)
    return res.status(500).json({ error: 'An unexpected error occurred', details: error.toString() })
  }
}