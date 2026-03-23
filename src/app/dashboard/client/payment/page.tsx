'use client';

import { useActionState, Suspense } from 'react';
import { acceptJobAction } from '@/app/actions/jobs';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary w-full mt-6 text-lg py-3 shadow-md" disabled={pending}>
      {pending ? 'Traitement en cours...' : 'Confirmer et accepter le contrat'}
    </button>
  );
}

function PaymentForm() {
  const params = useSearchParams();
  const id = params.get('id');
  const [state, formAction] = useActionState(acceptJobAction, { error: '' });

  if (!id) return <div className="p-4 bg-red-50 text-red-600 rounded">Paramètre de commande manquant.</div>;

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="jobId" value={id} />
      
      {state?.error && (
        <div className="bg-red-50 text-red-600 p-4 border border-red-200 rounded-md mb-6 font-medium">
          {state.error}
        </div>
      )}

      <div className="space-y-4">
        <label className="block text-base font-bold text-foreground">Mode de paiement préféré</label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="relative flex items-start p-5 border border-primary-200 bg-primary-50 rounded-xl hover:border-primary-500 cursor-pointer shadow-sm transition-all has-[:checked]:ring-2 has-[:checked]:ring-primary-500">
            <input type="radio" name="paymentMethod" value="ONLINE" defaultChecked className="mt-1 w-5 h-5 text-primary-600 focus:ring-primary-500" />
            <div className="ml-4 w-full">
              <span className="block text-base font-bold text-foreground">Paiement en ligne</span>
              <span className="block text-sm text-text-muted mt-1 leading-relaxed">Payez par carte de crédit via notre portail sécurisé une fois les travaux terminés. (Recommandé)</span>
            </div>
          </label>
          
          <label className="relative flex items-start p-5 border border-border bg-surface rounded-xl hover:border-primary-500 cursor-pointer shadow-sm transition-all has-[:checked]:ring-2 has-[:checked]:ring-primary-500">
            <input type="radio" name="paymentMethod" value="CASH" className="mt-1 w-5 h-5 text-primary-600 focus:ring-primary-500" />
            <div className="ml-4 w-full">
              <span className="block text-base font-bold text-foreground">Argent comptant</span>
              <span className="block text-sm text-text-muted mt-1 leading-relaxed">Payez l'associé directement en argent comptant sur place à la fin des travaux.</span>
            </div>
          </label>
        </div>
      </div>

      <div className="pt-6 mt-8 border-t border-border">
        <div className="text-sm font-medium text-amber-800 bg-amber-50 p-5 rounded-xl border border-amber-200 flex items-start gap-4 shadow-inner">
          <span className="text-2xl mt-0.5">⚠️</span>
          <span>En cliquant sur accepter, vous vous engagez à payer le montant de l'estimation après l'exécution de la tâche par un Associé MTJ Services. Les annulations de dernière minute peuvent être soumises à des frais.</span>
        </div>
        <SubmitButton />
      </div>
    </form>
  )
}

export default function PaymentPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 fade-in">
        <Link href="/dashboard/client" className="inline-flex items-center text-primary-600 hover:text-primary-800 text-sm font-semibold transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Retour à mes demandes
        </Link>
      </div>

      <div className="glass-panel p-6 md:p-10 rounded-2xl shadow-xl border border-border fade-in fade-in-delay-1 relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -z-10 opacity-70"></div>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">Accepter le contrat</h1>
        <p className="text-text-muted mb-10 text-lg">Choisissez votre mode de paiement pour valider et envoyer le contrat au marché de nos Associés.</p>

        <Suspense fallback={<div className="p-12 text-center text-text-muted animate-pulse">Chargement de l'interface de paiement sécurisée...</div>}>
          <PaymentForm />
        </Suspense>
      </div>
    </div>
  );
}
