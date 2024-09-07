import { supabase } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { jobId, applicantName, email, resumeUrl } = req.body

    const { data, error } = await supabase
      .from('resumes')
      .insert([
        { 
          job_id: jobId,
          applicant_name: applicantName,
          email,
          resume_url: resumeUrl
        }
      ])

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(201).json(data)
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}