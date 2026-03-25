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
     * 4. Effet "Fade In / Slide-up" (Apparition au Scroll)
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
     * Injecte le format HTML complexe au moment du Clic sur une carte.
     */
    const setupProjectsModal = () => {
        
        const projectDatabase = {
            mamelamp: {
                title: "QUINCAILLERIE MAME LAMP : PWA E-commerce",
                desc: `
                    <h4>🎯 Le Défi Métier</h4>
                    <p>Fournir aux artisans, gérants et clients d'une quincaillerie de quartier la vitesse d'une app internationale, le tout optimisé pour un marché africain (connexions instables, usage fort de WhatsApp).</p>
                    
                    <h4>💻 Ma Réponse Architecture (Front & Back)</h4>
                    <ul>
                        <li><strong>UI Mobile-First & Glassmorphism :</strong> Redéfinition intégrale de WooCommerce. Aucun thème lourd, tout est réécrit avec TailwindCSS, avec "Bento Grids" inspirées des standards UX iOS/Apple.</li>
                        <li><strong>Le "Manager Front-end" sécurisé :</strong> Contournement total de <em>wp-admin</em>. Un rôle gérant connecté sur son smartphone ajoute un produit depuis le rayon du magasin, photo incluse, en moins de 60 secondes via l'API Rest de WordPress.</li>
                        <li><strong>PWA & Résilience Offline :</strong> "Manifest JSON" natif et exploitation pointue des <em>Service Workers</em> (JavaScript). L'interface reste interactive sur un chantier dépourvu de bonne 4G car le socle tourne depuis la mise en cache de l'appareil local de l'artisan.</li>
                        <li><strong>Workflow Business WhatsApp :</strong> Tout tunnel débouche sur un "panier devis" transféré par message riche sur WhatsApp (incluant prévisualisation photo), collant au véritable standard d'échange commercial.</li>
                    </ul>`,
                image: "assets/images/projet_mamelamp.png",
                live: "https://quincaillerie-mamelamp.com/", 
                git: ""
            },
            restobi: {
                title: "RESTO BI : App Mobile Caisse (Offline-First)",
                desc: `
                    <h4>🎯 Objectif: Émancipation Serveur / Connexion</h4>
                    <p>Au Sénégal, digitaliser les fast-foods bloque sur le besoin de matériels onéreux et la dépendance critique aux connexions ou coupures électriques de la Senelec.</p>
                    
                    <h4>🛠️ L'Ingénierie de la solution Flutter</h4>
                    <ul>
                        <li><strong>Base de Données Souveraine & Chiffrée :</strong> Opère intégralement hors-ligne avec la rapidité et le blindage de <span class="tag">SQLite + SQLCipher</span>. L'application sécurise financièrement le propriétaire sans corrompre la comptabilité même si la sécurité locale a fuité.</li>
                        <li><strong>Bluetooth Low Energy & Print :</strong> Pont natif Hardware écrit sur mesure entre Flutter (<span class="tag">flutter_blue_plus</span>) et des imprimantes mini thermiques via les trames directes (ESC/POS) au check-out, sans saut par serveur distant. </li>
                        <li><strong>Désactivation Sécuritaire B2B (Cloud License) :</strong> Utilisation d'un trigger silencieux synchronisé sur FireStore (Firebase). L'outil marche offline mais autorise le concepteur à faire un "Kill-Switch" s'il y a défaut d'abonnement du locataire lors d'une connexion au wifi.</li>
                    </ul>`,
                image: "assets/images/projet_restobi.png",
                live: "", 
                git: ""
            },
            toubabtp: {
                title: "Client: TOUBA BTP | Web Corporate Prestige",
                desc: `
                    <h4>🏛 Création Sur-Mesure / No-Builder</h4>
                    <p>Dépasser le cap esthétique attendu d'un mastodonte de la construction BTP exige un affranchissement net du cadre des constructeurs génériques (Zéro Elementor).</p>
                    
                    <h4>🖥 UX Magique JS & Optimisation des Performances</h4>
                    <ul>
                        <li><strong>Structure "Theme Blank" Dev Node :</strong> Code purgé par Tailwind, produisant un fichier CSS infime de ~30ko. Résultat : une plateforme vitrine ultra performante qui passe en "Rank Vert" chez Google sur la vitesse d'affichage Mobile au Sénégal. </li>
                        <li><strong>L’Interactivité Prestige au click :</strong> Masonry grid visuelle, assistants prospects prédictifs (Chatbot IA locale), et mouvements interactifs de cartes pseudo 3D survolent une structure très solide, ancrant un réel statut de Cabinet de construction pro. </li>
                        <li><strong>Administration Autonome :</strong> Greffe du <em>Customizer API</em> natif de WordPress afin que le client B2B puisse changer l'ensemble de ses textes/images d'un bloc vitrine de chantiers ou les devis interactifs à 3 étapes.</li>
                    </ul>`,
                image: "assets/images/projet_toubabtp.png",
                live: "https://touba-btp.com/", 
                git: ""
            },
            samadaara: {
                title: "Waqf SocioTech : Sama Daara",
                desc: `
                    <h4>📿 Progiciel Métier Desktop </h4>
                    <p>Une démarche de sociologue pour l'informatique : Fournir aux structures des daaras les moyens sécuritaires modernes et logistiques hors abonnements Cloud/SaaS couteux (Protection de la donnée sur le PC physique non relié internet).</p>
                    
                    <h4>🧠 UI PySide6 / Bidi-Algorithms Documents</h4>
                    <ul>
                        <li><strong>Développement Natif "Framework Qt Python" PySide6 : </strong> Modélisations robustes en Tableaux de Données de bases SQLIte. Visualisations graphiques, Systèmes d'archives "crud", Génération de certificats avec le "Dark/Light mode".
                        </li>
                        <li><strong>Export Documents Multi-langages complexes (BiDi):</strong> Traitement en <em>Right-2-Left</em> et prise en compte parfaite de polices Arabe libres (Amiri). Report PDF automatisé des relevés scolaires ou financiers, croisé sur export auto "openPyxl" pour les analyses comptables excel des Daaras.</li>
                    </ul>`,
                image: "assets/images/projet_samadaara.png",
                live: "", 
                git: "https://github.com/votre_profil_ici"
            },
            sendiwaan: {
                title: "Sendiwaan - Plateforme de Petites Annonces Locales",
                desc: `
                    <h4>🛒 Le Marché de l'Économie Circulaire</h4>
                    <p>La mission était de déployer une plateforme C-to-C (entre particuliers) 100% gratuite, pour encourager le don, le troc et l'économie locale au Sénégal via une interface accessible à tous.</p>
                    
                    <h4>💻 Approche Agile : "Child Theme" & Surcharge WP</h4>
                    <ul>
                        <li><strong>Choix Technologique Stratégique :</strong> Pour répondre aux exigences fonctionnelles complexes (gestion des comptes, sécurité images) sans exploser les budgets ou les délais de mise en route, nous avons intégré un thème premium ultra-performant servant de moteur de Base de données (Custom Post Types des annonces).</li>
                        <li><strong>Développement en Thème Enfant (Child Theme) :</strong> Pour modéliser notre "cahier des charges", j'ai agi techniquement en tant que développeur sur le Thème Enfant. Sur-couches, réécritures partielles de fichiers sources PHP / modifications des queries Front-end CSS/JS sans jamais endommager les patchs ou mises à jours noyau imposées au constructeur mère !</li>
                        <li><strong>Optimisation Locale de Recherche :</strong> Adaptation poussée d'algorithme AJAX/Querying, classant toutes villes, villages Sénégalais (parc/tri croisés) sur filtre dynamique réactif côté interface utilisateur .</li>
                    </ul>`,
                image: "assets/images/projet_sendiwaan.png",
                live: "http://www.sendiwaan.com", 
                git: ""
            },
            scrcpygui: {
                title: "Tool UI Développeur: Android 'Scrcpy' Caster",
                desc: `
                    <h4>🧰 Facilitateur Visuel sur environnement CMD CLI</h4>
                    <p>Création UI (interface) en environnement libre PyQt de configuration logicielle permettant aux testeurs AQ mobile une utilisation ludique visuelle des lignes redoutables sous powershells ou shells (réduction du format, frames max, bypass et mirroring).  </p>`,
                image: "assets/images/projet_scrcpygui.png",
                live: "", 
                git: "https://github.com/votre_profil_ici"
            }
        };

        const modal = document.getElementById('project-modal');
        if(!modal) return;
        
        const closeBtn = document.querySelector('.close-modal');

        // Écouter le Clic sur les cartes projets
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const pjId = card.getAttribute('data-project');
                if(!pjId) return; 
                
                const pj = projectDatabase[pjId];
                if(pj) {
                    // Injecte dynamiquement Titres et Études structurées (.innerHTML préserve vos listes UL/LI !!)
                    document.getElementById('modal-project-title').textContent = pj.title;
                    document.getElementById('modal-project-description').innerHTML = pj.desc; 
                    
                    // Affectation d'Images (+ Sécurité Fallback Image Placeholder)
                    const imgElement = document.getElementById('modal-project-main-image');
                    imgElement.src = pj.image;
                    imgElement.onerror = () => imgElement.src = 'https://via.placeholder.com/800x600.png?text=En+Attente+Screenshot';

                    // Condition d'Affichage ou dissimulation pour les "Liens Live" / "Lien Source Code GitHub" 
                    const btnLive = document.getElementById('modal-project-live-link');
                    const btnGit = document.getElementById('modal-project-github-link');

                    btnLive.style.display = pj.live ? 'inline-flex' : 'none';
                    if (pj.live) btnLive.href = pj.live;

                    btnGit.style.display = pj.git ? 'inline-flex' : 'none';
                    if (pj.git) btnGit.href = pj.git;

                    // Activation Physique/UX  du Modale 
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // L'Anti Scrolling en dessous activé (L'arriere Plan est Fixe pour Scroll la seule popup etanche !)
                }
            });
        });

        // La Fonction pour Clore la lecture
        const closeFn = () => { 
            modal.style.display = 'none'; 
            document.body.style.overflow = 'auto'; // Render / Restoration normalisée Body CSS global (Overflowing Allowed Again.)
        };
        
        // Multiples cas des fermetures gérés intelligements...
        if(closeBtn) closeBtn.addEventListener('click', closeFn); // Sur CROIX Haut 
        window.addEventListener('click', (e) => { 
            if(e.target === modal) closeFn(); // Aux Clique ombragés (En extérieux/Blur dark backgrounds.)
        });
        document.addEventListener('keydown', (e) => { 
            if(e.key === "Escape" && modal.style.display === 'block') closeFn(); // Par appuie simple ESC clavier Hard-ware Keyboard Mac/WIN..
        });
    };

    /**
     * 6. Formulaire d'Audit: Transformation Direct-To-WhatsApp avec Text Formating et Leads Securité Client : !  
     */
    const setupWhatsAppForm = () => {
        const sendBtn = document.getElementById('sendWhatsAppBtn');
        
        if(sendBtn) {
            sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const clientNameInput = document.getElementById('fullName');
                const clientContextInput = document.getElementById('companyRole');
                const clientMessageInput = document.getElementById('message');
                
                // Extraction saine et rognure chaine whitespace frontaux arrieres
                const nom = clientNameInput ? clientNameInput.value.trim() : "";
                const contexte = clientContextInput ? clientContextInput.value.trim() : "";
                const msg = clientMessageInput ? clientMessageInput.value.trim() : "";

                // Intercepter l'émetteur a cliquage Fou Ou Test vide !: (Alarme border rouges inputs incriminants visée native CSS Native DOM ). 
                if(nom === "" || msg === "") {
                    if(clientNameInput) clientNameInput.style.border = nom === "" ? "2px solid #ef4444" : "";
                    if(clientMessageInput) clientMessageInput.style.border = msg === "" ? "2px solid #ef4444" : "";
                    alert("Requise Identité / Et demande avant génération du flux réseau sortants svp.");
                    return;
                }
                
                // Repurges "Correctif Rouge css Borders Alarming Si ok on Envois clean !" 
                if(clientNameInput) clientNameInput.style.border = "";
                if(clientMessageInput) clientMessageInput.style.border = "";

                // LIGNES CLES DE REDIRECT APP ! // 
                const myWappNumber = "221786056914"; // Target Lead 

                // Encode Component string and Add "*"  To WhatsApp Font text native strong bolds for PRO Design text output UI :
                const preformattedText = `📝 Demande Audit Dev_Logiciel_SN\n\n*🙎‍♂️ Contexte Client/Nom :* ${nom} / ${contexte || "(Prive)"}\n\n*📌 Réquisitions Notes Import :*\n"${msg}"\n\n_(Transférée Via Architecture Web B2b Bakhoum Y.. )_`;
                
                window.open(`https://wa.me/${myWappNumber}?text=${encodeURIComponent(preformattedText)}`, '_blank');
                
                // Securité Flush Post envoi : Vide ses champs si clients back a TAB navigateurs de WhatsApp Local :...
                if(clientNameInput) clientNameInput.value = '';
                if(clientContextInput) clientContextInput.value = '';
                if(clientMessageInput) clientMessageInput.value = '';
            });
        }
    };

    // ============================================
    // Initialisation APP SEQUENCE
    // ============================================
    setupMobileNav();
    setupScrollEffects();
    setupSmoothScrolling();
    setupRevealAnimation();
    setupProjectsModal();
    setupWhatsAppForm();

});
