
'use client';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleGoBack = () => {
    if (user) {
      navigate(`/dashboard/${user.role}`);
    } else {
      navigate('/login');
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 text-center bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-900">Unauthorized Access</h1>
        <div className="w-24 h-24 mx-auto mt-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m10-6H4a2 2 0 00-2 2v4a2 2 0 002 2h16a2 2 0 002-2v-4a2 2 0 00-2-2z" />
          </svg>
        </div>
        <p className="mt-6 text-lg text-gray-600">
          You don't have permission to access this page.
        </p>
        <button
          onClick={handleGoBack}
          className="mt-6 px-4 py-2 text-white bg-medical-600 rounded hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:ring-offset-2"
        >
          Go back to dashboard
        </button>
      </div>
    </div>
  );
}
