import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-#076e28 overflow-x-hidden">
      <header className="fixed top-0 w-full z-50 glass-panel border-b border-border rounded-none">
        <div className="container flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-#076e28 flex items-center justify-center text-white font-bold text-xl shadow-md">M</div>
            <span className="font-bold text-xl tracking-tight">MTJ Services</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <Link href="#services" className="hover:text-primary-600 transition-colors">Nos Services</Link>
            <Link href="#comment" className="hover:text-primary-600 transition-colors">Comment ça marche</Link>
            <Link href="#contact" className="hover:text-primary-600 transition-colors">Contact</Link>
            <Link href="#mission" className="hover:text-primary-600 transition-colors">Notre Mission</Link>
            <Link href="/auth/login" className="hover:text-primary-600 transition-colors">Connexion</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/register/worker" className="btn btn-primary text-sm px-4 py-2">Devenir Associé</Link>
            <Link href="/auth/register/client" className="btn btn-primary text-sm px-4 py-2">Demander un service</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-44 pb-20 md:pt-44 md:pb-32 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl fade-in" style={{paddingTop: "80px"}}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
              Votre terrain, <span className="text-primary-600">notre priorité.</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-muted mb-10 max-w-2xl leading-relaxed">
              Entretien de pelouse, déneigement et travaux manuels faits par des jeunes de 14 à 18 ans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register/client" className="btn btn-primary text-lg shadow-lg">Demander un service</Link>
              <Link href="/auth/register/worker" className="btn btn-primary text-lg shadow-lg">Rejoindre comme Associé</Link>
              <a href="tel:5146868010" className="btn text-lg shadow-lg bg-green-600 hover:bg-green-700 text-white font-bold">📞 Appelez-nous maintenant</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-primary-#076e28 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div><p className="text-4xl font-black">14-18</p><p className="text-primary-200 text-sm mt-1">Ans</p></div>
            <div><p className="text-4xl font-black">7</p><p className="text-primary-200 text-sm mt-1">Types de services</p></div>
            <div><p className="text-4xl font-black">5</p><p className="text-primary-200 text-sm mt-1">Niveaux de récompenses</p></div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Nos Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div key={i} className="glass-panel p-6 rounded-2xl border border-border hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="comment" className="py-24 bg-primary-#076e28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Comment ça marche</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { icon: "📝", title: "Inscrivez-vous", desc: "Créez votre compte." },
              { icon: "📋", title: "Soumettez", desc: "Décrivez le service voulu." },
              { icon: "📞", title: "Estimation", desc: "On vous contacte." },
              { icon: "👷", title: "Un associé accepte", desc: "Un travailleur prend le contrat." },
              { icon: "✅", title: "Complété", desc: "Payez en ligne ou comptant." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-4">
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-red-200 border border-red-300 rounded-xl flex items-center justify-center">{item.icon}</div>
                  <span className="absolute -top-2 -right-2 bg-primary-#076e28 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">{i + 1}</span>
                </div>
                <h3 className="font-bold text-base mb-1">{item.title}</h3>
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
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Deux façons de rejoindre MTJ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-10 rounded-3xl border border-border shadow-lg">
              <div className="text-5xl mb-6">🏡</div>
              <h3 className="text-2xl font-extrabold mb-3">Je suis un client</h3>
              <p className="text-text-muted mb-6">Services fiables et abordables.</p>
              <ul className="space-y-3 mb-8">
                {["Estimation gratuite", "Travailleurs vérifiés", "Abonnement ou unique", "Paiement flexible"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/auth/register/client" className="btn btn-primary w-full justify-center">Créer mon compte client</Link>
            </div>
            <div className="glass-panel p-10 rounded-3xl border-2 border-primary-300 bg-gradient-to-br from-primary-50 to-white shadow-lg relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-primary-#076e28 text-white text-xs font-bold px-3 py-1 rounded-full">14-18 ans</div>
              <div className="text-5xl mb-6">💼</div>
              <h3 className="text-2xl font-extrabold mb-3">Je suis un associé</h3>
              <p className="text-text-muted mb-6">Gagne de l'argent et bâtis ton expérience.</p>
              <ul className="space-y-3 mb-8">
                {["Choisis tes contrats", "Accumule des gains à chaque job complété", "Système de niveaux", "Tableau de bord personnel"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/auth/register/worker" className="btn btn-primary w-full justify-center">Postuler comme associé</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Système de niveaux */}
      <section className="py-24 bg-primary-#076e28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Système de niveaux 🏆</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { level: "N1", name: "Recrue MTJ", jobs: "0-4 jobs", bonus: "Accès au fil", color: "bg-gray-100 text-gray-700 border-gray-200" },
              { level: "N2", name: "Associé Bronze", jobs: "5-14 jobs", bonus: "+5% gains", color: "bg-amber-50 text-amber-700 border-amber-200" },
              { level: "N3", name: "Associé Argent", jobs: "15-29 jobs", bonus: "+10% priorité", color: "bg-slate-100 text-slate-600 border-slate-300" },
              { level: "N4", name: "Associé Or", jobs: "30-49 jobs", bonus: "+15% badge", color: "bg-yellow-50 text-yellow-700 border-yellow-300" },
              { level: "N5", name: "Élite MTJ 👑", jobs: "50+ jobs", bonus: "+20% exclusifs", color: "bg-blue-50 text-blue-700 border-blue-300" },
            ].map((lvl, i) => (
              <div key={i} className={`p-6 rounded-2xl border-2 ${lvl.color} text-center hover:-translate-y-1 transition-transform`}>
                <div className="text-3xl font-black mb-2">{lvl.level}</div>
                <div className="font-bold text-sm mb-1">{lvl.name}</div>
                <div className="text-xs opacity-70 mb-3">{lvl.jobs}</div>
                <div className="text-xs font-semibold bg-white/60 rounded-lg px-2 py-1">{lvl.bonus}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Contactez-nous</h2>
            <p className="text-text-muted text-lg">Réponse garantie en moins de 24h ⚡</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Infos de contact */}
            <div className="space-y-8">
              <div className="glass-panel p-8 rounded-3xl border border-border shadow-lg space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-xl">📍</div>
                  <div>
                    <p className="font-bold text-foreground">Localisation</p>
                    <p className="text-text-muted">Laval, Québec</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">📞</div>
                  <div>
                    <p className="font-bold text-foreground">Téléphone</p>
                    <a href="tel:5146868010" className="text-primary-600 font-semibold hover:underline">514-686-8010</a>
                  </div>
                </div>

                {/* Réseaux sociaux */}
                <div className="pt-4 border-t border-border">
                  <p className="font-bold text-foreground mb-4">Suivez-nous</p>
                  <div className="flex gap-4">
                    <a
                      href="https://www.instagram.com/mtj_services?igsh=MTJvaGNkcTl2a2xrOA%3D%3D&utm_source=qr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity shadow-md"
                    >
                      📸 Instagram
                    </a>
                    <a
                      href="https://www.facebook.com/share/18HiBuVygv/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity shadow-md"
                    >
                      👍 Facebook
                    </a>
                  </div>
                </div>
              </div>

              {/* Bouton appel */}
              <a
                href="tel:5146868010"
                className="flex items-center justify-center gap-3 w-full py-5 bg-green-600 hover:bg-green-700 text-white font-extrabold text-xl rounded-2xl shadow-xl transition-all hover:-translate-y-1"
              >
                📞 Appelez-nous maintenant
              </a>
            </div>

            {/* Formulaire */}
            <div className="glass-panel p-8 rounded-3xl border border-border shadow-lg">
              <h3 className="text-2xl font-extrabold mb-6">Envoyer une demande</h3>
              <form className="space-y-4" action="https://formsubmit.co/ismaelaj@icloud.com" method="POST">
                <input type="hidden" name="_subject" value="Nouvelle demande MTJ Services" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="https://mtj-services.vercel.app" />

                <div>
                  <label className="block text-sm font-semibold mb-1 text-foreground">Nom complet</label>
                  <input
                    type="text"
                    name="nom"
                    required
                    placeholder="Jean Tremblay"
                    className="w-full px-4 py-3 border border-border rounded-xl bg-surface text-foreground focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-foreground">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="jean@email.com"
                    className="w-full px-4 py-3 border border-border rounded-xl bg-surface text-foreground focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-foreground">Téléphone</label>
                  <input
                    type="tel"
                    name="telephone"
                    required
                    placeholder="514-000-0000"
                    className="w-full px-4 py-3 border border-border rounded-xl bg-surface text-foreground focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-foreground">Service demandé</label>
                  <select
                    name="service"
                    required
                    className="w-full px-4 py-3 border border-border rounded-xl bg-surface text-foreground focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
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
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-foreground">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Décrivez votre besoin..."
                    className="w-full px-4 py-3 border border-border rounded-xl bg-surface text-foreground focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-lg rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
                >
                  Envoyer ma demande ✉️
                </button>
                <p className="text-center text-xs text-text-muted">⚡ Réponse garantie en moins de 24h</p>
              </form>
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
            <Link href="/auth/register/client" className="btn btn-primary text-lg">Demander un service</Link>
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
          <p className="text-sm text-text-muted">&copy; {new Date().getFullYear()} MTJ Services.</p>
        </div>
      </footer>
    </main>
  );
}