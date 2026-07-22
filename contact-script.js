// contact-script.js – Separate JavaScript for Contact Page

document.addEventListener('DOMContentLoaded', () => {

    // ----- PRELOADER -----
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('hide');
    });

    // ----- NAVBAR SCROLL -----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        }
        // back to top visibility
        const backBtn = document.getElementById('backToTop');
        if (backBtn) {
            backBtn.classList.toggle('visible', window.scrollY > 400);
        }
    });

    // ----- HAMBURGER -----
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.style.display === 'flex';
            navLinks.style.display = isOpen ? 'none' : 'flex';
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.style.display = 'none';
                });
            });
        });
    }

    // ----- DARK MODE -----
    const darkToggle = document.getElementById('darkModeToggle');
    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = darkToggle.querySelector('i');
            icon.className = document.body.classList.contains('dark-mode')
                ? 'fas fa-sun'
                : 'fas fa-moon';
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkToggle.querySelector('i').className = 'fas fa-sun';
        }
    }

    // ----- BACK TO TOP (floating) -----
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ----- BACK TO TOP (footer) -----
    const footerBack = document.getElementById('backToTopFooter');
    if (footerBack) {
        footerBack.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ----- CONTACT FORM -----
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');
    const submitBtn = document.getElementById('submitBtn');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const agree = document.getElementById('agree').checked;

            // Reset errors
            document.querySelectorAll('.error-msg').forEach(el => el.classList.remove('show'));

            let isValid = true;

            // Validate name
            if (!name || name.length < 2) {
                document.getElementById('nameError').classList.add('show');
                isValid = false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                document.getElementById('emailError').classList.add('show');
                isValid = false;
            }

            // Validate message
            if (!message || message.length < 10) {
                document.getElementById('messageError').classList.add('show');
                isValid = false;
            }

            if (!agree) {
                feedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please agree to the privacy policy.';
                feedback.className = 'form-feedback error';
                isValid = false;
            }

            if (!isValid) return;

            // Simulate sending
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>sending...</span><i class="fas fa-spinner fa-spin"></i>';

            setTimeout(() => {
                feedback.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! We\'ll get back to you within 24 hours. ☕';
                feedback.className = 'form-feedback success';
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>send message</span><i class="fas fa-paper-plane"></i>';
                form.reset();
                document.querySelectorAll('.error-msg').forEach(el => el.classList.remove('show'));

                // Auto-hide feedback after 6s
                setTimeout(() => {
                    feedback.className = 'form-feedback';
                    feedback.innerHTML = '';
                }, 6000);
            }, 2000);
        });

        // Real-time validation on blur
        document.getElementById('name').addEventListener('blur', function () {
            if (this.value.trim().length < 2) {
                document.getElementById('nameError').classList.add('show');
            } else {
                document.getElementById('nameError').classList.remove('show');
            }
        });

        document.getElementById('email').addEventListener('blur', function () {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.value.trim() || !regex.test(this.value.trim())) {
                document.getElementById('emailError').classList.add('show');
            } else {
                document.getElementById('emailError').classList.remove('show');
            }
        });

        document.getElementById('message').addEventListener('blur', function () {
            if (this.value.trim().length < 10) {
                document.getElementById('messageError').classList.add('show');
            } else {
                document.getElementById('messageError').classList.remove('show');
            }
        });
    }

    // ----- RESERVATION FORM -----
    const reserveForm = document.getElementById('reserveForm');
    const reserveFeedback = document.getElementById('reserveFeedback');

    if (reserveForm) {
        // Set default date to tomorrow
        const dateInput = document.getElementById('reserveDate');
        if (dateInput) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.value = tomorrow.toISOString().split('T')[0];
            dateInput.min = tomorrow.toISOString().split('T')[0];
        }

        reserveForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const date = document.getElementById('reserveDate').value;
            const time = document.getElementById('reserveTime').value;
            const guests = document.getElementById('reserveGuests').value;

            if (!date || !time || !guests) {
                reserveFeedback.textContent = '⚠️ Please fill in all fields.';
                reserveFeedback.style.color = '#ff6b6b';
                return;
            }

            reserveFeedback.textContent = '✅ Checking availability... We\'ll confirm shortly!';
            reserveFeedback.style.color = 'var(--primary-light)';
            reserveForm.reset();

            // Reset date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.value = tomorrow.toISOString().split('T')[0];

            setTimeout(() => {
                reserveFeedback.textContent = '';
            }, 4000);
        });
    }

    // ----- FAQ ACCORDION -----
    const faqData = [
        {
            q: 'What are your opening hours?',
            a: 'We are open Monday to Friday from 7:00 AM to 9:00 PM, and Saturday to Sunday from 8:00 AM to 8:00 PM.'
        },
        {
            q: 'Do you offer vegan or gluten-free options?',
            a: 'Yes! We have a variety of plant-based milks (oat, almond, soy) and gluten-free pastries available daily.'
        },
        {
            q: 'Can I reserve a table for a large group?',
            a: 'Absolutely! For groups of 6 or more, please contact us directly or use the reservation form above to check availability.'
        },
        {
            q: 'Do you have free Wi-Fi?',
            a: 'Yes, we offer complimentary high-speed Wi-Fi for all our guests. Perfect for working or studying.'
        }
    ];

    const faqGrid = document.getElementById('faqGrid');
    if (faqGrid) {
        faqData.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'faq-item reveal';
            div.style.transitionDelay = `${index * 0.1}s`;
            div.innerHTML = `
        <div class="faq-question">
          <span>${item.q}</span>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-answer">${item.a}</div>
      `;
            div.addEventListener('click', () => {
                div.classList.toggle('active');
                // Close others
                document.querySelectorAll('.faq-item').forEach(other => {
                    if (other !== div) other.classList.remove('active');
                });
            });
            faqGrid.appendChild(div);
        });
    }

    // ----- SCROLL REVEAL (Intersection Observer) -----
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ----- SMOOTH SCROLL for anchor links -----
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

    // ----- MAP INTERACTION (subtle) -----
    const mapIframe = document.querySelector('.contact-map iframe');
    if (mapIframe) {
        mapIframe.addEventListener('load', () => {
            // small delay to show map loaded
        });
    }

});