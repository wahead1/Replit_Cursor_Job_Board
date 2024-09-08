import React from 'react';

export const EmailTemplate = ({ name, email, linkedin, jobTitle, companyName }) => (
  <div>
    <h1>New Job Application</h1>
    <p>A new application has been submitted for the {jobTitle} position at {companyName}.</p>
    <h2>Applicant Details:</h2>
    <ul>
      <li>Name: {name}</li>
      <li>Email: {email}</li>
      <li>LinkedIn: {linkedin}</li>
    </ul>
  </div>
);