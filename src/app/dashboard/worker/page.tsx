import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { takeJobAction, completeJobAction } from '@/app/actions/jobs';

export default async function WorkerDashboardPage() {
  const session = await getSession();
  const userId = session?.user?.id;

  const profile = await prisma.workerProfile.findUnique({
    where: { userId },
    include: { user: true }
  });

  if (!profile) return <div className="p-8 text-center text-red-600 font-bold">Profil Associé introuvable.</div>;

  if (profile.status === 'PENDING') {
    return (
      <div className="max-w-xl mx-auto glass-panel p-10 text-center rounded-2xl shadow-xl border border-border mt-10">
        <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl shadow-sm border border-amber-100">⏳</div>
        <h1 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight">Profil en attente d'approbation</h1>
        <p className="text-text-muted mb-8 text-lg leading-relaxed">
          Merci pour ton inscription à MTJ Services ! Un administrateur va réviser ta candidature avant que tu puisses accéder au marché des contrats.
        </p>
        <div className="bg-surface p-5 rounded-xl border border-border inline-block shadow-inner">
           <p className="text-sm font-semibold text-foreground">Surveille tes courriels, nous te contacterons bientôt !</p>
        </div>
      </div>
    );
  }

  // Fetch available jobs (ACCEPTED by client, but no worker assigned)
  const availableJobs = await prisma.jobRequest.findMany({
    where: { status: 'ACCEPTED', workerId: null },
    orderBy: { updatedAt: 'desc' },
    include: { client: true }
  });

  // Fetch my active/completed jobs
  const myJobs = await prisma.jobRequest.findMany({
    where: { workerId: userId },
    orderBy: { updatedAt: 'desc' },
    include: { client: true }
  });

  const activeJobs = myJobs.filter(j => j.status === 'ACCEPTED');

  const getPayoutCut = (lvl: number) => 0.60 + (lvl - 1) * 0.05;
  const payoutRate = getPayoutCut(profile.level);

  return (
    <div className="space-y-8 fade-in">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Col: Overview & Feed */}
        <div className="flex-1 space-y-8 min-w-0">
           <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Salut {profile.user.email.split('@')[0]}! 👋</h1>
           
           {/* Active Jobs Section */}
           {activeJobs.length > 0 && (
             <div className="bg-gradient-to-br from-primary-50 to-white border border-primary-200 rounded-2xl p-6 shadow-md relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-bl-full opacity-60 pointer-events-none"></div>
               <h2 className="font-bold text-xl text-primary-900 mb-5 flex items-center gap-2 relative z-10">
                 <span>🚀</span> Tes contrats en cours ({activeJobs.length})
               </h2>
               <div className="space-y-4 relative z-10">
                 {activeJobs.map(job => (
                   <div key={job.id} className="bg-white p-5 rounded-xl shadow-sm border border-border flex flex-col sm:flex-row justify-between sm:items-center gap-5 transition-shadow hover:shadow-md">
                     <div>
                       <div className="flex items-center gap-3 mb-1">
                          <p className="font-extrabold items-center text-foreground text-lg tracking-tight">{job.serviceType}</p>
                          <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-700 rounded border border-gray-200">{job.paymentMethod === 'ONLINE' ? 'Payé en ligne' : 'Paiement Comptant'}</span>
                       </div>
                       <p className="text-sm text-text-muted">{job.description}</p>
                       <div className="mt-3 flex items-center gap-2">
                          <span className="bg-primary-100 text-primary-800 text-xs font-bold px-2.5 py-1 rounded-full border border-primary-200">
                            Revenu: {(job.estimatedPrice! * payoutRate).toFixed(2)}$
                          </span>
                          <span className="text-xs font-medium text-text-muted">Total: {job.estimatedPrice}$</span>
                       </div>
                     </div>
                     <form action={completeJobAction as any} className="shrink-0">
                       <input type="hidden" name="jobId" value={job.id} />
                       <button type="submit" className="btn btn-primary text-sm whitespace-nowrap shadow-sm">Terminer le travail</button>
                     </form>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* Market Feed */}
           <div>
             <h2 className="text-2xl font-extrabold mb-5 flex items-center gap-2 tracking-tight">Marketplace 📋</h2>
             {availableJobs.length === 0 ? (
               <div className="glass-panel p-10 text-center rounded-2xl border border-dashed border-border shadow-sm">
                 <div className="text-4xl mb-3 opacity-50">⛱️</div>
                 <p className="text-text-muted font-medium text-lg">Aucun contrat disponible pour le moment.</p>
                 <p className="text-sm text-text-muted mt-2">Reviens un peu plus tard pour voir les nouvelles demandes des clients.</p>
               </div>
             ) : (
               <div className="grid gap-5">
                 {availableJobs.map(job => (
                   <div key={job.id} className="glass-panel p-6 rounded-2xl hover:shadow-lg transition-all border border-border relative group">
                     <div className="absolute inset-y-0 left-0 w-1.5 bg-accent rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="flex justify-between items-start mb-3">
                       <h3 className="font-extrabold text-xl tracking-tight pr-4">{job.serviceType}</h3>
                       <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full shrink-0 border border-green-200">{job.frequency}</span>
                     </div>
                     <p className="text-sm text-text-muted mb-5 leading-relaxed bg-surface p-3 rounded-lg border border-border">{job.description}</p>
                     
                     <div className="flex justify-between items-end pt-5 border-t border-border">
                       <div>
                         <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-1">Gains Potentiels</p>
                         <p className="text-3xl font-black text-primary-600">{(job.estimatedPrice! * payoutRate).toFixed(2)} <span className="text-lg text-primary-500 font-semibold">$</span></p>
                         <p className="text-xs text-text-muted mt-1 font-medium">Prix client: {job.estimatedPrice} $ ({job.paymentMethod === 'ONLINE' ? 'Via Plateforme' : 'Comptant'})</p>
                       </div>
                       <form action={takeJobAction as any}>
                         <input type="hidden" name="jobId" value={job.id} />
                         <button type="submit" className="btn btn-primary px-6 shadow-md transition-transform hover:scale-105 hover:-translate-y-1">Accepter</button>
                       </form>
                     </div>
                   </div>
                 ))}
               </div>
             )}
           </div>
        </div>

        {/* Right Col: Stats Panel */}
        <div className="lg:w-80 shrink-0 space-y-6">
           <div className="glass-panel p-8 rounded-3xl border border-border shadow-2xl relative overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-slate-900/80">
             {/* Decor */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-accent to-primary-400 rounded-full blur-2xl opacity-20 pointer-events-none"></div>
             
             <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-muted mb-8 text-center">Gamer Tag</h3>
             
             <div className="text-center mb-8">
               <div className="inline-block relative">
                 <div className="w-28 h-28 bg-gradient-to-br from-surface to-background rounded-full border-[6px] border-primary-500 flex items-center justify-center mx-auto shadow-xl relative z-10 transition-transform hover:rotate-3 hover:scale-105 duration-300">
                   <span className="text-4xl font-black text-primary-600 bg-clip-text text-transparent bg-gradient-to-br from-primary-600 to-primary-400">N{profile.level}</span>
                 </div>
                 {profile.level === 5 && (
                   <div className="absolute -top-4 -right-4 text-4xl animate-bounce drop-shadow-md z-20" title="Niveau Max!">👑</div>
                 )}
               </div>
               <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-text-muted">Part des gains</p>
               <p className="text-2xl font-black text-foreground">{(payoutRate * 100).toFixed(0)}% <span className="text-xs font-bold text-primary-600 align-top">+Bonus</span></p>
             </div>

             <div className="space-y-5">
               <div className="p-4 bg-gradient-to-br from-white to-surface dark:from-slate-800 dark:to-slate-900 rounded-xl border border-border shadow-sm flex flex-col items-center justify-center transition-transform hover:scale-105">
                 <span className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Cagnotte Totale</span>
                 <span className="text-3xl font-black text-green-600">{profile.totalEarnings.toFixed(2)}$</span>
               </div>

               <div className="pt-2">
                 <div className="flex justify-between items-end mb-2">
                   <span className="text-sm font-bold text-foreground">Expérience</span>
                   <span className="text-sm font-black text-primary-600">
                     {profile.completedJobs} <span className="text-text-muted font-semibold text-xs">/ {profile.level * 5} Contrats</span>
                   </span>
                 </div>
                 <div className="w-full bg-border rounded-full h-3 border border-border/50 relative overflow-hidden shadow-inner">
                   <div className="absolute top-0 left-0 bg-gradient-to-r from-primary-400 to-primary-600 h-full rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${Math.min(100, (profile.completedJobs / (profile.level * 5)) * 100)}%` }}>
                       {/* Shimmer effect */}
                       <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>     
                   </div>
                 </div>
                 {profile.level < 5 && (
                    <p className="text-xs text-text-muted font-medium mt-2 text-center">Encore {profile.level * 5 - profile.completedJobs} contrats pour le N{profile.level + 1} !</p>
                 )}
               </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
