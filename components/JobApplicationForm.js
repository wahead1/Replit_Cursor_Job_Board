import { useState } from 'react';

export default function JobApplicationForm({ jobId, jobTitle, companyName }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('linkedin', linkedin);
    formData.append('jobId', jobId);
    formData.append('jobTitle', jobTitle);
    formData.append('companyName', companyName);
    if (resume) {
      formData.append('resume', resume);
    }

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Application submission failed');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setLinkedin('');
      setResume(null);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClassName = "mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition duration-200 ease-in-out";

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold mb-2">Apply to {jobTitle} at {companyName}</h2>
      <p className="-mt-2 space-y-6">You never know unless you try. Why not?</p>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClassName}
          placeholder="Your full name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClassName}
          placeholder="Your email address"
        />
      </div>
      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
          LinkedIn Profile
        </label>
        <input
          type="url"
          id="linkedin"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          className={inputClassName}
          placeholder="Your LinkedIn profile URL"
        />
      </div>
      <div>
        <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
          Resume
        </label>
        <input
          type="file"
          id="resume"
          onChange={(e) => setResume(e.target.files[0])}
          className={inputClassName}
          accept=".pdf,.doc,.docx"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="items-center justify-center h-12 font-medium rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-black border-2 border-black duration-200 focus-visible:ring-black hover:bg-transparent hover:border-black hover:text-black lg:w-auto px-6 py-3 text-center text-white"
        >
          {submitting ? 'Submitting...' : 'Apply'}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-2">Application submitted successfully!</p>}
    </form>
  );
}