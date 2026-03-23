import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function ClientDashboardPage() {
  const session = await getSession();
  const userId = session?.user?.id;

  const jobs = await prisma.jobRequest.findMany({
    where: { clientId: userId },
    orderBy: { createdAt: 'desc' },
    include: { worker: true }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold">Mes Demandes</h1>
           <p className="text-text-muted mt-1">Gérez vos services d'entretien</p>
        </div>
        <Link href="/dashboard/client/request" className="btn btn-primary self-start sm:self-auto">
          + Nouvelle demande
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-xl border border-dashed border-border shadow-sm">
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 text-3xl">🌱</div>
          <h2 className="text-xl font-bold mb-2">Aucune demande pour le moment</h2>
          <p className="text-text-muted mb-8 max-w-md mx-auto">Commencez par créer votre première demande de service pour l'entretien de votre propriété. Nos administrateurs l'évalueront rapidement.</p>
          <Link href="/dashboard/client/request" className="btn btn-primary shadow-md">Faire ma première demande</Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map(job => (
            <div key={job.id} className="glass-panel p-6 rounded-xl hover:shadow-md transition-shadow relative overflow-hidden">
               {/* Accent line depending on status */}
               <div className={`absolute top-0 left-0 w-full h-1 ${
                 job.status === 'PENDING_ESTIMATE' ? 'bg-amber-400' :
                 job.status === 'ESTIMATED' ? 'bg-blue-400' :
                 job.status === 'ACCEPTED' ? 'bg-indigo-400' : 'bg-green-500'
               }`}></div>
              
              <div className="flex justify-between items-start mb-4 mt-2">
                 <h3 className="font-bold text-lg leading-tight pr-2">{job.serviceType}</h3>
                 <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                   job.status === 'PENDING_ESTIMATE' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                   job.status === 'ESTIMATED' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                   job.status === 'ACCEPTED' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' :
                   'bg-green-100 text-green-800 border border-green-200'
                 }`}>
                   {job.status === 'PENDING_ESTIMATE' ? 'En attente' : 
                    job.status === 'ESTIMATED' ? 'Prix estimé' : 
                    job.status === 'ACCEPTED' ? 'En cours' : 'Terminé'}
                 </span>
              </div>
              <p className="text-sm text-text-muted mb-5 line-clamp-3 min-h-[60px]">{job.description}</p>
              
              <div className="space-y-3 text-sm bg-background p-4 rounded-lg border border-border">
                <div className="flex justify-between items-center">
                  <span className="text-text-muted font-medium">Fréquence:</span>
                  <span className="font-bold text-foreground">{job.frequency}</span>
                </div>
                {job.estimatedPrice && (
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted font-medium">Prix estimatif:</span>
                    <span className="font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded">{job.estimatedPrice} $</span>
                  </div>
                )}
                {job.worker && (
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted font-medium">Associé Assigné:</span>
                    <span className="font-bold text-foreground">{job.worker.email}</span>
                  </div>
                )}
              </div>
              
              {/* Actions based on status */}
              {job.status === 'ESTIMATED' && (
                <div className="mt-5">
                  <Link href={`/dashboard/client/payment?id=${job.id}`} className="btn btn-primary w-full text-sm">
                    Accepter & Payer
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
