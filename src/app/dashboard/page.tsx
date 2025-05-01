
import { redirect } from 'next/navigation';
import { getToken, getUserFromToken } from '@/lib/auth';

export default function DashboardPage() {
  // This is a fallback page - the middleware should have redirected already
  // But we'll add this as an extra safety measure
  
  const token = getToken();
  if (!token) {
    redirect('/login');
  }
  
  const user = getUserFromToken(token);
  if (!user) {
    redirect('/login');
  }
  
  redirect(`/dashboard/${user.role}`);
}
