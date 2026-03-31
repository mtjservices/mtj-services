import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen" style={{
      backgroundColor: 'hsl(145, 45%, 32%)',
      color: 'hsl(0, 0%, 100%)',
      fontFamily: "'Inter', sans-serif"
    }}>

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: 'hsla(145, 45%, 32%, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid hsl(145, 25%, 45%)'
      }}>
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <Link href="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
            <span style={{
              backgroundColor: 'hsl(65, 85%, 55%)', color: 'hsl(150, 40%, 15%)',
              fontWeight: 900, fontSize: '1.125rem', width: '2.25rem', height: '2.25rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem'
            }}>M</span>
            <span style={{ fontWeight: 800, fontSize: '1.125rem', color: 'white' }}>MTJ Services</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: "Nos Services", href: "#services" },
              { label: "Comment ça marche", href: "#how" },
              { label: "Notre Mission", href: "#mission" },
              { label: "Contact", href: "#contact" },
            ].map((l) => (
              <a key={l.href} href={l.href} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/login" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}>Connexion</Link>
            <Link href="/auth/register/worker" style={{
              backgroundColor: 'hsl(65, 85%, 55%)', color: 'hsl(150, 40%, 15%)',
              fontWeight: 600, padding: '0.5rem 1rem', borderRadius: '0.75rem', fontSize: '0.875rem', textDecoration: 'none'
            }}>Devenir Associé</Link>
            <Link href="/auth/register/client" style={{
              backgroundColor: 'hsl(65, 85%, 55%)', color: 'hsl(150, 40%, 15%)',
              fontWeight: 600, padding: '0.5rem 1rem', borderRadius: '0.75rem', fontSize: '0.875rem', textDecoration: 'none'
            }}>Demander un service</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: '7rem', paddingBottom: '4rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <div className="container mx-auto max-w-4xl">
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', color: 'white' }}>
            Un terrain impeccable. Une opportunité pour les jeunes.
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'hsl(140, 20%, 85%)', marginBottom: '2rem', maxWidth: '42rem' }}>
            Entretien de pelouse, déneigement et travaux manuels faits par des jeunes de 14 à 18 ans.
          </p>
          <div className="flex flex-wrap gap-3 mb-12">
            <Link href="/auth/register/client" style={{
              backgroundColor: 'hsl(65, 85%, 55%)', color: 'hsl(150, 40%, 15%)',
              fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', textDecoration: 'none', display: 'inline-block'
            }}>Demander un service</Link>
            <Link href="/auth/register/worker" style={{
              backgroundColor: 'hsl(145, 35%, 28%)', color: 'white',
              fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', textDecoration: 'none', display: 'inline-block'
            }}>Rejoindre comme Associé</Link>
            <a href="tel:5146868010" style={{
              border: '2px solid white', color: 'white',
              fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', textDecoration: 'none', display: 'inline-block'
            }}>📞 Appelez-nous maintenant</a>
          </div>
          <div className="grid grid-cols-3 gap-6 max-w-lg">
            {[
              { val: "14-18", label: "Ans" },
              { val: "7", label: "Types de services" },
              { val: "5", label: "Niveaux de récompenses" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'hsl(65, 85%, 55%)' }}>{s.val}</div>
                <div style={{ fontSize: '0.875rem', color: 'hsl(140, 20%, 85%)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: '4rem 1rem', backgroundColor: 'hsl(145, 45%, 32%)' }}>
        <div className="container mx-auto">
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'white', textAlign: 'center', marginBottom: '2.5rem' }}>Nos Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "🌿", title: "Tonte de pelouse", desc: "Entretien régulier ou ponctuel." },
              { icon: "✂️", title: "Taille de haies", desc: "Haies et arbustes impeccables." },
              { icon: "🍂", title: "Ramassage de feuilles", desc: "Cour propre après chaque saison." },
              { icon: "❄️", title: "Déneigement", desc: "Entrée et trottoir dégagés." },
              { icon: "🌱", title: "Aménagement paysager", desc: "Plantation et mise en valeur." },
              { icon: "🔧", title: "Homme à tout faire", desc: "Réparations mineures." },
              { icon: "🎨", title: "Peinture et retouches", desc: "Rafraîchissez vos surfaces." },
              { icon: "📋", title: "Sur mesure", desc: "Besoin spécifique ? Contactez-nous." },
            ].map((s) => (
              <div key={s.title} style={{
                backgroundColor: 'hsl(145, 35%, 28%)', color: 'white',
                borderRadius: '1rem', padding: '1.25rem'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{s.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.25rem' }}>{s.title}</h3>
                <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section id="how" style={{ padding: '4rem 1rem', backgroundColor: 'hsl(145, 45%, 32%)' }}>
        <div className="container mx-auto">
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'white', textAlign: 'center', marginBottom: '2.5rem' }}>Comment ça marche</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: "📝", title: "Inscrivez-vous", desc: "Créez votre compte." },
              { icon: "📋", title: "Soumettez", desc: "Décrivez le service voulu." },
              { icon: "📞", title: "Estimation", desc: "On vous contacte." },
              { icon: "👷", title: "Un associé accepte", desc: "Un travailleur prend le contrat." },
              { icon: "✅", title: "Complété", desc: "Payez en ligne ou comptant." },
            ].map((s, i) => (
              <div key={s.title} className="flex flex-col items-center text-center gap-2">
                <div style={{
                  backgroundColor: 'hsl(145, 35%, 28%)', width: '4rem', height: '4rem',
                  borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', position: 'relative'
                }}>
                  {s.icon}
                  <span style={{
                    position: 'absolute', top: '-0.5rem', right: '-0.5rem',
                    backgroundColor: 'hsl(65, 85%, 55%)', color: 'hsl(150, 40%, 15%)',
                    width: '1.5rem', height: '1.5rem', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.75rem'
                  }}>{i + 1}</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '0.875rem', color: 'white' }}>{s.title}</h3>
                <p style={{ fontSize: '0.75rem', color: 'hsl(140, 20%, 85%)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEUX FAÇONS */}
      <section style={{ padding: '4rem 1rem', backgroundColor: 'hsl(145, 45%, 32%)' }}>
        <div className="container mx-auto">
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'white', textAlign: 'center', marginBottom: '2.5rem' }}>Deux façons de rejoindre MTJ</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div style={{ backgroundColor: 'hsl(145, 35%, 28%)', color: 'white', borderRadius: '1rem', padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🏡</div>
              <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.5rem' }}>Je suis un client</h3>
              <p style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '1rem' }}>Services fiables et abordables.</p>
              <ul style={{ fontSize: '0.875rem', marginBottom: '1.5rem', listStyle: 'none', padding: 0 }}>
                {["Estimation gratuite", "Travailleurs vérifiés", "Abonnement ou unique", "Paiement flexible"].map(item => (
                  <li key={item} style={{ marginBottom: '0.25rem' }}>✓ {item}</li>
                ))}
              </ul>
              <Link href="/auth/register/client" style={{
                backgroundColor: 'hsl(65, 85%, 55%)', color: 'hsl(150, 40%, 15%)',
                fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', textDecoration: 'none', display: 'inline-block', fontSize: '0.875rem'
              }}>Créer mon compte client</Link>
            </div>
            <div style={{ backgroundColor: 'hsl(145, 35%, 28%)', color: 'white', borderRadius: '1rem', padding: '1.5rem', position: 'relative' }}>
              <span style={{
                position: 'absolute', top: '1rem', right: '1rem',
                backgroundColor: 'hsl(65, 85%, 55%)', color: 'hsl(150, 40%, 15%)',
                fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '9999px'
              }}>14-18 ans</span>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>💼</div>
              <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.5rem' }}>Je suis un associé</h3>
              <p style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '1rem' }}>Gagne de l'argent et bâtis ton expérience.</p>
              <ul style={{ fontSize: '0.875rem', marginBottom: '1.5rem', listStyle: 'none', padding: 0 }}>
                {["Choisis tes contrats", "Accumule des gains à chaque job complété", "Système de niveaux", "Tableau de bord personnel"].map(item => (
                  <li key={item} style={{ marginBottom: '0.25rem' }}>✓ {item}</li>
                ))}
              </ul>
              <Link href="/auth/register/worker" style={{
                backgroundColor: 'hsl(65, 85%, 55%)', color: 'hsl(150, 40%, 15%)',
                fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', textDecoration: 'none', display: 'inline-block', fontSize: '0.875rem'
              }}>Postuler comme associé</Link>
            </div>
          </div>
        </div>
      </section>

      {/* NIVEAUX */}
      <section style={{ padding: '4rem 1rem', backgroundColor: 'hsl(145, 45%, 32%)' }}>
        <div className="container mx-auto">
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'white', textAlign: 'center', marginBottom: '2.5rem' }}>Système de niveaux 🏆</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { tag: "N1", name: "Recrue MTJ", jobs: "0-4 jobs", perk: "Accès au fil" },
              { tag: "N2", name: "Associé Bronze", jobs: "5-14 jobs", perk: "+5% gains" },
              { tag: "N3", name: "Associé Argent", jobs: "15-29 jobs", perk: "+10% priorité" },
              { tag: "N4", name: "Associé Or", jobs: "30-49 jobs", perk: "+15% badge" },
              { tag: "N5", name: "Élite MTJ 👑", jobs: "50+ jobs", perk: "+20% exclusifs" },
            ].map((l) => (
              <div key={l.tag} style={{
                backgroundColor: 'hsl(140, 30%, 88%)', color: 'hsl(150, 40%, 15%)',
                borderRadius: '1rem', padding: '1rem', textAlign: 'center',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem'
              }}>
                <span style={{
                  backgroundColor: 'hsl(65, 85%, 55%)', color: 'hsl(150, 40%, 15%)',
                  fontWeight: 900, fontSize: '1.125rem', width: '3rem', height: '3rem',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>{l.tag}</span>
                <h3 style={{ fontWeight: 700, fontSize: '0.875rem', marginTop: '0.5rem' }}>{l.name}</h3>
                <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>{l.jobs}</p>
                <p style={{
                  fontSize: '0.75rem', fontWeight: 600,
                  backgroundColor: 'hsl(65, 85%, 55%)', color: 'hsl(150, 40%, 15%)',
                  borderRadius: '9999px', padding: '0.25rem 0.75rem', marginTop: '0.25rem'
                }}>{l.perk}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '4rem 1rem', backgroundColor: 'hsl(145, 45%, 32%)' }}>
        <div className="container mx-auto max-w-2xl text-center">
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'white', textAlign: 'center', marginBottom: '1rem' }}>Contactez-nous</h2>
          <p style={{ color: 'hsl(140, 20%, 75%)', marginBottom: '2rem' }}>Réponse garantie en moins de 24h ⚡</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div style={{ backgroundColor: 'hsl(145, 35%, 28%)', color: 'white', borderRadius: '1rem', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📍</div>
              <h3 style={{ fontWeight: 700, fontSize: '0.875rem' }}>Localisation</h3>
              <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>Laval, Québec</p>
            </div>
            <div style={{ backgroundColor: 'hsl(145, 35%, 28%)', color: 'white', borderRadius: '1rem', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📞</div>
              <h3 style={{ fontWeight: 700, fontSize: '0.875rem' }}>Téléphone</h3>
              <a href="tel:5146868010" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'hsl(65, 85%, 55%)', textDecoration: 'none' }}>514-686-8010</a>
            </div>
          </div>
          <div className="flex justify-center gap-4 mb-6">
            <a href="https://www.instagram.com/mtj_services?igsh=MTJvaGNkcTl2a2xrOA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{
              backgroundColor: 'hsl(145, 35%, 28%)', color: 'white',
              fontWeight: 600, padding: '0.5rem 1rem', borderRadius: '0.75rem', textDecoration: 'none', fontSize: '0.875rem',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>📸 Instagram</a>
            <a href="https://www.facebook.com/share/18HiBuVygv/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{
              backgroundColor: 'hsl(145, 35%, 28%)', color: 'white',
              fontWeight: 600, padding: '0.5rem 1rem', borderRadius: '0.75rem', textDecoration: 'none', fontSize: '0.875rem',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>👍 Facebook</a>
          </div>
          <a href="tel:5146868010" style={{
            border: '2px solid white', color: 'white',
            fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', textDecoration: 'none', display: 'inline-block'
          }}>📞 Appelez-nous maintenant</a>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" style={{ padding: '4rem 1rem', backgroundColor: 'hsl(145, 45%, 32%)' }}>
        <div className="container mx-auto max-w-3xl text-center">
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌱</div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'white', textAlign: 'center', marginBottom: '1rem' }}>Plus qu'un service — une mission sociale</h2>
          <p style={{ color: 'hsl(140, 20%, 85%)', marginBottom: '2rem', fontSize: '1.125rem' }}>
            Les jeunes de 14 à 18 ans font face à un manque d'opportunités. MTJ Services est là pour changer ça.
          </p>
          <Link href="/auth/register/client" style={{
            backgroundColor: 'hsl(65, 85%, 55%)', color: 'hsl(150, 40%, 15%)',
            fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', textDecoration: 'none', display: 'inline-block'
          }}>Rejoindre MTJ Services</Link>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{ padding: '4rem 1rem', backgroundColor: 'hsl(145, 35%, 28%)' }}>
        <div className="container mx-auto text-center">
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'white', textAlign: 'center', marginBottom: '1rem' }}>Prêt à commencer ?</h2>
          <p style={{ color: 'hsl(140, 20%, 85%)', marginBottom: '2rem' }}>Inscrivez-vous en moins de 2 minutes.</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Link href="/auth/register/client" style={{
              backgroundColor: 'hsl(65, 85%, 55%)', color: 'hsl(150, 40%, 15%)',
              fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', textDecoration: 'none', display: 'inline-block'
            }}>Demander un service</Link>
            <Link href="/auth/register/worker" style={{
              border: '2px solid white', color: 'white',
              fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', textDecoration: 'none', display: 'inline-block'
            }}>Devenir Associé</Link>
            <a href="tel:5146868010" style={{
              border: '2px solid white', color: 'white',
              fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', textDecoration: 'none', display: 'inline-block'
            }}>📞 Nous appeler</a>
          </div>
          <div className="flex flex-wrap justify-center gap-6" style={{ color: 'hsl(140, 20%, 85%)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            <a href="#services" style={{ color: 'hsl(140, 20%, 85%)', textDecoration: 'none' }}>Services</a>
            <a href="#contact" style={{ color: 'hsl(140, 20%, 85%)', textDecoration: 'none' }}>Contact</a>
            <a href="#mission" style={{ color: 'hsl(140, 20%, 85%)', textDecoration: 'none' }}>Mission</a>
            <Link href="/auth/login" style={{ color: 'hsl(140, 20%, 85%)', textDecoration: 'none' }}>Connexion</Link>
            <a href="https://www.instagram.com/mtj_services?igsh=MTJvaGNkcTl2a2xrOA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{ color: 'hsl(140, 20%, 85%)', textDecoration: 'none' }}>📸 Instagram</a>
            <a href="https://www.facebook.com/share/18HiBuVygv/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{ color: 'hsl(140, 20%, 85%)', textDecoration: 'none' }}>👍 Facebook</a>
          </div>
          <p style={{ color: 'hsl(140, 20%, 85%)', fontSize: '0.875rem' }}>© {new Date().getFullYear()} MTJ Services.</p>
        </div>
      </section>

    </div>
  );
}