'use client';
import { useActionState } from 'react';
import { loginAction } from '@/app/actions/auth';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';

const initialState = { error: '' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary w-full mt-4" disabled={pending}>
      {pending ? 'Connexion en cours...' : 'Se connecter'}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="glass-panel p-8 w-full max-w-md shadow-xl rounded-xl">
        <div className="text-center mb-6">
           <Link href="/" className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 text-white font-bold text-2xl rounded-lg mb-4">
              M
           </Link>
           <h1 className="text-2xl font-bold">Connexion</h1>
           <p className="text-text-muted mt-2">Accédez à votre espace MTJ Services</p>
        </div>
        
        {state?.error && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-md mb-4 text-sm font-medium">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-foreground">Adresse courriel</label>
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="votre@email.com"
              className="w-full p-2.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-foreground">Mot de passe</label>
            <input 
              name="password" 
              type="password" 
              required 
              placeholder="••••••••"
              className="w-full p-2.5 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-background"
            />
          </div>
          <SubmitButton />
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-text-muted">
          <p className="mb-3">Pas encore de compte ?</p>
          <div className="flex flex-col gap-2">
            <Link href="/auth/register/client" className="text-primary-600 hover:text-primary-700 font-medium">Créer un compte Client</Link>
            <Link href="/auth/register/worker" className="text-primary-600 hover:text-primary-700 font-medium">Devenir Associé (14-18 ans)</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
