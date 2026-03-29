'use client';

import React, { useState } from 'react';

export default function RegisterClientPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      nom: formData.get('nom') as string,
      email: formData.get('email') as string,
      telephone: formData.get('telephone') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
    };

    try {
      const res = await fetch('/api/demande', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const err = await res.json();
        setError(err.message || 'Une erreur est survenue.');
      }
    } catch {
      setError('Impossible d\'envoyer la demande. Réessayez.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#2d5a27] flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-[550px] rounded-3xl shadow-2xl py-12 px-10 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Demande envoyée !</h2>
          <p className="text-gray-600 mb-2">Votre demande a bien été reçue.</p>
          <p className="text-gray-500 text-sm">Un représentant MTJ Services vous contactera sous <strong>24h</strong> pour une estimation gratuite.</p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-8 bg-[#2d5a27] text-white font-bold px-8 py-3 rounded-full hover:bg-[#1e5c0f] transition-all"
          >
            Nouvelle demande
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2d5a27] flex items-center justify-center p-6 md:p-10">
      <div className="bg-white w-full max-w-[550px] rounded-3xl shadow-2xl py-12 my-10 overflow-hidden">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Demander un service</h2>
        <p className="text-center text-sm text-gray-500 mb-8">Réponse garantie en moins de 24h ⚡</p>

        {error && (
          <div className="mx-10 mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 px-10 text-left">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Nom complet *</label>
            <input name="nom" type="text" placeholder="Votre nom" required className="w-full px-5 py-4 bg-[#f9fafb] border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"/>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Email *</label>
            <input name="email" type="email" placeholder="votre@email.com" required className="w-full px-5 py-4 bg-[#f9fafb] border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"/>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Téléphone *</label>
            <input name="telephone" type="tel" placeholder="514-000-0000" required className="w-full px-5 py-4 bg-[#f9fafb] border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"/>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Service demandé *</label>
            <div className="relative">
              <select name="service" required className="w-full px-5 py-4 bg-[#f9fafb] border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none text-gray-500 appearance-none cursor-pointer">
                <option value="">Choisissez un service...</option>
                <option>Tonte de pelouse</option>
                <option>Taille de haies</option>
                <option>Ramassage de feuilles</option>
                <option>Déneigement</option>
                <option>Aménagement paysager</option>
                <option>Homme à tout faire</option>
                <option>Peinture et retouches</option>
                <option>Sur mesure</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Message</label>
            <textarea name="message" placeholder="Décrivez votre besoin..." rows={4} className="w-full px-5 py-4 bg-[#f9fafb] border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none resize-none transition-all"/>
          </div>
          <div className="pt-4">
            <button type="submit" disabled={loading} className="w-full bg-[#fde047] hover:bg-yellow-400 text-black font-extrabold py-5 rounded-full shadow-md transition-all flex items-center justify-center gap-3 disabled:opacity-60">
              {loading ? 'Envoi en cours...' : 'Envoyer ma demande'}
              {!loading && <span className="bg-white/40 px-2 py-0.5 rounded text-xs">✉️</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
