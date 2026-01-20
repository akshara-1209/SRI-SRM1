// ===============================
// NAVBAR SCROLL EFFECT
// ===============================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===============================
// SMOOTH SCROLL
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===============================
// COPY PHONE NUMBER
// ===============================
function copyPhoneToClipboard(phoneNumber) {
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');

    navigator.clipboard.writeText(cleanNumber)
        .then(() => showNotification('Phone number copied to clipboard!'))
        .catch(() => showNotification('Failed to copy number'));
}

// ===============================
// NOTIFICATION
// ===============================
function showNotification(message) {
    const existing = document.querySelector('.copy-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {

    // ===============================
    // CLICKABLE PHONE NUMBERS
    // ===============================
    document.querySelectorAll('.clickable-phone').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const phoneNumber = this.getAttribute('data-phone') || this.textContent.trim();
            copyPhoneToClipboard(phoneNumber);

            setTimeout(() => {
                window.location.href = `tel:${phoneNumber.replace(/[^\d+]/g, '')}`;
            }, 500);
        });
    });

    // ===============================
    // WHATSAPP POPUP (5 TIMES)
    // ===============================
    const whatsappIcon = document.querySelector('.whatsapp-icon');
    let popupCount = 0;

    if (whatsappIcon) {
        const popupInterval = setInterval(() => {
            whatsappIcon.style.animation = 'popupBounce 0.6s ease-in-out';

            setTimeout(() => {
                whatsappIcon.style.animation = 'none';
            }, 600);

            popupCount++;
            if (popupCount === 5) clearInterval(popupInterval);
        }, 1200);
    }

    // ===============================
    // MOBILE MENU
    // ===============================
    const menuBtn = document.querySelector('.mobile-menu');
    const dropdown = document.querySelector('.mobile-dropdown');

    if (menuBtn && dropdown) {
        menuBtn.addEventListener('click', () => {
            dropdown.classList.toggle('show');
        });
    }
});

// ===============================
// INTERSECTION OBSERVER
// ===============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .contact-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===============================
// ✅ SERVICES IMAGE SLIDER (FINAL)
// ===============================
const images = document.querySelectorAll('.gallery-image');
let currentIndex = 0;

if (images.length > 0) {
    images[0].classList.add('active');

    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 3000);
}
