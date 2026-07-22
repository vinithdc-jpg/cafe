// script.js – full functionality

document.addEventListener('DOMContentLoaded', () => {

    // ----- PRELOADER -----
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('hide');
    });

    // ----- NAVBAR SCROLL + ACTIVE LINK -----
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        }
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}` || href === `index.html#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ----- HAMBURGER -----
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinksContainer.style.display === 'flex';
            navLinksContainer.style.display = isOpen ? 'none' : 'flex';
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinksContainer.style.display = 'none';
                });
            });
        });
    }

    // ----- DARK MODE TOGGLE -----
    const darkToggle = document.getElementById('darkModeToggle');
    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = darkToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        // load preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkToggle.querySelector('i').className = 'fas fa-sun';
        }
    }

    // ----- BACK TO TOP -----
    const backBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backBtn.classList.add('visible');
        } else {
            backBtn.classList.remove('visible');
        }
    });
    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ----- POPULATE CATEGORIES -----
    const categoryData = [
        { icon: 'fa-mug-hot', name: 'Espresso', desc: 'Rich, bold, and full of character — the heart of every coffee.' },
        { icon: 'fa-coffee', name: 'Latte', desc: 'Smooth steamed milk meets intense espresso, topped with art.' },
        { icon: 'fa-cup-togo', name: 'Cold Brew', desc: 'Slow-steeped for 12 hours, served chilled for a refreshing kick.' },
        { icon: 'fa-mug-saucer', name: 'Cappuccino', desc: 'Equal parts espresso, steamed milk, and velvety foam.' },
    ];

    const grid = document.getElementById('categoryGrid');
    if (grid) {
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
            // 3D tilt
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
    }

    // ----- TESTIMONIALS -----
    const testimonials = [
        { text: "Absolutely love the atmosphere and the coffee. The latte art is stunning and the staff are so welcoming!", author: "— Sarah M." },
        { text: "Best cold brew in town. I come here every morning and it never disappoints. Highly recommend the Bloom Blend.", author: "— James K." },
        { text: "A hidden gem! The pastries are fresh, the coffee is exceptional, and the wifi is fast. Perfect for working remotely.", author: "— Emily R." },
    ];

    const track = document.getElementById('testimonialTrack');
    const dotsContainer = document.getElementById('sliderDots');
    let currentSlide = 0;
    let slideInterval;

    if (track) {
        testimonials.forEach((t, i) => {
            const item = document.createElement('div');
            item.className = 'testimonial-item';
            item.innerHTML = `
        <i class="fas fa-quote-right"></i>
        <blockquote>${t.text}</blockquote>
        <div class="author">${t.author}</div>
      `;
            track.appendChild(item);

            const dot = document.createElement('button');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.dataset.index = i;
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        function goToSlide(index) {
            const items = track.children;
            if (index < 0) index = items.length - 1;
            if (index >= items.length) index = 0;
            currentSlide = index;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            document.querySelectorAll('.dot').forEach((d, i) => {
                d.classList.toggle('active', i === currentSlide);
            });
        }

        document.getElementById('prevTestimonial')?.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
            resetInterval();
        });
        document.getElementById('nextTestimonial')?.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
            resetInterval();
        });

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
        }
        slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    }

    // ----- GALLERY -----
    const galleryImages = [
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=500&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=500&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=500&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=500&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=500&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1462917882517-e150004895fa?q=80&w=500&auto=format&fit=crop',
    ];

    const galleryGrid = document.getElementById('galleryGrid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    if (galleryGrid) {
        galleryImages.forEach((src) => {
            const item = document.createElement('div');
            item.className = 'gallery-item reveal';
            item.innerHTML = `
        <img src="${src}" alt="Gallery" loading="lazy" />
        <div class="overlay"><i class="fas fa-expand"></i></div>
      `;
            item.addEventListener('click', () => {
                lightbox.classList.add('open');
                lightboxImg.src = src;
            });
            galleryGrid.appendChild(item);
        });
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('open');
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') lightbox.classList.remove('open');
        });
    }

    // ----- COUNTDOWN TIMER (7 days from now) -----
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 7);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate.getTime() - now;
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ----- NEWSLETTER -----
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterFeedback = document.getElementById('newsletterFeedback');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            if (input.value.trim()) {
                newsletterFeedback.textContent = '✅ Thanks for subscribing!';
                newsletterFeedback.style.color = '#4caf50';
                input.value = '';
                setTimeout(() => { newsletterFeedback.textContent = ''; }, 3000);
            }
        });
    }

    // ----- SCROLL REVEAL (Observer) -----
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ----- PARTICLES (hero) -----
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
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
      @keyframes floatParticle {
        0% { transform: translate(0, 0) scale(1); opacity: 0.2; }
        100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}30px, ${Math.random() > 0.5 ? '' : '-'}40px) scale(1.4); opacity: 0.8; }
      }
    `;
        document.head.appendChild(styleSheet);
    }

    // ----- SMOOTH SCROLL for anchors -----
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

});