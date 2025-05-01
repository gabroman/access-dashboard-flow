'use client';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, getUserFromToken } from '@/lib/auth';

export default function HomePage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = getToken();
    
    // If logged in, redirect to role-specific dashboard
    if (token) {
      const user = getUserFromToken(token);
      if (user) {
        navigate(`/dashboard/${user.role}`);
        return;
      }
    }
    
    // Otherwise redirect to login
    navigate('/login');
  }, [navigate]);
  
  return <div>Redirecting...</div>;
}
