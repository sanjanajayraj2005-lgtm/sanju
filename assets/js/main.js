document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Active Navigation Link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Certificate Modal Logic
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("img01");
    const certImages = document.querySelectorAll('.cert-card img');
    const closeBtn = document.getElementsByClassName("close")[0];

    if (modal && certImages.length > 0) {
        certImages.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = "block";
                modalImg.src = this.src;
                // Add simple fade in animation to modal
                modal.animate([
                    { opacity: 0 },
                    { opacity: 1 }
                ], {
                    duration: 300,
                    fill: 'forwards'
                });
            });
        });

        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.animate([
                    { opacity: 1 },
                    { opacity: 0 }
                ], {
                    duration: 200,
                    fill: 'forwards'
                }).onfinish = () => modal.style.display = "none";
            }
        }

        // Close on outside click
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.animate([
                    { opacity: 1 },
                    { opacity: 0 }
                ], {
                    duration: 200,
                    fill: 'forwards'
                }).onfinish = () => modal.style.display = "none";
            }
        }
    }
});
