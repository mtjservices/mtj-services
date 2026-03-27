import React from 'react';

export default function RegisterClientPage() {
  return (
    <div className="min-h-screen bg-[#2d5a27] flex items-center justify-center p-6 md:p-10">
      
      {/* La carte blanche */}
      <div className="bg-white w-full max-w-[550px] rounded-3xl shadow-2xl py-12 my-10 overflow-hidden">
        
        {/* Titre (Optionnel, pour faire comme Lovable) */}
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Demander un service</h2>
        
        {/* On ajoute px-10 ici pour que RIEN ne dépasse sur les côtés */}
        <form className="space-y-8 px-10 text-left">
          
          {/* Nom Complet */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Nom complet</label>
            <input 
              type="text" 
              placeholder="Votre nom" 
              className="w-full px-5 py-4 bg-[#f9fafb] border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Email</label>
            <input 
              type="email" 
              placeholder="votre@email.com" 
              className="w-full px-5 py-4 bg-[#f9fafb] border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
            />
          </div>

          {/* Téléphone */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Téléphone</label>
            <input 
              type="tel" 
              placeholder="514-000-0000" 
              className="w-full px-5 py-4 bg-[#f9fafb] border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
            />
          </div>

          {/* Service demandé */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Service demandé</label>
            <div className="relative">
              <select className="w-full px-5 py-4 bg-[#f9fafb] border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none text-gray-500 appearance-none cursor-pointer">
                <option>Choisissez un service...</option>
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

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">Message</label>
            <textarea 
              placeholder="Décrivez votre besoin..." 
              rows={4}
              className="w-full px-5 py-4 bg-[#f9fafb] border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none resize-none transition-all"
            ></textarea>
          </div>

          {/* Bouton Envoyer */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-[#fde047] hover:bg-yellow-400 text-black font-extrabold py-5 rounded-full shadow-md transition-all flex items-center justify-center gap-3"
            >
              Envoyer ma demande
              <span className="bg-white/40 px-2 py-0.5 rounded text-xs">✉️</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
