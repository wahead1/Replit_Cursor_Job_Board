import { Resend } from 'resend';
import { EmailTemplate } from '../../components/EmailTemplate';
import formidable from 'formidable';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    const { name, email, linkedin, jobId, jobTitle, companyName } = fields;
    const resumeFile = files.resume;

    // Additional server-side validations
    if (!name || !email || !jobId || !jobTitle || !companyName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      let resumeContent = null;
      let resumeFilename = null;
      if (resumeFile && resumeFile[0]) {
        resumeContent = await fs.readFile(resumeFile[0].filepath);
        resumeFilename = resumeFile[0].originalFilename;
      }

      const { data, error } = await resend.emails.send({
        from: 'Foster City Jobs <onboarding@resend.dev>', // Changed this line
        to: ['will@nocodejobs.org'],
        subject: `New Application: ${jobTitle} at ${companyName}`,
        react: EmailTemplate({ name, email, linkedin, jobTitle, companyName }),
        attachments: resumeContent ? [
          {
            filename: resumeFilename,
            content: resumeContent,
          },
        ] : [],
      });

      if (error) {
        console.error('Error sending email:', error);
        return res.status(400).json({ error: 'Failed to send application email' });
      }

      res.status(200).json({ message: 'Application submitted successfully', data });
    } catch (error) {
      console.error('Error submitting application:', error);
      res.status(500).json({ error: 'Error submitting application' });
    }
  });
}