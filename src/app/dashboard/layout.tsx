import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { logoutAction } from '@/app/actions/logout';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/auth/login');
  
  const { user } = session;

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="bg-background border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
             <Link href="/" className="font-bold text-xl tracking-tight text-primary-700 flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-primary-600 text-white flex items-center justify-center font-bold text-sm">M</div>
                <span className="hidden sm:inline-block">MTJ Services</span>
             </Link>
             <span className="text-xs sm:text-sm font-medium bg-primary-50 border border-primary-200 text-primary-800 px-3 py-1 rounded-full">
               {user.role === 'CLIENT' ? 'Espace Client' : user.role === 'WORKER' ? 'Espace Associé' : 'Administration'}
             </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-text-muted hidden md:inline-block">{user.email}</span>
            <form action={logoutAction}>
              <button type="submit" className="text-sm font-semibold text-text-muted hover:text-red-600 transition-colors">Déconnexion</button>
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
