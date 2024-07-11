// src/pages/UserWork.jsx

import React from 'react';

const MyWork = ({ companyId }) => {
  // Fetch and display the user's work related to their companyId
  return (
    <div>
      <h1 className="text-2xl font-bold">My Work</h1>
      <p>Display the user's work here for company: {companyId}</p>
    </div>
  );
};

export default MyWork;
