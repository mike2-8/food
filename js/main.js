// ---- 1. HEADER SCROLL ----
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// ---- 2. Hiệu ứng counter ----
const counters = document.querySelectorAll('.count-text');
let counted = false;

function runCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-stop'));
        const speed = parseInt(counter.getAttribute('data-speed'));
        const step = target / (speed / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

const factSection = document.querySelector('.fun-fact-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
            counted = true;
            runCounters();
        }
    });
}, { threshold: 0.3 });

observer.observe(factSection);

// ---- 3. MOBILE SIDEBAR ----
const hamburger = document.getElementById('hamburger');
const mobileSidebar = document.getElementById('mobileSidebar');
const mobileOverlay = document.getElementById('mobileOverlay');
const sidebarClose = document.getElementById('sidebarClose');

hamburger.addEventListener('click', () => {
    mobileSidebar.classList.add('active');
    mobileOverlay.classList.add('active');
});

sidebarClose.addEventListener('click', () => {
    mobileSidebar.classList.remove('active');
    mobileOverlay.classList.remove('active');
});

mobileOverlay.addEventListener('click', () => {
    mobileSidebar.classList.remove('active');
    mobileOverlay.classList.remove('active');
});

document.querySelectorAll('.sidebar-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const submenu = link.nextElementSibling;
        if (submenu) {
            submenu.classList.toggle('open');
        }
    });
});

// ---- 4 & 5. OWL CAROUSEL ----
$(document).ready(function () {

    // Project carousel
    $('.project-carousel').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        dots: true,
        autoplay: false,
        responsive: {
            0: { items: 1 },
            576: { items: 2 },
            992: { items: 3 },
            1204: { items: 4 }
        }
    });

    // Member carousel
    var memberOwl = $('.member-carousel').owlCarousel({
        loop: false,
        margin: 20,
        nav: false,
        dots: false,
        autoplay: false,
        items: 1,
        responsive: {
    
            576: { items: 2 },
            992: { items: 3 }
        }
    });

    // Nút mũi tên desktop và mobile
    $('.prev-btn, .prev-btn-bottom').on('click', function () {
        memberOwl.trigger('prev.owl.carousel');
    });

    $('.next-btn, .next-btn-bottom').on('click', function () {
        memberOwl.trigger('next.owl.carousel');
    });

});

// Testimonial carousel
$('.testimonial-carousel').owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    dots: true,
    autoplay: false,
    responsive: {
        0: { items: 1 },
        992: { items: 2 }    
    }
});