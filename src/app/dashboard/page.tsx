
'use client';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, getUserFromToken } from '@/lib/auth';

export default function DashboardPage() {
  // This is a fallback page - we'll redirect to the appropriate role dashboard
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login');
      return;
    }
    
    const user = getUserFromToken(token);
    if (!user) {
      navigate('/login');
      return;
    }
    
    navigate(`/dashboard/${user.role}`);
  }, [navigate]);
  
  return <div>Redirecting...</div>;
}
