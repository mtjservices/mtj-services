'use client';
import { useActionState } from 'react';
import { registerWorkerAction } from '@/app/actions/auth';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';

const initialState = { error: '' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} style={{
      width: '100%', marginTop: '1rem', padding: '0.75rem',
      backgroundColor: 'hsl(65, 85%, 55%)', color: 'hsl(150, 40%, 15%)',
      fontWeight: 700, borderRadius: '0.75rem', border: 'none', cursor: 'pointer',
      fontSize: '1rem'
    }}>
      {pending ? 'Envoi de la candidature...' : 'Soumettre ma candidature'}
    </button>
  );
}

export default function RegisterWorkerPage() {
  const [state, formAction] = useActionState(registerWorkerAction, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pb-20 pt-10" style={{ backgroundColor: 'hsl(145, 45%, 32%)' }}>
      <div className="w-full max-w-md rounded-2xl shadow-2xl p-8" style={{
        backgroundColor: 'hsl(145, 35%, 28%)',
        border: '1px solid hsl(145, 25%, 45%)',
        borderTop: '4px solid hsl(65, 85%, 55%)'
      }}>
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center justify-center w-12 h-12 font-bold text-2xl rounded-lg mb-4" style={{
            backgroundColor: 'hsl(65, 85%, 55%)', color: 'hsl(150, 40%, 15%)', textDecoration: 'none'
          }}>M</Link>
          <h1 className="text-2xl font-bold" style={{ color: 'white' }}>Devenir Associé</h1>
          <p className="mt-2" style={{ color: 'hsl(140, 20%, 85%)' }}>Rejoins une équipe dynamique et gagne ton propre argent ! (14-18 ans)</p>
        </div>

        {state?.error && (
          <div className="p-3 rounded-md mb-4 text-sm font-medium" style={{ backgroundColor: 'hsl(0, 50%, 95%)', color: 'hsl(0, 70%, 40%)', border: '1px solid hsl(0, 50%, 80%)' }}>
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: 'white' }}>Prénom et Nom</label>
            <input
              name="fullname"
              type="text"
              required
              placeholder="Ex: Jean Dupont"
              style={{
                width: '100%', padding: '0.625rem', borderRadius: '0.375rem',
                border: '1px solid hsl(145, 25%, 45%)',
                backgroundColor: 'hsl(145, 40%, 38%)', color: 'white',
                outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: 'white' }}>Adresse courriel</label>
            <input
              name="email"
              type="email"
              required
              placeholder="jeandupont@email.com"
              style={{
                width: '100%', padding: '0.625rem', borderRadius: '0.375rem',
                border: '1px solid hsl(145, 25%, 45%)',
                backgroundColor: 'hsl(145, 40%, 38%)', color: 'white',
                outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: 'white' }}>Mot de passe</label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="Min. 6 caractères"
              style={{
                width: '100%', padding: '0.625rem', borderRadius: '0.375rem',
                border: '1px solid hsl(145, 25%, 45%)',
                backgroundColor: 'hsl(145, 40%, 38%)', color: 'white',
                outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>
          <div className="p-4 rounded-md text-sm mt-2" style={{
            backgroundColor: 'hsl(145, 40%, 25%)',
            border: '1px solid hsl(145, 25%, 45%)',
            color: 'hsl(140, 20%, 85%)'
          }}>
            <span className="font-semibold block mb-1" style={{ color: 'hsl(65, 85%, 55%)' }}>Informations importantes :</span>
            Ton compte sera en attente d'approbation par un administrateur après l'inscription. Tu pourras accéder à ton espace, mais tu ne verras aucun contrat tant que ton profil n'est pas validé.
          </div>
          <SubmitButton />
        </form>

        <div className="mt-8 pt-6 text-center text-sm" style={{ borderTop: '1px solid hsl(145, 25%, 45%)', color: 'hsl(140, 20%, 85%)' }}>
          <p className="mb-3">Tu as déjà un compte ?</p>
          <Link href="/auth/login" style={{ color: 'hsl(65, 85%, 55%)', fontWeight: 600, textDecoration: 'none' }}>Se connecter</Link>
        </div>
      </div>
    </div>
  );
}