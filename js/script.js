// js/script.js

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Gère l'ouverture et la fermeture du menu de navigation mobile.
     */
    const setupMobileNav = () => {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            // Ferme le menu lorsque l'on clique sur un lien
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });
        }
    };

    /**
     * Gère les effets liés au défilement de la page :
     * 1. Ajout d'une ombre au header.
     * 2. Mise à jour du lien actif dans la navigation.
     */
    const setupScrollEffects = () => {
        const header = document.querySelector('header');
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const headerHeight = header ? header.offsetHeight : 80;

        window.addEventListener('scroll', () => {
            // 1. Ombre du header
            if (window.scrollY > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            // 2. Lien actif
            let currentSectionId = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 50;
                if (window.pageYOffset >= sectionTop) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(currentSectionId)) {
                    link.classList.add('active');
                }
            });
        });
    };

    /**
     * Gère le défilement fluide vers les ancres.
     */
    const setupSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                const headerHeight = document.querySelector('header').offsetHeight;

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    /**
     * Gère l'animation d'apparition des éléments au défilement
     * en utilisant l'API IntersectionObserver pour de meilleures performances.
     */
    const setupRevealAnimation = () => {
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Optionnel: n'anime qu'une seule fois
                }
            });
        }, {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% de l'élément doit être visible
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    };


    // Initialisation de toutes les fonctionnalités
    setupMobileNav();
    setupScrollEffects();
    setupSmoothScrolling();
    setupRevealAnimation();
});