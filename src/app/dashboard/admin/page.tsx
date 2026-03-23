import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { approveWorkerAction, estimateJobAction } from '@/app/actions/admin';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (session?.user?.role !== 'ADMIN') return <div className="p-8 text-center text-red-600 font-bold">Non autorisé</div>;

  const pendingWorkers = await prisma.workerProfile.findMany({
    where: { status: 'PENDING' },
    include: { user: true },
    orderBy: { joinedAt: 'asc' }
  });

  const pendingJobs = await prisma.jobRequest.findMany({
    where: { status: 'PENDING_ESTIMATE' },
    include: { client: true },
    orderBy: { createdAt: 'asc' }
  });

  const allJobs = await prisma.jobRequest.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    include: { client: true, worker: true }
  });

  // Basic stats
  const totalCompleted = allJobs.filter(j => j.status === 'COMPLETED').length;
  const allWorkers = await prisma.workerProfile.findMany();
  const payoutTotal = allWorkers.reduce((acc, w) => acc + w.totalEarnings, 0);

  // Approximate MTJ Revenue: total value of completed jobs minus payouts
  const completedJobsList = await prisma.jobRequest.findMany({ where: { status: 'COMPLETED' } });
  const revenueTotal = completedJobsList.reduce((acc, j) => acc + (j.estimatedPrice || 0), 0) - payoutTotal;

  return (
    <div className="space-y-12 max-w-7xl mx-auto fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Panneau de Contrôle Central</h1>
          <p className="text-text-muted mt-2 text-lg">Gérez les flux d'approbation et surveillez l'activité.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-border shadow-sm flex items-center justify-between fade-in fade-in-delay-1">
          <div>
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Demandes en attente</p>
            <p className="text-4xl font-black text-amber-600 mt-2">{pendingJobs.length}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center text-xl">📄</div>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-border shadow-sm flex items-center justify-between fade-in fade-in-delay-2">
          <div>
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Candidatures</p>
            <p className="text-4xl font-black text-blue-600 mt-2">{pendingWorkers.length}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-xl">🧑‍🔧</div>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-border bg-gradient-to-br from-primary-50 to-white shadow-md flex items-center justify-between fade-in fade-in-delay-3 relative overflow-hidden text-primary-900 border-primary-200">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary-200 rounded-bl-full opacity-40"></div>
          <div className="relative z-10 w-full">
            <p className="text-xs font-black uppercase tracking-widest mb-1 opacity-80">Revenus Cumulés (MTJ)</p>
            <p className="text-4xl font-black mt-1">{(revenueTotal > 0 ? revenueTotal : 0).toFixed(2)}$</p>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-border shadow-sm flex items-center justify-between fade-in fade-in-delay-3">
          <div>
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Contrats Complétés</p>
            <p className="text-4xl font-black text-green-600 mt-2">{completedJobsList.length}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center text-xl">✅</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start fade-in fade-in-delay-3">
        {/* Colonne Gauche: Tâches administratives prioritaires */}
        <div className="space-y-16">
          
          {/* Estimations */}
          <section className="glass-panel p-8 rounded-3xl shadow-xl border border-border relative overflow-hidden">
             <div className="absolute top-0 right-0 w-max h-max bg-amber-50 text-amber-500 px-6 py-2 rounded-bl-3xl font-bold flex items-center gap-2 text-sm shadow-sm border-l border-b border-border">
               <span>Urgent</span> <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span></span>
             </div>
             
             <h2 className="text-2xl font-extrabold mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-100 ring-4 ring-amber-50 text-amber-600 flex items-center justify-center text-lg shadow-inner">💰</span>
              Estimations Requises
            </h2>

            {pendingJobs.length === 0 ? (
              <div className="text-center py-6 bg-surface rounded-xl border border-dashed border-border">
                <p className="text-text-muted italic">Aucune commande en attente d'estimation.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingJobs.map(job => (
                  <div key={job.id} className="p-5 bg-white rounded-2xl border border-border shadow-sm flex flex-col gap-4 transition-transform hover:-translate-y-1">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-extrabold text-xl">{job.serviceType}</p>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg">{job.frequency}</span>
                      </div>
                      <p className="text-sm mt-1 bg-surface p-3 rounded-lg border border-border">{job.description}</p>
                      <p className="text-xs text-text-muted mt-3 font-semibold">Client: <span className="text-foreground">{job.client.email}</span></p>
                    </div>

                    <form action={estimateJobAction as any} className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border mt-2">
                      <input type="hidden" name="jobId" value={job.id} />
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-text-muted">$</span>
                        <input 
                          type="number" 
                          step="0.01" 
                          min="1"
                          name="estimatedPrice"
                          placeholder="0.00"
                          required
                          className="w-full pl-8 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-surface font-semibold text-lg"
                        />
                      </div>
                      <button type="submit" className="btn bg-amber-500 hover:bg-amber-600 text-white shadow-md font-bold px-6">Envoyer l'Offre</button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Approbations */}
          <section className="glass-panel p-8 rounded-3xl shadow-lg border border-border">
            <h2 className="text-2xl font-extrabold mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-blue-100 ring-4 ring-blue-50 text-blue-600 flex items-center justify-center text-lg shadow-inner">🧑‍🔧</span>
              Validation des Associés
            </h2>
            
            {pendingWorkers.length === 0 ? (
              <div className="text-center py-6 bg-surface rounded-xl border border-dashed border-border">
                <p className="text-text-muted italic">Aucune candidature en attente.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingWorkers.map(worker => (
                  <div key={worker.id} className="p-5 bg-white rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex flex-col items-center justify-center font-bold text-sm border border-blue-100">
                        {worker.user.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-extrabold text-foreground">{worker.user.email}</p>
                        <p className="text-xs text-text-muted font-medium mt-1">Inscrit le {new Date(worker.joinedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <form action={approveWorkerAction as any} className="sm:ml-auto">
                      <input type="hidden" name="workerId" value={worker.userId} />
                      <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto shadow-md font-semibold">Accepter la candidature</button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Colonne Droite: Activité et Log */}
        <section className="glass-panel p-8 rounded-3xl shadow-lg border border-border h-full">
           <h2 className="text-2xl font-extrabold mb-8 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-primary-100 ring-4 ring-primary-50 text-primary-600 flex items-center justify-center text-lg shadow-inner">📈</span>
            Activité Récente
          </h2>

          <div className="space-y-4">
            {allJobs.length === 0 ? (
              <p className="text-text-muted text-center py-6">Aucune activité enregistrée.</p>
            ) : (
              allJobs.map(job => (
                <div key={job.id} className="relative pl-6 pb-6 border-l-2 border-border last:border-0 last:pb-0">
                  {/* Timeline dot */}
                  <div className={`absolute -left-2 top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                    job.status === 'COMPLETED' ? 'bg-green-500' :
                    job.status === 'ACCEPTED' ? 'bg-indigo-500' :
                    job.status === 'ESTIMATED' ? 'bg-blue-500' : 'bg-amber-500'
                  }`}></div>
                  
                  <div className="-mt-1.5 flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-foreground leading-tight">{job.serviceType}</p>
                      <span className="text-[10px] font-bold text-text-muted bg-surface px-2 py-0.5 rounded">{new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    <p className="text-sm text-text-muted flex items-center gap-1.5 mt-1 border-b border-border/50 pb-2">
                      <span className="font-medium">Client:</span> <span className="text-xs truncate">{job.client.email}</span>
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-2 items-center text-xs font-semibold">
                      <span className={`px-2 py-1 rounded-md ${
                        job.status === 'COMPLETED' ? 'bg-green-50 text-green-700' :
                        job.status === 'ACCEPTED' ? 'bg-indigo-50 text-indigo-700' :
                        job.status === 'ESTIMATED' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {job.status === 'PENDING_ESTIMATE' ? 'Attente d\'estimation' : 
                         job.status === 'ESTIMATED' ? 'Généré par Admin' : 
                         job.status === 'ACCEPTED' ? 'Accepté par Client' : 'Totalement Complété'}
                      </span>
                      
                      {job.estimatedPrice && <span className="bg-surface border border-border px-2 py-1 rounded-md text-foreground">{job.estimatedPrice}$</span>}
                      {job.worker && <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded-md border border-primary-100 flex items-center gap-1"><span>👷</span> {job.worker.email.split('@')[0]}</span>}
                      {job.status === 'COMPLETED' && job.paymentMethod && (
                        <span className="bg-surface px-2 py-1 rounded-md border border-border">💵 {job.paymentMethod}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
