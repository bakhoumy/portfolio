/* js/script.js */

document.addEventListener('DOMContentLoaded', () => {

    /* == Configurations Native : Menu et Scroll... (inchangé pour gagner la place) == */
    const setupMobileNav = () => { /* gardez le code précédent... */ };
    const setupScrollEffects = () => { /* gardez le code précédent... */ };
    const setupSmoothScrolling = () => { /* gardez le code précédent... */ };
    const setupRevealAnimation = () => {
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target); } });
        }, { threshold: 0.1 });
        revealElements.forEach(el => revealObserver.observe(el));
    };


    /**
     * DATABASE ULTRA PREMIUM "CASE STUDIES" - Le cœur de la refonte
     * Structure de l'ensemble de votre expertise injectée avec HTML 
     */
    const setupProjectsModal = () => {
        const projectDatabase = {
            mamelamp: {
                title: "SAMA QUINCAILLERIE : PWA E-commerce Marché Sénégalais",
                desc: `
                    <h4>🎯 Le Défi Métier</h4>
                    <p>Fournir une expérience e-commerce qui combine la confiance d'une boutique locale à la vélocité d'une app internationale, le tout pour un contexte de connexion fluctuante.</p>
                    
                    <h4>💻 Ma Réponse Technique & Front/Back-end</h4>
                    <p>Développement sans plugin bloquant : Architecture hybride WordPress avec interface pur-CSS via Tailwind CSS & JS (Vanilla/jQuery).</p>
                    <ul>
                        <li><strong>Interface "App-like iOS" :</strong> Redéfinition intégrale des composants WooCommerce en mode Glassmorphism. Carrousels et Bento grids (Mosaïques modernes) inspirés des guidelines Apple.</li>
                        <li><strong>Manager Front-end :</strong> "L'Espace Gérant" bypassant totalement wp-admin. Sécurité rôle/permissions active : le vendeur met le produit/stock à jour depuis le rayon de sa quincaillerie sur son téléphone en - de 60 secondes.</li>
                        <li><strong>PWA & Caching :</strong> Manifest JSON natif et utilisation brute des "Service Workers" mettant le cache du téléphone à contribution : ouverture immédiate, fonctionnement même en connexion bridée sur les gros chantiers de banlieue.</li>
                        <li><strong>Le Workflow "Sénégal" :</strong> Tunnel finalisé par un pont automatique direct vers le Chat WhatsApp avec image enrichie prévisualisable + système de panier pour liste entière du maçon/ferrailleur.</li>
                    </ul>`,
                image: "assets/images/projet_mamelamp.png",
                live: "https://quincaillerie-mamelamp.com/", 
                git: ""
            },
            restobi: {
                title: "Resto Bi : Mobile POS 100% Hors Ligne",
                desc: `
                    <h4>🎯 Concept Offline-First pour PME Ouest-Africaine</h4>
                    <p>La digitalisation des Fast-Foods & Boutiques bloque devant la complexité ou le manque de souveraineté réseau (factures d'abonnements Saas, Coupures internet & électricité).</p>
                    
                    <h4>🛠️ Conception Flutter Dart / Base de données SQLite Cryptée</h4>
                    <ul>
                        <li><strong>Impression Thermique Indépendante :</strong> Code hardware natif sous <span class="tag">flutter_blue_plus</span> via protocole de trames (ESC/POS) autorisant l'envoi vers micro-imprimante bluetooth instantanée du vendeur sans Cloud centralisé.</li>
                        <li><strong>Le Triple "K" (Sécurité Banque) :</strong> Mode HORS-LIGNE protégé via <span class="tag">SQLCipher</span> qui empêche même un vol du disque/smartphone de révéler le carnet financier du Resto. Pin encryptés et différenciés (Vendeur / Gérant admin).</li>
                        <li><strong>Backup Privé Cloud Gdrive & Cloud Firebase Sync :</strong> Couplé à un processus Firestore de licences et de <span class="tag">Kill-Switch local/distance</span> (Couper à distance l'appareil bloquant le gérant insolvable dès une récupération G4 réseau aléatoire). Outil API de résilience Google Drive via OAuth2 : données 100% aux gérants personnels (Export auto ou PDF via permissions natives).</li>
                        <li><strong>Dashboard Financier temps réel :</strong> Animé au centième de frame UI premium sans fatguer via UI/UX Flutter "Animate/fl_chart". Dark theme adaptatif obligatoire pour vendeurs en équipes nocturnes prolongées.</li>
                    </ul>`,
                image: "assets/images/projet_restobi.png",
                live: "", git: ""
            },
            toubabtp: {
                title: "Client: TOUBA BTP | Architecture Web Corporate prestige",
                desc: `
                    <h4>🏛 L'objectif Visuel : Prestige BTP</h4>
                    <p>Refonte radicale "hors" du modèle conventionnel WordpPress (Zero Elementor, Aucun Page Builder).</p>
                    
                    <h4>🖥 Solution UI/UX Pure, CSS Performance et Javascript d'action 3D</h4>
                    <ul>
                        <li><strong>Tailwind Local Purge/Build / Full Dev CMS :</strong> Maintien sous Node/NPM. Poids de CSS insignifiant (chargement optimisé pour des marchés où l'instantané vaut Google SEO Rank N°1) alors que l'infrastructure tourne avec complexités Masonry et fond en JS d'ambiance particules (Particles JS, Hooks, DOM Observer / AOS Framework...). </li>
                        <li><strong>Micro-interactivité Front End High :</strong> Sur les blocs architectes internes "Effets Mouse hover" cartes en déviation pseudo magnétisées donnant relief 3D, design dit « Blueprint » d'agence à millions sur une approche web mobile locale...  Couplés un smart IA conversationnelle embarquée / Chatbot guichet unique prédictive orientant B2B local).</li>
                        <li><strong>Espace Client et Administration Modélisées UX/UI sur le Client Corporate Customizer WP Controler native. Charte Bleu royal Innovation "green innovation Touba"). 3 Étapes process Devis interactif convertisseur sans bounce local ! </strong></li>
                    </ul>`,
                image: "assets/images/projet_toubabtp.png",
                live: "https://touba-btp.com/", git: ""
            },
            samadaara: {
                title: "Waqf SocioTech : Sama Daara Management",
                desc: `
                    <h4>📿 Souveraineté Digitale pour "Ndiang Ndiangyi"</h4>
                    <p>Solution bureautique complète déployée sous PC de daara pour sédentariser notes de mémoire, présences matricules & listes pédagogiques multilingues (Arabe/FR/Wolof) ne nécessitant aucun internet pour ne pas exploiter datas 4G privées directes enseignants.  Sécurité totale mineurs anonymat assurée ("souverain"). Projet sociologique & développeur complet ("Waqf gratuité intellect")..</p>
                    
                    <h4>🧠 App lourde et Bidi RTL Report Algorithmiques & Pillow </h4>
                    <ul>
                        <li><strong>Python Base Desktop UX PySide6 (The Qt project !) UI "Dark Glass/Modern Systems": </strong> Conception d’architecte (Widgets/Graph donut progressions UX).
                        </li>
                        <li><strong>Traitement Exportation : (BIDI algorithmique droite et Police native Arabes AMIRI Font / Libre, Reporting via Python_DocLabs/ Report_lab / et Pillow pour montage "auto des listes certificatifs par le pc, puis openPyxEl base sqlite export ! "). Licence validation (Crypt / uuid motherboard liée Hardware device restriction offline protection anti copie code...!) . </strong></li>
                    </ul>`,
                image: "assets/images/projet_samadaara.png",
                live: "", git: "https://github.com/votre_profil/SamaDaara"
            },
            // Pour Sendiwaan & Scrcpy, nous mettons de brèves descriptions respectant la structure :
            sendiwaan: {
                title: "Sendiwaan - Plateforme de Petites Annonces Locales",
                desc: `
                    <h4>🛒 Le Marché de l'Économie Circulaire</h4>
                    <p>La mission était de déployer une plateforme C-to-C (entre particuliers) 100% gratuite, pour encourager le don, le troc et l'économie locale au Sénégal via une interface accessible à tous.</p>
                    
                    <h4>💻 Approche Agile : "Child Theme" & Surcharge WP</h4>
                    <ul>
                        <li><strong>Choix Technologique Stratégique :</strong> Pour répondre aux exigences fonctionnelles complexes des annonces sans exploser les délais, nous avons fait l'acquisition d'un thème premium professionnel agissant comme socle robuste de base de données.</li>
                        <li><strong>Développement en Thème Enfant (Child Theme) :</strong> J'ai créé un thème enfant afin de réécrire en profondeur les fichiers de rendu (PHP) et la feuille de style. Cela a permis de modifier les processus de soumission d'annonces, le design de l'accueil et la logique d'UI sans casser les mises à jour futures du thème parent.</li>
                        <li><strong>Optimisation de la Recherche :</strong> Paramétrage et adaptation visuelle du moteur de recherche multicritères (par villes sénégalaises et catégories) et des processus de géolocalisation pour les utilisateurs.</li>
                    </ul>`,
                image: "assets/images/projet_sendiwaan.png",
                live: "http://www.sendiwaan.com", 
                git: ""
            },
            scrcpygui: {
                title: "Développement Libre: Le Tool Interface Screen-Cast (Q-T) ",
                desc: "<h4>🧰 Soutien a Communauté Q/A Analyst</h4><p>Wrappers Terminal complet (Command lines CLI Tooling  > Desktop  UI  faciles 2.0 GUI pour test Pwa Flutter).",
                image: "assets/images/projet_scrcpygui.png",
                live: "", git: "https://github.com/votre_profil"
            }
        };

        const modal = document.getElementById('project-modal');
        if(!modal) return;
        
        const closeBtn = document.querySelector('.close-modal');

        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const pj = projectDatabase[card.getAttribute('data-project')];
                if(pj) {
                    document.getElementById('modal-project-title').textContent = pj.title;
                    document.getElementById('modal-project-description').innerHTML = pj.desc; // INJECTION DE VOTRE CASE STUDY (HTML Autorisé via la BDD locale)
                    
                    document.getElementById('modal-project-main-image').src = pj.image;

                    // Condition Boutons Projets "URL Live" "GitHub Git Source code" :
                    const btnLive = document.getElementById('modal-project-live-link');
                    const btnGit = document.getElementById('modal-project-github-link');

                    btnLive.style.display = pj.live ? 'inline-flex' : 'none';
                    if (pj.live) btnLive.href = pj.live;

                    btnGit.style.display = pj.git ? 'inline-flex' : 'none';
                    if (pj.git) btnGit.href = pj.git;

                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Stop le body global sur portable : L'étude de cas scroll propre... !
                }
            });
        });

        const closeFn = () => { modal.style.display = 'none'; document.body.style.overflow = 'auto'; };
        closeBtn.addEventListener('click', closeFn);
        window.addEventListener('click', (e) => { if(e.target === modal) closeFn(); });
        document.addEventListener('keydown', (e) => { if(e.key === "Escape") closeFn(); });
    };

    /** Initialisation de la partie WhasApp de mon bout code...  */
    const setupWhatsAppForm = () => { /* gardez le précédent WhatsApp code entier si souhaité !! Le même qui formatait si brillamment :) */ }
    
    // Calls Run app !! //
    //setupMobileNav(); // Penser de copier les 2 méthodes gardés non mis dans cet abrègé ... 
    //setupScrollEffects(); ... etc !! 
    setupRevealAnimation();
    setupProjectsModal();
});
