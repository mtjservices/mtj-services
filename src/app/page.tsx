import Link from "next/link";

export default function Home() {
  return (
    <main>

      {/* Navbar */}
      <nav>
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-lg">M</div>
            <span className="font-bold text-lg">MTJ Services</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#services">Nos Services</Link>
            <Link href="#how">Comment ça marche</Link>
            <Link href="#contact">Contact</Link>
            <Link href="#mission">Notre Mission</Link>
            <Link href="/auth/login">Connexion</Link>
          </div>
          <div className="flex gap-2">
            <Link href="/auth/register/worker" className="btn btn-outline">Devenir Associé</Link>
            <Link href="/demander" className="btn btn-primary">Demander un service</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-32 bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Votre terrain, notre priorité.
            </h1>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Entretien de pelouse, déneigement et travaux manuels faits par des jeunes de 14 à 18 ans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demander" className="btn bg-white text-primary-700 text-lg font-bold shadow-xl">Demander un service</Link>
              <Link href="/auth/register/worker" className="btn border-2 border-white text-white text-lg font-bold">Rejoindre comme Associé</Link>
              <a href="tel:5146868010" className="btn bg-green-500 hover:bg-green-600 text-white text-lg font-bold">📞 Appelez-nous maintenant</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container">
          <div className="grid grid-cols-3 gap-8 text-center max-w-2xl mx-auto">
            <div><p className="text-4xl font-extrabold text-primary-600">14-18</p><p className="text-text-muted text-sm">Ans</p></div>
            <div><p className="text-4xl font-extrabold text-primary-600">7</p><p className="text-text-muted text-sm">Types de services</p></div>
            <div><p className="text-4xl font-extrabold text-primary-600">5</p><p className="text-text-muted text-sm">Niveaux de récompenses</p></div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold">Nos Services</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: "🌿", title: "Tonte de pelouse", desc: "Entretien régulier ou ponctuel." },
              { icon: "✂️", title: "Taille de haies", desc: "Haies et arbustes impeccables." },
              { icon: "🍂", title: "Ramassage de feuilles", desc: "Cour propre après chaque saison." },
              { icon: "❄️", title: "Déneigement", desc: "Entrée et trottoir dégagés." },
              { icon: "🌱", title: "Aménagement paysager", desc: "Plantation et mise en valeur." },
              { icon: "🔧", title: "Homme à tout faire", desc: "Réparations mineures." },
              { icon: "🎨", title: "Peinture et retouches", desc: "Rafraîchissez vos surfaces." },
              { icon: "📋", title: "Sur mesure", desc: "Besoin spécifique ? Contactez-nous." },
            ].map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="font-bold mb-1">{s.title}</h3>
                <p className="text-sm text-text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="how" className="py-24 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold">Comment ça marche</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {[
              { icon: "📝", title: "Inscrivez-vous", desc: "Créez votre compte." },
              { icon: "📋", title: "Soumettez", desc: "Décrivez le service voulu." },
              { icon: "📞", title: "Estimation", desc: "On vous contacte." },
              { icon: "👷", title: "Un associé accepte", desc: "Un travailleur prend le contrat." },
              { icon: "✅", title: "Complété", desc: "Payez en ligne ou comptant." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                </div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deux façons */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold">Deux façons de rejoindre MTJ</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="text-4xl mb-4">🏡</div>
              <h3 className="text-2xl font-bold mb-2">Je suis un client</h3>
              <p className="text-text-muted mb-6">Services fiables et abordables.</p>
              <ul className="space-y-2 mb-6">
                {["Estimation gratuite", "Travailleurs vérifiés", "Abonnement ou unique", "Paiement flexible"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/auth/register/client" className="btn btn-primary w-full text-center">Créer mon compte client</Link>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 relative">
              <span className="absolute top-4 right-4 bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-full">14-18 ans</span>
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-2xl font-bold mb-2">Je suis un associé</h3>
              <p className="text-text-muted mb-6">Gagne de l'argent et bâtis ton expérience.</p>
              <ul className="space-y-2 mb-6">
                {["Choisis tes contrats", "Accumule des gains à chaque job complété", "Système de niveaux", "Tableau de bord personnel"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/auth/register/worker" className="btn btn-primary w-full text-center">Postuler comme associé</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Système de niveaux */}
      <section className="py-24 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold">Système de niveaux 🏆</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {[
              { level: "N1", name: "Recrue MTJ", jobs: "0-4 jobs", bonus: "Accès au fil", color: "bg-gray-100 text-gray-700 border-gray-200" },
              { level: "N2", name: "Associé Bronze", jobs: "5-14 jobs", bonus: "+5% gains", color: "bg-amber-50 text-amber-700 border-amber-200" },
              { level: "N3", name: "Associé Argent", jobs: "15-29 jobs", bonus: "+10% priorité", color: "bg-slate-100 text-slate-600 border-slate-300" },
              { level: "N4", name: "Associé Or", jobs: "30-49 jobs", bonus: "+15% badge", color: "bg-yellow-50 text-yellow-700 border-yellow-300" },
              { level: "N5", name: "Élite MTJ 👑", jobs: "50+ jobs", bonus: "+20% exclusifs", color: "bg-blue-50 text-blue-700 border-blue-300" },
            ].map((lvl, i) => (
              <div key={i} className={`${lvl.color} border rounded-2xl p-6 text-center`}>
                <div className="text-2xl font-extrabold mb-1">{lvl.level}</div>
                <div className="font-bold text-sm mb-2">{lvl.name}</div>
                <div className="text-xs mb-1">{lvl.jobs}</div>
                <div className="text-xs font-semibold">{lvl.bonus}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact — SANS formulaire */}
      <section id="contact" className="py-24 bg-background">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold">Contactez-nous</h2>
            <p className="text-text-muted mt-2">Réponse garantie en moins de 24h ⚡</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Infos de contact */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📍</div>
                <div>
                  <h4 className="font-bold">Localisation</h4>
                  <p className="text-text-muted">Laval, Québec</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">📞</div>
                <div>
                  <h4 className="font-bold">Téléphone</h4>
                  <a href="tel:5146868010" className="text-primary-600 hover:underline">514-686-8010</a>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div>
                <h4 className="font-bold mb-2">Suivez-nous</h4>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/mtj_services?igsh=MTJvaGNkcTl2a2xrOA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">📸 Instagram</a>
                  <a href="https://www.facebook.com/share/18HiBuVygv/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">👍 Facebook</a>
                </div>
              </div>

              {/* Bouton appel */}
              <a href="tel:5146868010" className="btn bg-green-600 hover:bg-green-700 text-white font-bold w-full text-center block py-4 rounded-xl">
                📞 Appelez-nous maintenant
              </a>
            </div>

            {/* Bouton vers formulaire (remplace l'ancien formulaire) */}
            <div className="bg-card border border-border rounded-2xl p-8 text-center flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold mb-4">Envoyer une demande</h3>
              <p className="text-text-muted mb-6">Remplissez notre formulaire et recevez une réponse en moins de 24h ⚡</p>
              <Link href="/demander" className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-lg rounded-xl shadow-lg transition-all hover:-translate-y-0.5 text-center block">
                Demander un service ✉️
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="py-24 bg-primary-700 text-white">
        <div className="container text-center max-w-3xl mx-auto">
          <div className="text-5xl mb-6">🌱</div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Plus qu'un service — une mission sociale</h2>
          <p className="text-lg text-primary-100 mb-8">Les jeunes de 14 à 18 ans font face à un manque d'opportunités. MTJ Services est là pour changer ça.</p>
          <Link href="/auth/register/client" className="btn bg-black text-primary-700 text-lg font-bold shadow-xl">Rejoindre MTJ Services</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Prêt à commencer ?</h2>
          <p className="text-text-muted text-lg mb-8">Inscrivez-vous en moins de 2 minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demander" className="btn btn-primary text-lg">Demander un service</Link>
            <Link href="/auth/register/worker" className="btn btn-primary text-lg">Devenir associé</Link>
            <a href="tel:5146868010" className="btn bg-green-600 hover:bg-green-700 text-white text-lg font-bold">📞 Nous appeler</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border bg-primary-#076e28">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-#076e28 flex items-center justify-center text-white font-bold text-sm">M</div>
            <span className="font-bold">MTJ Services</span>
          </div>
          <div className="flex gap-6 text-sm text-text-muted">
            <Link href="#services" className="hover:text-foreground">Services</Link>
            <Link href="#contact" className="hover:text-foreground">Contact</Link>
            <Link href="#mission" className="hover:text-foreground">Mission</Link>
            <Link href="/auth/login" className="hover:text-foreground">Connexion</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/mtj_services?igsh=MTJvaGNkcTl2a2xrOA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-foreground transition-colors">📸 Instagram</a>
            <a href="https://www.facebook.com/share/18HiBuVygv/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-foreground transition-colors">👍 Facebook</a>
            <a href="tel:5146868010" className="text-text-muted hover:text-foreground transition-colors">📞 514-686-8010</a>
          </div>
          <p className="text-sm text-text-muted">© {new Date().getFullYear()} MTJ Services.</p>
        </div>
      </footer>
    </main>
  );
}
