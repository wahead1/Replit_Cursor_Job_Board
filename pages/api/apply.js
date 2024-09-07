import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing form data' });
    }

    const { name, email, linkedin, jobId } = fields;
    const resumeFile = files.resume;

    const supabase = createPagesServerClient({ req, res });

    try {
      // Upload resume to Supabase Storage
      let resumeUrl = null;
      if (resumeFile) {
        const fileContent = await fs.promises.readFile(resumeFile.filepath);
        const { data, error } = await supabase.storage
          .from('resumes')
          .upload(`${jobId}/${resumeFile.originalFilename}`, fileContent);

        if (error) throw error;
        resumeUrl = data.path;
      }

      // Insert application into database
      const { data, error } = await supabase
        .from('applications')
        .insert([
          {
            job_id: jobId,
            name,
            email,
            linkedin,
            resume_url: resumeUrl,
          },
        ]);

      if (error) throw error;

      res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error) {
      console.error('Error submitting application:', error);
      res.status(500).json({ message: 'Error submitting application' });
    }
  });
}