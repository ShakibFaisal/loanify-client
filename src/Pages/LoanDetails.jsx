import React, { useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthContext';
import Loader from '../Components/Loader/Loader';

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext); // get logged-in user

  const { data: loan = null, isLoading, isError, error } = useQuery({
    queryKey: ['loan', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`loans/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader></Loader>;
  if (isError) return <p className="text-center mt-10 text-red-600">Error: {error.message}</p>;

  // Determine if Apply Now button should be enabled
  const canApply = user && user.role !== 'Admin' && user.role !== 'Manager';

  const handleApply = () => {
    if (!user) {
      navigate('/login'); // redirect unauthenticated users to login
    } else {
      navigate(`/loan-application/${id}`); // redirect to Loan Application Form
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={loan.loanImage} alt={loan.loanTitle} className="w-full max-h-96 object-cover rounded-lg mb-6" />
      <h1 className="text-3xl font-bold mb-4">{loan.loanTitle}</h1>
      <p className="mb-2"><strong>Description:</strong> {loan.description}</p>
      <p className="mb-2"><strong>Category:</strong> {loan.category}</p>
      <p className="mb-2"><strong>Interest Rate:</strong> {loan.interestRate}</p>
      <p className="mb-2"><strong>Max Limit:</strong> ${loan.maxLimit}</p>
      <p className="mb-2"><strong>Available EMI Plans:</strong> {loan.availableEMIPlan} months</p>
      <p className="mb-2"><strong>Required Documents:</strong> {loan.requiredDocuments.join(', ')}</p>

      {loan.applyNow && (
        <button
          onClick={handleApply}
          disabled={!canApply}
          className={`mt-6 px-6 py-3 rounded-lg text-white font-semibold transition ${
            canApply ? 'bg-primary hover:opacity-90' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Apply Now
        </button>
      )}
    </div>
  );
};

export default LoanDetails;
