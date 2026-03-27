import React from 'react';

export default function RequestServicePage() {
  return (
    // Le conteneur vert principal (on utilise la couleur exacte de ton site)
    <div className="min-h-screen bg-[#2d5a27] flex flex-col items-center justify-center p-4">
      
      {/* La carte blanche du formulaire */}
      <div className="bg-white w-full max-w-[500px] rounded-xl shadow-xl p-10">
        
        <form className="space-y-6">
          {/* Nom Complet */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-800">Nom complet</label>
            <input 
              type="text" 
              placeholder="Votre nom" 
              className="w-full px-4 py-3 bg-[#f8f9fa] border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-600"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-800">Email</label>
            <input 
              type="email" 
              placeholder="votre@email.com" 
              className="w-full px-4 py-3 bg-[#f8f9fa] border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-600"
            />
          </div>

          {/* Téléphone */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-800">Téléphone</label>
            <input 
              type="tel" 
              placeholder="514-000-0000" 
              className="w-full px-4 py-3 bg-[#f8f9fa] border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-600"
            />
          </div>

          {/* Service demandé */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-800">Service demandé</label>
            <div className="relative">
              <select className="w-full px-4 py-3 bg-[#f8f9fa] border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-500 appearance-none">
                <option>Choisissez un service...</option>
                <option>Entretien de pelouse</option>
                <option>Déneigement</option>
                <option>Travaux manuels</option>
                <option>Lavage de vitres</option>
                <option>Nettoyage de gouttières</option>
                <option>Taille de haie</option>
                <option>Ramassage de feuilles</option>
              </select>
              {/* Petite flèche personnalisée */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-800">Message</label>
            <textarea 
              placeholder="Décrivez votre besoin..." 
              rows={4}
              className="w-full px-4 py-3 bg-[#f8f9fa] border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-600 resize-none"
            ></textarea>
          </div>

          {/* Bouton Envoyer Jaune */}
          <button 
            type="submit" 
            className="w-full bg-[#eab308] hover:bg-yellow-500 text-black font-bold py-4 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 mt-4"
          >
            Envoyer ma demande
            <span className="bg-white rounded-sm px-1 text-[10px]">✉️</span>
          </button>
        </form>

      </div>
    </div>
  );
}
