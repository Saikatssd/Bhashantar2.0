import React from 'react';
import { useParams } from 'react-router-dom';

const CompanyInstance = () => {
  const { id } = useParams();
  return <div>Company Instance for {id}</div>;
};

export default CompanyInstance;
