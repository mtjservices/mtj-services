import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { logoutAction } from '@/app/actions/logout';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/auth/login');
  
  const { user } = session;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'hsl(145, 45%, 32%)', color: 'white' }}>
      <header style={{
        backgroundColor: 'hsla(145, 45%, 32%, 0.98)',
        borderBottom: '1px solid hsl(145, 25%, 45%)',
        position: 'sticky', top: 0, zIndex: 40
      }}>
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2" style={{ textDecoration: 'none', color: 'white' }}>
              <div style={{
                width: '2rem', height: '2rem', borderRadius: '0.375rem',
                backgroundColor: 'hsl(65, 85%, 55%)', color: 'hsl(150, 40%, 15%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.875rem'
              }}>M</div>
              <span className="hidden sm:inline-block">MTJ Services</span>
            </Link>
            <span style={{
              fontSize: '0.75rem', fontWeight: 600,
              backgroundColor: 'hsl(145, 35%, 28%)',
              border: '1px solid hsl(145, 25%, 45%)',
              color: 'hsl(65, 85%, 55%)',
              padding: '0.25rem 0.75rem', borderRadius: '9999px'
            }}>
              {user.role === 'CLIENT' ? 'Espace Client' : user.role === 'WORKER' ? 'Espace Associé' : 'Administration'}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium hidden md:inline-block" style={{ color: 'hsl(140, 20%, 85%)' }}>{user.email}</span>
            <form action={logoutAction}>
              <button type="submit" className="text-sm font-semibold transition-colors" style={{ color: 'hsl(140, 20%, 85%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8 fade-in">
        {children}
      </main>
    </div>
  );
}