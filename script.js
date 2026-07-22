// script.js – separate JavaScript file

document.addEventListener('DOMContentLoaded', () => {

    // ----- SCROLL REVEAL (Intersection Observer) -----
    const revealElements = document.querySelectorAll('.category-card, .location-info, .location-map');

    // add 'reveal' class to each element (if not already)
    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // optionally unobserve after reveal for performance
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    // also observe section titles? let's add a subtle reveal for titles too
    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => {
        title.classList.add('reveal');
        observer.observe(title);
    });

    // ----- SMOOTH SCROLL for nav / hero button (optional) -----
    const scrollBtn = document.querySelector('.btn-hero');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#categories');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // small extra: if any internal link with hash, smooth scroll
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