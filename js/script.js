/* js/script.js */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * 1. Menu de Navigation Mobile
     * Gère l'ouverture et la fermeture du menu "Hamburger"
     */
    const setupMobileNav = () => {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                
                // Change l'icône (Menu burger vers Croix)
                const icon = navToggle.querySelector('i');
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });

            // Ferme le menu de manière fluide au clic sur un lien
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.querySelector('i').classList.remove('fa-times');
                    navToggle.querySelector('i').classList.add('fa-bars');
                });
            });
        }
    };

    /**
     * 2. Effets au défilement (Scrollspy & Header Glass)
     */
    const setupScrollEffects = () => {
        const header = document.querySelector('header');
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const headerHeight = header ? header.offsetHeight : 80;

        window.addEventListener('scroll', () => {
            // Ajout de l'ombre portée (Premium Shadow) quand on quitte le haut de page
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            // Met à jour le lien "actif" du menu en fonction de la section visible
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
     * 3. Défilement fluide des Ancres (Smooth Scroll)
     */
    const setupSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                // Ignore s'il s'agit d'un lien mort avec juste "#"
                if(this.getAttribute('href') === '#') return;
                
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                const headerHeight = document.querySelector('header').offsetHeight;

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
     * 4. Animations Reveal "Apparition au Scroll"
     * L'effet haut de gamme déclenché via l'IntersectionObserver de manière très optimisée.
     */
    const setupRevealAnimation = () => {
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Exécute l'animation une seule fois
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Déclenche quand 15% de la carte est visible
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    };

    /**
     * 5. Gestion de la BDD Projets et des Fenêtres Modales Dynamiques
     */
    const setupProjectsModal = () => {
        // "Base de Données" locale (Ajustée et Finalisée)
        const projectDatabase = {
            toubabtp: {
                title: "Touba BTP Sénégal",
                desc: "Développement intégral Front & Back sur un cœur WordPress pour assurer une flexibilité maximale au client. Template visuel conçu 100% sur-mesure (sans thèmes préfaits) intégrant une galerie fluide de leurs lourds chantiers de construction. Un design institutionnel valorisant l'expertise locale du BTP.",
                image: "assets/images/projet_toubabtp.png",
                live: "https://touba-btp.com/", 
                git: ""
            },
            mamelamp: {
                title: "Mame Lamp Quincaillerie PWA",
                desc: "Intégration d'un écosystème WooCommerce adapté en Progressive Web App (PWA). Résultat direct : l'acheteur peut 'installer' la plateforme comme une App depuis son navigateur, consulter hors-ligne pour faire ses choix sur chantier et commander. Extrêmement véloce.",
                image: "assets/images/projet_mamelamp.png",
                live: "https://quincaillerie-mamelamp.com/", 
                git: ""
            },
            restobi: {
                title: "POS App Flutter : 'Resto Bi'",
                desc: "Caisse de restauration Point-Of-Sale (POS). Ce logiciel Flutter tourne en cuisine et au comptoir, synchronisant les nouveaux tickets. Optimisation forte de l'Expérience Utilisateur pour supprimer la marge d'erreur des serveurs dans le tumulte des heures de pointe (Dark-Mode intuitif, validation en 2 taps).",
                image: "assets/images/projet_restobi.png",
                live: "", 
                git: "" 
            },
            sendiwaan: {
                title: "Plateforme Sendiwaan.com",
                desc: "Architecture Web pensée pour l'économie solidaire. Le défi technique : concevoir un back-office autorisant la dépose multi-images sécurisée et gratuite pour tout type d'objets, couplée à un moteur de tri par régions au Sénégal. (Développement WordPress Avancé/PHP).",
                image: "assets/images/projet_sendiwaan.png",
                live: "http://www.sendiwaan.com", 
                git: ""
            },
            samadaara: {
                title: "Sama Daara Logiciel Gestion",
                desc: "Un progiciel offline lourd développé en Python / PySide6. J'y apporte le regard de sociologue : interface respectant la transmission traditionnelle 'Ndiang' mais numérisant proprement la facturation, l'historique scolaire, le tout sans rendre les maîtres dépendants des baisses réseaux 4G.",
                image: "assets/images/projet_samadaara.png",
                live: "", 
                git: "https://github.com/votre_profil" // Remplacer par Github
            },
            scrcpygui: {
                title: "Interface Android Dev Tools",
                desc: "Logiciel technique pur : en tant que développeur Python, j'ai wrappé sous GUI le redoutable projet cli scrcpy, très usité pour refléter l'écran d'un Android. Outil pensé 'par le dev, pour les devs et Q/A testers'.",
                image: "assets/images/projet_scrcpygui.png",
                live: "", 
                git: "https://github.com/votre_profil"
            }
        };

        const modal = document.getElementById('project-modal');
        const modalTitle = document.getElementById('modal-project-title');
        const modalDesc = document.getElementById('modal-project-description');
        const modalImage = document.getElementById('modal-project-main-image');
        const liveBtn = document.getElementById('modal-project-live-link');
        const gitBtn = document.getElementById('modal-project-github-link');
        const closeBtn = document.querySelector('.close-modal');

        if(modal && closeBtn) {
            // Ouverture des projets au Clic
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('click', () => {
                    const projetId = card.getAttribute('data-project');
                    const projetInfo = projectDatabase[projetId];
                    
                    if(projetInfo) {
                        modalTitle.textContent = projetInfo.title;
                        modalDesc.textContent = projetInfo.desc;
                        modalImage.src = projetInfo.image;
                        modalImage.onerror = () => modalImage.src = 'https://via.placeholder.com/800x600.png?text=Projet+en+chargement';

                        // Apparition conditionnelle des boutons d'actions
                        liveBtn.style.display = (projetInfo.live !== "") ? 'inline-flex' : 'none';
                        if (projetInfo.live) liveBtn.href = projetInfo.live;

                        gitBtn.style.display = (projetInfo.git !== "") ? 'inline-flex' : 'none';
                        if (projetInfo.git) gitBtn.href = projetInfo.git;

                        modal.style.display = 'block';
                        document.body.style.overflow = 'hidden'; // Stoppe le scroll de fond
                    }
                });
            });

            // Fonctions de fermeture de Modal très poussées 
            const closeModalFn = () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Rétablit le scroll global
            };

            closeBtn.addEventListener('click', closeModalFn);
            
            // Ferme en cliquant à l'extérieur de la modale blanche
            window.addEventListener('click', (e) => { 
                if(e.target === modal) closeModalFn(); 
            });

            // Ferme via la touche Echap (Détail "Pro" !!)
            document.addEventListener('keydown', (e) => {
                if(e.key === "Escape" && modal.style.display === "block") {
                    closeModalFn();
                }
            });
        }
    };

    /**
     * 6. Formulaire Sécurisé d'Envoi via l'API WhatsApp
     */
    const setupWhatsAppForm = () => {
        const sendBtn = document.getElementById('sendWhatsAppBtn');
        
        if(sendBtn) {
            sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const clientNameInput = document.getElementById('fullName');
                const clientContextInput = document.getElementById('companyRole');
                const clientMessageInput = document.getElementById('message');
                
                // Récupération sécurisée et trim
                const nom = clientNameInput ? clientNameInput.value.trim() : "";
                const contexte = clientContextInput ? clientContextInput.value.trim() : "";
                const msg = clientMessageInput ? clientMessageInput.value.trim() : "";

                // Form Validation minimaliste (UX respectueuse)
                if(nom === "" || msg === "") {
                    // Indication visuelle très légère si la validation échoue
                    if(clientNameInput) clientNameInput.style.border = nom === "" ? "1px solid red" : "";
                    if(clientMessageInput) clientMessageInput.style.border = msg === "" ? "1px solid red" : "";
                    alert("Afin que je puisse vous identifier rapidement, le Nom et un court Message sont obligatoires.");
                    return;
                }
                
                // Réinitialise l'apparence des inputs si on a essayé sans les bons éléments avant
                if(clientNameInput) clientNameInput.style.border = "";
                if(clientMessageInput) clientMessageInput.style.border = "";

                // Votre numéro international de dev WhatsApp 
                const myWappNumber = "221786056914"; 

                // Mise en page soignée, supporte le bold syntax via markdown `*Texte*` de Whatsapp.
                const preformattedText = `Nouveau lead (Portfolio Web)\n\n*🙎‍♂️ Prénom/Nom :* ${nom}\n*🏢 Structure / Contexte :* ${contexte || "Particulier"}\n\n*📋 Détails du besoin :*\n"${msg}"`;
                
                // Envoi à WhatsApp
                window.open(`https://wa.me/${myWappNumber}?text=${encodeURIComponent(preformattedText)}`, '_blank');
                
                // UX: vider le formulaire local par sécurité / effet 'formulaire envoyé'
                clientNameInput.value = '';
                if(clientContextInput) clientContextInput.value = '';
                clientMessageInput.value = '';
            });
        }
    };

    // ============================================
    // Initialisation & Orchestration 
    // ============================================
    setupMobileNav();
    setupScrollEffects();
    setupSmoothScrolling();
    setupRevealAnimation();
    setupProjectsModal();
    setupWhatsAppForm();

});
