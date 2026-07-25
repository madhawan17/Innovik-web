/* ==========================================
   INNOVIK 6.0 JAVASCRIPT LOGIC
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------
    // 0. Theme Toggle (Light / Dark)
    // --------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        document.body.classList.add('light-theme');
        if (themeIcon) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    } else {
        document.body.classList.remove('light-theme');
        if (themeIcon) {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            if (themeIcon) {
                if (isLight) {
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                } else {
                    themeIcon.classList.replace('fa-sun', 'fa-moon');
                }
            }
        });
    }

    // --------------------------------------
    // 1. Mobile Menu Toggle
    // --------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            mobileToggle.setAttribute('aria-expanded', isOpen);
            
            // Hamburger animation
            const bars = mobileToggle.querySelectorAll('.bar');
            if (isOpen) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', false);
                const bars = mobileToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // --------------------------------------
    // 2. Countdown Timer
    // --------------------------------------
    // Target Date: September 15, 2026, 11:30 AM (Indore local time, UTC+5:30)
    // We parse it in UTC-equivalent or create standard Date object
    const targetDate = new Date('2026-09-15T11:30:00+05:30').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownTimerEl = document.getElementById('countdown-timer');

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(timerInterval);
            if (countdownTimerEl) {
                countdownTimerEl.innerHTML = '<div style="font-size: 1.5rem; font-weight: 700; color: var(--secondary); letter-spacing: 0.05em; padding: 10px 0;">HACKATHON IS LIVE!</div>';
            }
            return;
        }

        const msPerSecond = 1000;
        const msPerMinute = msPerSecond * 60;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;

        const days = Math.floor(difference / msPerDay);
        const hours = Math.floor((difference % msPerDay) / msPerHour);
        const minutes = Math.floor((difference % msPerHour) / msPerMinute);
        const seconds = Math.floor((difference % msPerMinute) / msPerSecond);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Run immediately and update every second
    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);

    // --------------------------------------
    // 3. Scroll Progress & Back to Top
    // --------------------------------------
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Progress Bar
        if (scrollProgress && docHeight > 0) {
            const pct = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = `${pct}%`;
        }

        // Back to Top Button
        if (backToTopBtn) {
            if (scrollTop > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --------------------------------------
    // 4. Problem Statements Stacked Carousel (Gallery Stack)
    // --------------------------------------
    const problemsDeck = document.getElementById('problems-deck');
    const allProblemCards = Array.from(document.querySelectorAll('.problems-deck .problem-card'));
    const btnPrev = document.getElementById('carousel-prev');
    const btnNext = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('indicator-dots');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let filteredCards = [...allProblemCards];
    let activeIndex = 0;

    function renderStack() {
        allProblemCards.forEach(card => {
            // Clean classes
            card.classList.remove('active-card', 'stack-card-1', 'stack-card-2', 'hidden-card', 'swipe-left', 'swipe-right');
            card.style.display = 'none'; // hide by default
        });

        filteredCards.forEach((card, index) => {
            card.style.display = 'flex'; // show only filtered cards

            if (index === activeIndex) {
                card.classList.add('active-card');
            } else if (index === activeIndex + 1) {
                card.classList.add('stack-card-1');
            } else if (index === activeIndex + 2) {
                card.classList.add('stack-card-2');
            } else if (index > activeIndex + 2) {
                card.classList.add('hidden-card');
            } else if (index < activeIndex) {
                card.classList.add('swipe-left');
            }
        });

        // Toggle control button availability
        if (btnPrev) btnPrev.style.opacity = activeIndex === 0 ? '0.3' : '1';
        if (btnNext) btnNext.style.opacity = activeIndex === filteredCards.length - 1 ? '0.3' : '1';

        // Render Dots
        renderDots();
    }

    function renderDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        
        filteredCards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === activeIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                activeIndex = index;
                renderStack();
            });
            dotsContainer.appendChild(dot);
        });
    }

    // Next/Prev Listeners
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            if (activeIndex < filteredCards.length - 1) {
                // Swipe animation trigger
                const currentCard = filteredCards[activeIndex];
                currentCard.classList.add('swipe-left');
                
                setTimeout(() => {
                    activeIndex++;
                    renderStack();
                }, 150); // slight delay for animation feel
            }
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            if (activeIndex > 0) {
                activeIndex--;
                renderStack();
            }
        });
    }

    // Filter Buttons Interaction
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Re-filter cards
            filteredCards = allProblemCards.filter(card => {
                const categoriesAttr = card.getAttribute('data-categories') || '';
                const categories = categoriesAttr.split(' ');
                return filterValue === 'all' || categories.includes(filterValue);
            });

            // Reset active index
            activeIndex = 0;
            renderStack();
        });
    });

    // Initialize stack on load
    renderStack();

    // --------------------------------------
    // 5. Schedule Tabs Switcher
    // --------------------------------------
    const tabButtons = document.querySelectorAll('.tab-btn');
    const timelines = document.querySelectorAll('.timeline');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Set active button
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle timelines
            timelines.forEach(timeline => {
                const id = timeline.getAttribute('id');
                if (id === `${targetTab}-timeline`) {
                    timeline.style.display = 'flex';
                    setTimeout(() => {
                        timeline.style.opacity = '1';
                    }, 50);
                } else {
                    timeline.style.opacity = '0';
                    timeline.style.display = 'none';
                }
            });
        });
    });

    // --------------------------------------
    // 6. Navigation Link Intersection Observer
    // --------------------------------------
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies center third
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // --------------------------------------
    // 7. Leadership Testimonial Carousel & Modal
    // --------------------------------------
    const testiTrack = document.getElementById('testimonial-carousel-track');
    const btnTestiPrev = document.getElementById('testi-prev');
    const btnTestiNext = document.getElementById('testi-next');
    const retroCards = document.querySelectorAll('.retro-card');
    
    const leaderModal = document.getElementById('leader-modal');
    const leaderBackdrop = document.getElementById('leader-modal-backdrop');
    const leaderCloseBtn = document.getElementById('leader-modal-close');
    
    const modalName = document.getElementById('modal-name');
    const modalDesignation = document.getElementById('modal-designation');
    const modalDesc = document.getElementById('modal-desc');

    // Horizontal Scroll behavior
    if (testiTrack) {
        if (btnTestiPrev) {
            btnTestiPrev.addEventListener('click', () => {
                testiTrack.scrollBy({ left: -320, behavior: 'smooth' });
            });
        }
        if (btnTestiNext) {
            btnTestiNext.addEventListener('click', () => {
                testiTrack.scrollBy({ left: 320, behavior: 'smooth' });
            });
        }
    }

    // Modal behavior
    let lastScrollY = 0;

    function openLeaderModal(card) {
        const name = card.getAttribute('data-name');
        const designation = card.getAttribute('data-designation');
        const desc = card.getAttribute('data-desc');

        if (modalName) modalName.textContent = name;
        if (modalDesignation) modalDesignation.textContent = designation;
        if (modalDesc) modalDesc.textContent = desc;

        if (leaderModal) {
            leaderModal.classList.add('show');
            leaderModal.setAttribute('aria-hidden', 'false');
        }

        // Lock background scroll (disabling body scrolling while modal is active)
        lastScrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${lastScrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
    }

    function closeLeaderModal() {
        if (leaderModal) {
            leaderModal.classList.remove('show');
            leaderModal.setAttribute('aria-hidden', 'true');
        }

        // Restore background scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo({ top: lastScrollY, behavior: 'instant' });
    }

    // Add click listeners to cards
    retroCards.forEach(card => {
        card.addEventListener('click', () => openLeaderModal(card));
    });

    // Close listeners
    if (leaderCloseBtn) {
        leaderCloseBtn.addEventListener('click', closeLeaderModal);
    }
    if (leaderBackdrop) {
        leaderBackdrop.addEventListener('click', closeLeaderModal);
    }

    // Keyboard escape close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && leaderModal && leaderModal.classList.contains('show')) {
            closeLeaderModal();
        }
    });
});
