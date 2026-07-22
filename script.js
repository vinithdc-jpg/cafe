// script.js – advanced interactions

document.addEventListener('DOMContentLoaded', () => {

    // ----- PRELOADER -----
    window.addEventListener('load', () => {
        document.getElementById('preloader').classList.add('hide');
    });

    // ----- NAVBAR SCROLL EFFECT + ACTIVE LINK -----
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // toggle scrolled class
        navbar.classList.toggle('scrolled', window.scrollY > 60);

        // active link update
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ----- HAMBURGER (mobile menu) -----
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');

    hamburger.addEventListener('click', () => {
        const isOpen = navLinksContainer.style.display === 'flex';
        navLinksContainer.style.display = isOpen ? 'none' : 'flex';
        navCta.style.display = isOpen ? 'none' : 'flex';
        // close on link click (mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.style.display = 'none';
                navCta.style.display = 'none';
            });
        });
    });

    // ----- POPULATE CATEGORIES (dynamic with 3D hover) -----
    const categoryData = [
        { icon: 'fa-mug-hot', name: 'Espresso', desc: 'Rich, bold, and full of character — the heart of every coffee.' },
        { icon: 'fa-coffee', name: 'Latte', desc: 'Smooth steamed milk meets intense espresso, topped with art.' },
        { icon: 'fa-cup-togo', name: 'Cold Brew', desc: 'Slow-steeped for 12 hours, served chilled for a refreshing kick.' },
        { icon: 'fa-mug-saucer', name: 'Cappuccino', desc: 'Equal parts espresso, steamed milk, and velvety foam.' },
    ];

    const grid = document.getElementById('categoryGrid');
    grid.innerHTML = '';
    categoryData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'category-card reveal';
        card.style.transitionDelay = `${index * 0.15}s`;
        card.innerHTML = `
      <div class="card-icon"><i class="fas ${item.icon}"></i></div>
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <div class="card-hover-effect"></div>
    `;
        // 3D tilt effect on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 8;
            const rotateY = ((x - centerX) / centerX) * 8;
            card.style.transform = `perspective(800px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
        });
        grid.appendChild(card);
    });

    // ----- SCROLL REVEAL (Intersection Observer) -----
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ----- PARTICLE SYSTEM (hero) -----
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1});
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 20 + 15}s infinite alternate ease-in-out;
        animation-delay: ${Math.random() * 5}s;
        pointer-events: none;
      `;
            particleContainer.appendChild(particle);
        }
    }

    // inject keyframes for particles (dynamic)
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
    @keyframes floatParticle {
      0% { transform: translate(0, 0) scale(1); opacity: 0.2; }
      100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}30px, ${Math.random() > 0.5 ? '' : '-'}40px) scale(1.4); opacity: 0.8; }
    }
  `;
    document.head.appendChild(styleSheet);

    // ----- SMOOTH SCROLL FOR ALL ANCHOR LINKS -----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ----- PARALLAX QUOTE (enhance with subtle mouse move) -----
    const quoteSection = document.querySelector('.parallax-quote');
    if (quoteSection) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 6;
            const y = (e.clientY / window.innerHeight - 0.5) * 6;
            quoteSection.querySelector('.quote-content').style.transform =
                `translate(${x}px, ${y}px)`;
        });
    }

    // add 'reveal' to section titles and other elements
    document.querySelectorAll('.section-title, .section-sub, .tag, .hero-badge, .hero-stats, .info-card, .social-row, .location-map')
        .forEach(el => el.classList.add('reveal'));

    // re-observe newly added reveals
    document.querySelectorAll('.reveal:not(.active)').forEach(el => observer.observe(el));

});