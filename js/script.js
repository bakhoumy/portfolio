/* js/script.js */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * 1. Menu de Navigation Mobile (Menu Burger)
     */
    const setupMobileNav = () => {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
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

            // Fermer proprement au clic sur mobile
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
     * 2. Header en Effet Vitre & Lien Actif en continu
     */
    const setupScrollEffects = () => {
        const header = document.querySelector('header');
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const headerHeight = header ? header.offsetHeight : 80;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

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
     * 3. Défilement natif aux sections Doux et Arrondi
     */
    const setupSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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
     * 4. Effet "Fade In / Slide-up" très propre des composants
     */
    const setupRevealAnimation = () => {
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); 
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
     * 5. Bouton Audit/Devis express redirigeant à votre WhatsApp + Formatage de la lead
     */
    const setupWhatsAppForm = () => {
        const sendBtn = document.getElementById('sendWhatsAppBtn');
        
        if(sendBtn) {
            sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const clientNameInput = document.getElementById('fullName');
                const clientContextInput = document.getElementById('companyRole');
                const clientMessageInput = document.getElementById('message');
                
                const nom = clientNameInput ? clientNameInput.value.trim() : "";
                const contexte = clientContextInput ? clientContextInput.value.trim() : "";
                const msg = clientMessageInput ? clientMessageInput.value.trim() : "";

                if(nom === "" || msg === "") {
                    if(clientNameInput) clientNameInput.style.border = nom === "" ? "1px solid red" : "";
                    if(clientMessageInput) clientMessageInput.style.border = msg === "" ? "1px solid red" : "";
                    alert("Afin d'ouvrir mon terminal Whatsapp en toute politesse, un prénom et le contexte initial (vitrine / e-com) du besoin IT est indispensable :)");
                    return;
                }
                
                if(clientNameInput) clientNameInput.style.border = "";
                if(clientMessageInput) clientMessageInput.style.border = "";

                const myWappNumber = "221786056914"; 

                // Bolded list markup WhatsApp natif : "*mot*" devient du gras.
                const preformattedText = `Demande Web & Architecture 🎯\n\n*🙎‍♂️ Client / Structure:* ${nom} - ${contexte || "Indéfini"}\n\n*📋 État actuel et requête:*\n"${msg}"\n\n_(Avertissement automatisé depuis votre plateforme portfolio PWA. Je vous contacte très rapidement)_`;
                
                window.open(`https://wa.me/${myWappNumber}?text=${encodeURIComponent(preformattedText)}`, '_blank');
                
                // Clear state UI form if user tabs back directly after browser opens W-A
                clientNameInput.value = '';
                if(clientContextInput) clientContextInput.value = '';
                clientMessageInput.value = '';
            });
        }
    };

    setupMobileNav();
    setupScrollEffects();
    setupSmoothScrolling();
    setupRevealAnimation();
    setupWhatsAppForm();

});
