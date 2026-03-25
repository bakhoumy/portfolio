/* js/script.js */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * 1. Menu de Navigation Mobile (Menu Burger)
     */
    const setupMobileNav = () => {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            // Ouvrir / Fermer au clic sur le bouton
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                
                const icon = navToggle.querySelector('i');
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });

            // Fermer proprement la modale de menu au clic sur un lien (sur mobile)
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    if(icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                });
            });
        }
    };

    /**
     * 2. Header (Effet Vitre/Ombre) & Lien Actif en continu
     */
    const setupScrollEffects = () => {
        const header = document.querySelector('header');
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const headerHeight = header ? header.offsetHeight : 80;

        window.addEventListener('scroll', () => {
            // Effet d'ombre sur le menu quand on scrolle vers le bas
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            // Met en surbrillance le lien de menu de la section visible à l'écran
            let currentSectionId = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 50;
                if (window.pageYOffset >= sectionTop) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        });
    };

    /**
     * 3. Défilement Doux et Arrondi (Smooth Scrolling)
     */
    const setupSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                // Ignore s'il s'agit d'un lien mort avec juste "#"
                if(this.getAttribute('href') === '#') return;
                
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 80;

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight + 1,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    /**
     * 4. Effet "Fade In / Slide-up" (Apparition magique au Scroll)
     */
    const setupRevealAnimation = () => {
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Joue l'animation une seule fois par bloc
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    };

    /**
     * 5. Moteur du Pop-Up (Modal) : BASE DE DONNÉES DES ÉTUDES DE CAS
     * Injecte le format HTML complexe au moment du Clic.
     */
    const setupProjectsModal = () => {
        // Base de données structurée de vos descriptions métiers riches
        const projectDatabase = {
            mamelamp: {
                title: "SAMA QUINCAILLERIE : PWA E-commerce Marché Sénégalais",
                desc: `
                    <h4>🎯 Le Défi Métier</h4>
                    <p>Fournir aux artisans, gérants et clients d'une quincaillerie de quartier la vitesse d'une app internationale, le tout optimisé pour un marché africain (connexions instables, usage fort de WhatsApp).</p>
                    
                    <h4>💻 Ma Réponse Architecture (Front & Back)</h4>
                    <ul>
                        <li><strong>UI Mobile-First & Glassmorphism :</strong> Redéfinition intégrale de WooCommerce. Aucun thème lourd, tout est réécrit avec TailwindCSS, avec "Bento Grids" inspirées des standards UX iOS/Apple.</li>
                        <li><strong>Le "Manager Front-end" sécurisé :</strong> Contournement total de <em>wp-admin</em>. Un rôle gérant connecté sur son smartphone ajoute un produit depuis le rayon du magasin, photo incluse, en moins de 60 secondes via l'API Rest de WordPress.</li>
                        <li><strong>PWA & Résilience Offline :</strong> "Manifest JSON" natif et exploitation pointue des <em>Service Workers</em> (JavaScript). L'interface reste interactive sur un chantier dépourvu de bonne 4G car le socle tourne depuis la mise en cache de l'appareil local de l'artisan.</li>
                        <li><strong>Workflow Business 100% WhatsApp :</strong> Tout tunnel débouche sur un "panier devis" transféré par message riche sur WhatsApp (incluant prévisualisation photo), collant ainsi au véritable standard d'échange en Afrique de l'Ouest.</li>
                    </ul>`,
                image: "assets/images/projet_mamelamp.png",
                live: "https://quincaillerie-mamelamp.com/", 
                git: ""
            },
            restobi: {
                title: "RESTO BI : Application Caisse Mobile (Offline-First)",
                desc: `
                    <h4>🎯 Objectif: Émancipation de la connectivité et des serveurs</h4>
                    <p>Au Sénégal, digitaliser les fast-foods bloque sur le besoin de matériels onéreux (caisse enregistreuse bloquée) et la dépendance critique aux connexions (coupures fibre) ou coupures électriques de la Senelec.</p>
                    
                    <h4>🛠️ L'Ingénierie de la solution Flutter Mobile POS</h4>
                    <ul>
                        <li><strong>Base de Données Souveraine & Chiffrée :</strong> Opère intégralement hors-ligne avec la rapidité et le blindage de <span class="tag">SQLite + SQLCipher</span>. Les codes vendeurs sont hachés, l'application bloque financièrement l'administrateur sans corrompre les devises et caisses si la sécurité de la caisse locale a fuité.</li>
                        <li><strong>Bluetooth Low Energy & Print :</strong> Pont natif Hardware direct écrit sur mesure entre Flutter (<span class="tag">flutter_blue_plus</span>) et des imprimantes mini thermiques de poches via les envois trames (protocole POS/ESC) immédiat à chaque check-out local, sans un saut par serveur de réseau local distant et lent. </li>
                        <li><strong>Désactivation Sécuritaire B2B (Cloud License) :</strong> Utilisation d'un trigger silencieux synchronisé sur FireStore (Firebase Cloud). L'outil marche offline mais "révoque et Lock / Kill-Switch" si impayé du locataire par vérification en ligne, ou pour les besoins de rapports via l'API locale des envois rapports financiers.</li>
                    </ul>`,
                image: "assets/images/projet_restobi.png",
                live: "", 
                git: ""
            },
            toubabtp: {
                title: "Client: TOUBA BTP | Web Corporate Prestige",
                desc: `
                    <h4>🏛 Création Sur-Mesure / High-Performance / No-Builder </h4>
                    <p>Dépasser le cap esthétique attendu d'un mastodonte de la construction BTP exige un affranchissement net du cadre constructeur de "pages builders". Le devis surpasse les "clic clic", codé en sur mesure PHP et Web App Frontend natif .</p>
                    
                    <h4>🖥 UX Magiques JS & Dom optimisés Performance</h4>
                    <ul>
                        <li><strong>Structure "Theme Blank" Dev Node :</strong> Le Tailwind purgera lui même le dossier final en build : 30ko total css, un PWA site affiché la même nanoseconde au Sénégal et Google lui offre l'Award Rank Vert d'Accessibilité Desktop... Ce dev full-end maintient l'envergure "institutionnelle" SEO avec Hooks Wordpress à sécurité. </li>
                        <li><strong>L’Interactivité Prestige au click :</strong> Masonry grid visuelle / Assistant prospect au menu prédictifs / Mouvements interactifs carte ingénieurs à rendu d’angles de parallaxe  souris pseudo 3D sans chargement de grosse libraries. L'effet est magique & "Prestige de cabinet de construction pro". </li>
                        <li><strong>Personnaliser en Liberté :</strong> Je greffe mon administration API (Native Customize Api WP Tools). Et j'intègre l'audit convertisseur des projets de Devis Multi étapes 3 vues claires et net pour récolter les requêtes professionnelles en backend local .</li>
                    </ul>`,
                image: "assets/images/projet_toubabtp.png",
                live: "https://touba-btp.com/", 
                git: ""
            },
            samadaara: {
                title: "Waqf SocioTech : Sama Daara ERP Management",
                desc: `
                    <h4>📿 Progiciel Métier Desktop </h4>
                    <p>Une proposition sociologique avant tout : Fournir aux structures daaras les moyens sécuritaires modernes et logistiques administratifs complets, hors SaaS/abonnements couteux (Internet bloqué/payé/dangereux sur Data Périphérique mineure : Desktop Offline StandAlone ! ). C’est mon waqf pour sédentariser ces savoirs de traditions  (Ndiang, suivi etc.) localement .</p>
                    
                    <h4>🧠 UI PySide6 / Bidi-Algorithms Documents / Protection Offline Hardware  </h4>
                    <ul>
                        <li><strong>Dev Front/Back natifs "Framework Q-t Python" PySide : </strong> Tableaux Data Models robustes  - Export et Visualisation. Graph Dashboard (Animé), Système de Crud matricules (Profil photo local sans nuages). Themed UX mode nuit de nuit !
                        </li>
                        <li><strong>Export Documents Multi-langages complexes BIDI:</strong> Traitement Right2Left Arabic Font Support , Bi-Dictionnal Algorithm ! Gestion et Reporting des facturations de paiement sur génération document automatisé (DocumentLabs Reports natifs/ Pdf et Pillows generation de fichiers export auto avec  openpyXl Tableurs... )  </li>
                    </ul>`,
                image: "assets/images/projet_samadaara.png",
                live: "", 
                git: "https://github.com/votre_profil_ici"
            },
            sendiwaan: {
                title: "Plateforme Sendiwaan - Annonces Web Modulables",
                desc: `
                    <h4>🛒 Créer une interface Circulaire Facile</h4>
                    <p>Offrir l’éco système sénégalais des dépôts multi format et visuel ultra accessibles "Entre Pair" rapides .</p>
                    <ul>
                        <li><strong>Base robuste (FullStack web Php / ajax query):</strong> Conception Web  moderne, back validation sécure à l'ajout communautaires avec architecture filtre et moteur "Ajax localisations sénégal search local"! Optimisation native Mobile SEO et JS .</li>
                    </ul>`,
                image: "assets/images/projet_sendiwaan.png",
                live: "http://www.sendiwaan.com", 
                git: ""
            },
            scrcpygui: {
                title: "Contrib / Desktop Gui 'Devops ScrCpy' Caster . ",
                desc: `
                    <h4>🧰 Casser de la C-L-I, interface Q-a Tool.  </h4>
                    <p>Logiciel  (Py/ PyQt Ui framework open Source). Mon implication outil  d'habillage graphique qui fait sauter pour un collègue Testeurs la rude entrée par des lignes Command (Windows Linux/ shell !) sur des paramètres avancées du soft de retransmission vidéo/ USB. </p>`,
                image: "assets/images/projet_scrcpygui.png",
                live: "", 
                git: "https://github.com/votre_profil_ici"
            }
        };

        const modal = document.getElementById('project-modal');
        // Si l'élément modal n'existe pas dans le HTML, on coupe l'exécution pour ne pas créer d'erreurs
        if(!modal) return;
        
        const closeBtn = document.querySelector('.close-modal');

        // Gérer le clic sur chaque carte "Projet"
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const pjId = card.getAttribute('data-project');
                if(!pjId) return; // Si la carte n'a pas de data-project défini (par exemple les projets qui devaient ne pas avoir de modals).
                
                const pj = projectDatabase[pjId];
                if(pj) {
                    // Injection des données TEXTES ET HTML (Utilisation cruciale de innerHTML pour que l'Etude de cas garde son design bullet points h4...)
                    document.getElementById('modal-project-title').textContent = pj.title;
                    document.getElementById('modal-project-description').innerHTML = pj.desc; 
                    
                    // Image et gestion d'erreurs d'image
                    const imgElement = document.getElementById('modal-project-main-image');
                    imgElement.src = pj.image;
                    imgElement.onerror = () => imgElement.src = 'https://via.placeholder.com/800x600.png?text=Projet+en+chargement';

                    // Bouton Liens (Logique Hide/Show selon base de donneés "live" & "git")
                    const btnLive = document.getElementById('modal-project-live-link');
                    const btnGit = document.getElementById('modal-project-github-link');

                    btnLive.style.display = pj.live ? 'inline-flex' : 'none';
                    if (pj.live) btnLive.href = pj.live;

                    btnGit.style.display = pj.git ? 'inline-flex' : 'none';
                    if (pj.git) btnGit.href = pj.git;

                    // Apparition graphique Modal + Vérouillage du scroll "corp" central : le user fait défiler uniquement sa Modale Pop! (PRO FEATURE UX MOBILE) 
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Fonction centralisée pour Fermer + dé-geler le scroll principal
        const closeFn = () => { 
            modal.style.display = 'none'; 
            document.body.style.overflow = 'auto'; 
        };
        
        // Listeners sur Fermetures 
        if(closeBtn) closeBtn.addEventListener('click', closeFn);
        // Au Clic autour (En dehors) dans la pénombre Grise floue, Fermeture propre aussi. 
        window.addEventListener('click', (e) => { 
            if(e.target === modal) closeFn(); 
        });
        // Accessibilité devops claviériste PC MAC! ECHAP
        document.addEventListener('keydown', (e) => { 
            if(e.key === "Escape" && modal.style.display === 'block') closeFn(); 
        });
    };

    /**
     * 6. Formulaire "Call To Action" : LEAD CONTACT VERS WHATSAPP PRE FORMATTE 
     */
    const setupWhatsAppForm = () => {
        const sendBtn = document.getElementById('sendWhatsAppBtn');
        
        if(sendBtn) {
            sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const clientNameInput = document.getElementById('fullName');
                const clientContextInput = document.getElementById('companyRole');
                const clientMessageInput = document.getElementById('message');
                
                // .trim supprime les espaces vides entrées dangeureux par le User
                const nom = clientNameInput ? clientNameInput.value.trim() : "";
                const contexte = clientContextInput ? clientContextInput.value.trim() : "";
                const msg = clientMessageInput ? clientMessageInput.value.trim() : "";

                // Empêche le client d'appeler Whatsapp Vide "A blanc"! UX Alerte
                if(nom === "" || msg === "") {
                    if(clientNameInput) clientNameInput.style.border = nom === "" ? "2px solid #ef4444" : "";
                    if(clientMessageInput) clientMessageInput.style.border = msg === "" ? "2px solid #ef4444" : "";
                    alert("Afin de m'identifier votre besoin avant que nous discutions : Prénom / Message Court obligatoires .");
                    return;
                }
                
                // Reprendre le standard si les validations ont repris OK et étaient corrigés (enlevées frontale alarme red ui CSS !)
                if(clientNameInput) clientNameInput.style.border = "";
                if(clientMessageInput) clientMessageInput.style.border = "";

                // VOTRE NUM WHATSAPP OFFICIEL SÉNÉGAL PRE RENTRÉ 
                const myWappNumber = "221786056914"; 

                // Bold markup (Mettre un asterisque collé : *texte* met de la gras visuelle forte sur WhatsApp du receiver mobile . Design "Agence !" 
                const preformattedText = `Demande d'Audit Développement Web / Application Logiciel 🎯\n\n*🙎‍♂️ Contexte Client:* ${nom} - ${contexte || "Prive / Dirigeant d'entité"}\n\n*📋 Notes ou Description Soumise via PortFolio :*\n"${msg}"\n\n_(Le portfolio Web de Bakhoum vous transmets cette demande - répondez selon visibilitée des calendriers.. !)_`;
                
                window.open(`https://wa.me/${myWappNumber}?text=${encodeURIComponent(preformattedText)}`, '_blank');
                
                // Effets UX Final = Après click the open "on Nettoie ses trace saisie locale pour les puristes sécurité locale :P  !!
                if(clientNameInput) clientNameInput.value = '';
                if(clientContextInput) clientContextInput.value = '';
                if(clientMessageInput) clientMessageInput.value = '';
            });
        }
    };

    // ============================================
    // Initialisation Générale au Chargement Page /  APP LOGIC BOOT / RUN CALL ... 
    // ============================================
    setupMobileNav();
    setupScrollEffects();
    setupSmoothScrolling();
    setupRevealAnimation();
    setupProjectsModal();
    setupWhatsAppForm();

});
