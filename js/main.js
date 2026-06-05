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
if (factSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                runCounters();
            }
        });
    }, { threshold: 0.3 });
    observer.observe(factSection);
}

// ---- 3. MOBILE SIDEBAR ----
const hamburger = document.getElementById('hamburger');
const mobileSidebar = document.getElementById('mobileSidebar');
const mobileOverlay = document.getElementById('mobileOverlay');
const sidebarClose = document.getElementById('sidebarClose');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        mobileSidebar.classList.add('active');
        mobileOverlay.classList.add('active');
    });
}

if (sidebarClose) {
    sidebarClose.addEventListener('click', () => {
        mobileSidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
    });
}

if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
        mobileSidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
    });
}

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

    if ($('.project-carousel').length) {
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
    }

    if ($('.member-carousel').length) {
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

        $('.prev-btn, .prev-btn-bottom').on('click', function () {
            memberOwl.trigger('prev.owl.carousel');
        });

        $('.next-btn, .next-btn-bottom').on('click', function () {
            memberOwl.trigger('next.owl.carousel');
        });
    }

    if ($('.testimonial-carousel').length) {
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
    }
});

// ---- HIDDEN BAR ----
const toggleHiddenBar = document.querySelector('.toggle-hidden-bar');
const hiddenBar = document.getElementById('hiddenBar');
const hiddenBarOverlay = document.getElementById('hiddenBarOverlay');
const hiddenBarClose = document.getElementById('hiddenBarClose');

if (toggleHiddenBar) {
    toggleHiddenBar.addEventListener('click', () => {
        hiddenBar.classList.add('active');
        hiddenBarOverlay.classList.add('active');
    });
}

if (hiddenBarClose) {
    hiddenBarClose.addEventListener('click', () => {
        hiddenBar.classList.remove('active');
        hiddenBarOverlay.classList.remove('active');
    });
}

if (hiddenBarOverlay) {
    hiddenBarOverlay.addEventListener('click', () => {
        hiddenBar.classList.remove('active');
        hiddenBarOverlay.classList.remove('active');
    });
}


// ---- LEAFLET MAP ---- khởi tạo map và thiết lập view ban đầu
const map = L.map('map', {
    scrollWheelZoom: false
}).setView([10.0480652, 105.7600721], 16);

const mapEl = document.getElementById('map');

mapEl.addEventListener('wheel', function (e) {
    if (!e.ctrlKey) {
        map.scrollWheelZoom.disable();
        mapEl.classList.add('show-scroll-hint');
        clearTimeout(mapEl._hintTimeout);
        mapEl._hintTimeout = setTimeout(() => {
            mapEl.classList.remove('show-scroll-hint');
        }, 1500);
    } else {
        map.scrollWheelZoom.enable();
    }
});

// Các lớp bản đồ
const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
});
// Lớp bản đồ vệ tinh
const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri'
});

streetLayer.addTo(map);

L.control.layers({
    'Street': streetLayer,
    'Satellite': satelliteLayer
}).addTo(map);
// Thêm marker với popup tùy chỉnh
const marker = L.marker([10.0480652, 105.7600721]).addTo(map);

marker.bindPopup(`
    <div class="map-popup">
        <div class="map-popup-header">
            <div class="map-popup-info">
                <h4>202 Đường Nguyễn Đệ</h4>
                <p>202 Đường Nguyễn Đệ,<br>Bình Thủy, Cần Thơ</p>
            </div>
            <div class="map-popup-actions">
                <a href="https://www.google.com/maps/search/?api=1&query=10.0480652,105.7600721" target="_blank" title="Xem trên Google Maps">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
                <a href="https://www.google.com/maps/dir/?api=1&destination=10.0480652,105.7600721" target="_blank" title="Chỉ đường">
                    <i class="fa-solid fa-diamond-turn-right"></i>
                </a>
            </div>
        </div>
    </div>
`, {
    closeButton: false,
    offset: [0, -10]
}).openPopup();