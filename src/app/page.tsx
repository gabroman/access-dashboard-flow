import { redirect } from 'next/navigation';
import { getToken, getUserFromToken } from '@/lib/auth';

export default function HomePage() {
  const token = getToken();
  
  // If logged in, redirect to role-specific dashboard
  if (token) {
    const user = getUserFromToken(token);
    if (user) {
      redirect(`/dashboard/${user.role}`);
    }
  }
  
  // Otherwise redirect to login
  redirect('/login');
}
