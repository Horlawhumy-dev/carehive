import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: 'client' | 'pro';
  redirectIfAuthenticated?: boolean;
}

const ProtectedRoute = ({ children, allowedRole, redirectIfAuthenticated }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If we should redirect authenticated users (e.g. from /login or /signup)
  if (session && redirectIfAuthenticated) {
    const role = session.user?.user_metadata?.role;
    const dest = role === 'pro' ? '/worker-dashboard' : '/household';
    return <Navigate to={dest} replace />;
  }

  // If not logged in and accessing a protected page
  if (!session && !redirectIfAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based check
  if (allowedRole && session?.user?.user_metadata?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
