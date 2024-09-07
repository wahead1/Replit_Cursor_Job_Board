import { supabase } from '../../../lib/supabase'

async function ensureJobsTableSchema() {
  const { data, error } = await supabase.rpc('ensure_jobs_table_schema', {
    new_columns: [
      { name: 'employment_type', type: 'text' },
      { name: 'company_website', type: 'text' },
      { name: 'company_logo', type: 'text' },
      { name: 'salary_currency', type: 'text' },
      { name: 'salary_amount', type: 'numeric' },
      { name: 'salary_unit', type: 'text' },
      { name: 'street_address', type: 'text' },
      { name: 'city', type: 'text' },
      { name: 'state', type: 'text' },
      { name: 'postal_code', type: 'text' },
      { name: 'country', type: 'text' },
      { name: 'slug', type: 'text' },
      { name: 'valid_through', type: 'timestamp with time zone' }
    ]
  })

  if (error) {
    console.error('Error ensuring jobs table schema:', error)
    return error
  }
  return null
}

export default async function handler(req, res) {
  const schemaError = await ensureJobsTableSchema()
  if (schemaError) {
    return res.status(500).json({ error: 'Error ensuring table schema: ' + schemaError.message })
  }

  switch (req.method) {
    case 'GET':
      return getJobs(req, res)
    case 'POST':
      return createJob(req, res)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

async function getJobs(req, res) {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
  
  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json(data)
}

async function createJob(req, res) {
  try {
    const { 
      title, company, description, jobId, employmentType, 
      companyWebsite, companyLogo, salaryCurrency, salaryAmount, 
      salaryUnit, streetAddress, city, state, postalCode, country 
    } = req.body

    console.log('Received job data:', req.body)

    const slug = `${title.toLowerCase().replace(/\s+/g, '-')}-${jobId}`.replace(/[^a-z0-9-]/g, '')
    const createdAt = new Date()
    const validThrough = new Date(createdAt.getTime() + 60 * 24 * 60 * 60 * 1000) // 60 days from now

    const { data, error } = await supabase
      .from('jobs')
      .insert([
        { 
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
          created_at: createdAt,
          valid_through: validThrough
        }
      ])
      .select()

    if (error) {
      console.error('Error inserting job:', error)
      console.error('Error details:', error.details)
      console.error('Error hint:', error.hint)
      return res.status(500).json({ error: error.message, details: error.details, hint: error.hint })
    }

    console.log('Job inserted successfully:', data)
    return res.status(201).json(data)
  } catch (error) {
    console.error('Unexpected error in createJob:', error)
    return res.status(500).json({ error: 'An unexpected error occurred', details: error.toString() })
  }
}