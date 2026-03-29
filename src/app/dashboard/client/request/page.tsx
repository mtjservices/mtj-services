'use client';

import { useActionState } from 'react';
import { createJobAction } from '@/app/actions/jobs';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary w-full md:w-auto mt-6" disabled={pending}>
      {pending ? 'Soumission...' : 'Soumettre la demande'}
    </button>
  );
}

export default function RequestServicePage() {
  const [state, formAction] = useActionState(createJobAction, { error: '' });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 fade-in">
        <Link href="/dashboard/client" className="inline-flex items-center text-primary-600 hover:text-primary-800 text-sm font-semibold transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Retour à mes demandes
        </Link>
      </div>

      <div className="glass-panel p-8 rounded-xl shadow-lg border border-border fade-in fade-in-delay-1 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-bl-full -z-10 opacity-50"></div>

        <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Nouvelle demande</h1>
        <p className="text-text-muted mb-8 text-lg">Un administrateur évaluera votre demande et proposera un prix estimatif compétitif.</p>

        {state?.error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-md mb-8 text-sm font-medium">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-foreground">Type de service</label>
            <select name="serviceType" required className="w-full p-3 border border-border rounded-lg bg-surface focus:ring-2 focus:ring-primary-500 transition-shadow text-black">
              <option value="">Sélectionnez un service</option>
              <option value="Tonte de pelouse">Tonte de pelouse</option>
              <option value="Déneigement">Déneigement</option>
              <option value="Nettoyage de gouttières">Nettoyage de gouttières</option>
              <option value="Ramassage de feuilles">Ramassage de feuilles</option>
              <option value="Travaux manuels généraux">Travaux manuels généraux</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-foreground">Fréquence souhaitée</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {[
                { label: 'Ponctuel', id: 'freq-1' },
                { label: 'Aux 2 semaines', id: 'freq-2' },
                { label: 'Mensuel', id: 'freq-3' },
                { label: 'Saisonnier', id: 'freq-4' },
              ].map(f => (
                <div key={f.id} className="relative flex items-center p-3 border border-border rounded-lg hover:bg-surface cursor-pointer focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition-colors">
                  <input type="radio" name="frequency" id={f.id} value={f.label} required className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500" />
                  <label htmlFor={f.id} className="ml-3 block text-sm font-medium text-black cursor-pointer w-full">
                    {f.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-foreground">Description détaillée</label>
            <p className="text-xs text-text-muted mb-2">Précisez la taille de votre terrain, particularités des travaux (clôtures, accès difficile), ou tout autre détail pertinent pour accélérer l'estimation.</p>
            <textarea 
              name="description" 
              required 
              rows={5}
              placeholder="Ex: Terrain de coin, environ 5000 pi2..."
              className="w-full p-3 border border-border rounded-lg bg-surface focus:ring-2 focus:ring-primary-500 transition-shadow resize-y text-black placeholder:text-gray-400"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between">
            <p className="text-xs text-text-muted max-w-[60%]">
              Aucun paiement n'est requis à cette étape. Vous paierez une fois le prix estimé accepté.
            </p>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}