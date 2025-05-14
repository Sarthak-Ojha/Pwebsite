document.addEventListener('DOMContentLoaded', () => {
    // ===== Mobile Navigation Toggle =====
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    menuToggle?.addEventListener('click', () => {
        nav?.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav?.classList.remove('active');
        });
    });

    // ===== Active Navigation on Scroll =====
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.id;
            }
        });

        navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
        });

        // Back to top button visibility
        backToTopButton?.classList.toggle('visible', scrollY > 300);
    });

    // ===== Back to Top =====
    const backToTopButton = document.getElementById('backToTop');
    backToTopButton?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== Project Image Modal =====
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    document.querySelectorAll('.project-img img').forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImg.src = img.src;
        });
    });

    modal?.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // ===== Scroll Reveal Animations =====
    // Convert NodeLists to Arrays for fade-in and slide-in elements
    const fadeInElements = Array.from(document.querySelectorAll('.hero-content h1, .hero-content p, .hero-roles, .hero-cta, .section-header, .about-text p, .project-card'));
    const slideInElements = Array.from(document.querySelectorAll('.info-item, .social-link'));

    // Add animation classes
    [...fadeInElements, ...slideInElements].forEach((el, index) => {
        const animationClass = fadeInElements.includes(el) ? 'animate-fadeIn' : 'animate-slideIn';
        el.classList.add(animationClass, `delay-${(index % 5 + 1) * 100}`);
        el.style.opacity = '0';
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-fadeIn, .animate-slideIn').forEach(el => observer.observe(el));


    // ===== Parallax Background in Hero Section =====
    const heroSection = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        if (heroSection && window.scrollY < window.innerHeight) {
            heroSection.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
        }
    });

    // ===== Hover Effect on Project Cards =====
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 22px 45px -12px rgba(0, 0, 0, 0.25)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '';
        });
    });

    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Automatically set the current year in the footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
// Scroll-triggered animations using GSAP
 window.addEventListener('scroll', () => {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight) {
            // Start GSAP animation when the element enters the viewport
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
            });
        }
    });
 });

});