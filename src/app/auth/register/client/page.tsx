import React from 'react';

export default function RegisterClientPage() {
  return (
    <div className="min-h-screen bg-[#2d5a27] flex items-center justify-center p-6 md:p-10">
      {/* La carte blanche avec plus d'arrondi et d'ombre */}
      <div className="bg-white w-full max-w-[550px] rounded-3xl shadow-2xl p-8 md:p-12 my-10">
        
        <form className="space-y-8">
          {/* Nom Complet */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-gray-800 ml-1">Nom complet</label>
            <input 
              type="text" 
              placeholder="Votre nom" 
              className="w-full px-5 py-4 bg-[#f9fafb] border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-gray-800 ml-1">Email</label>
            <input 
              type="email" 
              placeholder="votre@email.com" 
              className="w-full px-5 py-4 bg-[#f9fafb] border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Téléphone */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-gray-800 ml-1">Téléphone</label>
            <input 
              type="tel" 
              placeholder="514-000-0000" 
              className="w-full px-5 py-4 bg-[#f9fafb] border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Service demandé */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-gray-800 ml-1">Service demandé</label>
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
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-gray-800 ml-1">Message</label>
            <textarea 
              placeholder="Décrivez votre besoin..." 
              rows={4}
              className="w-full px-5 py-4 bg-[#f9fafb] border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none resize-none transition-all placeholder:text-gray-400"
            ></textarea>
          </div>

          {/* Bouton Envoyer */}
          <div className="pt-6">
            <button 
              type="submit" 
              className="w-full bg-[#fde047] hover:bg-yellow-400 text-black font-extrabold py-5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 text-lg"
            >
              Envoyer ma demande
              <span className="bg-white/60 px-2 py-0.5 rounded text-sm">✉️</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
