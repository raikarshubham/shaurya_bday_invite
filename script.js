// ==================== CONFETTI SYSTEM ====================
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confettiPieces = [];
const COLORS = ['#FF6B9D','#4ECDC4','#FFE66D','#51CF66','#FF9F43','#A855F7','#FF6B6B'];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Confetti {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.w = Math.random() * 10 + 5;
    this.h = Math.random() * 6 + 3;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.speed = Math.random() * 2 + 1;
    this.angle = Math.random() * Math.PI * 2;
    this.spin = (Math.random() - 0.5) * 0.1;
    this.drift = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.6 + 0.4;
  }
  update() {
    this.y += this.speed;
    this.x += this.drift;
    this.angle += this.spin;
    if (this.y > canvas.height + 20) this.reset();
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
  }
}

// Create confetti — fewer on mobile for performance
const isMobile = window.innerWidth <= 480;
const confettiCount = isMobile ? 25 : 60;
for (let i = 0; i < confettiCount; i++) {
  const c = new Confetti();
  c.y = Math.random() * canvas.height;
  confettiPieces.push(c);
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces.forEach(c => { c.update(); c.draw(); });
  requestAnimationFrame(animateConfetti);
}
animateConfetti();

// ==================== FLOATING BALLOONS/ELEMENTS ====================
const floatingContainer = document.getElementById('floating-elements');
const floatingEmojis = ['🎈','🎉','🎊','⭐','🌟','💫','🎁','🧁','🍭','🎀','❤️','💖'];

function createFloatingItem() {
  const el = document.createElement('div');
  el.classList.add('floating-item');
  el.textContent = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
  el.style.left = Math.random() * 100 + '%';
  el.style.fontSize = (Math.random() * 1.5 + 1.2) + 'rem';
  el.style.animationDuration = (Math.random() * 10 + 12) + 's';
  el.style.animationDelay = (Math.random() * 8) + 's';
  floatingContainer.appendChild(el);
  // Remove after animation
  el.addEventListener('animationend', () => el.remove());
}

// Initial batch — fewer on mobile
const floatingInitial = isMobile ? 6 : 15;
for (let i = 0; i < floatingInitial; i++) createFloatingItem();
// Keep adding
const maxFloating = isMobile ? 8 : 20;
setInterval(() => { if (floatingContainer.children.length < maxFloating) createFloatingItem(); }, isMobile ? 4000 : 2000);

// ==================== COUNTDOWN TIMER ====================
const partyDate = new Date('2026-06-10T00:00:00+05:30');

function updateCountdown() {
  const now = new Date();
  const diff = partyDate - now;

  if (diff <= 0) {
    document.querySelectorAll('.countdown-number').forEach(el => el.textContent = 'Party Time!🎉');
    document.querySelectorAll('.countdown-label').forEach(el => el.textContent = 'Be There at 7:30 PM!');
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const pad = n => String(n).padStart(2, '0');

  document.querySelector('#countdown-days .countdown-number').textContent = pad(days);
  document.querySelector('#countdown-hours .countdown-number').textContent = pad(hours);
  document.querySelector('#countdown-minutes .countdown-number').textContent = pad(minutes);
  document.querySelector('#countdown-seconds .countdown-number').textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ==================== SCROLL ANIMATIONS ====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Add animation class to elements
document.querySelectorAll(
  '.detail-card, .cartoon-item, .expect-item, .character-card, .rsvp-card, .countdown-card'
).forEach(el => {
  el.classList.add('animate-on-scroll');
  observer.observe(el);
});

// ==================== MUSIC TOGGLE (party mode) ====================
const musicBtn = document.getElementById('music-toggle');
let partyMode = false;

musicBtn.addEventListener('click', () => {
  partyMode = !partyMode;
  musicBtn.classList.toggle('active', partyMode);
  musicBtn.textContent = partyMode ? '🎶' : '🎵';

  if (partyMode) {
    // Burst of confetti
    for (let i = 0; i < 40; i++) confettiPieces.push(new Confetti());
    // More floating items
    for (let i = 0; i < 10; i++) createFloatingItem();
    document.body.style.transition = 'filter 0.5s';
  } else {
    // Return to normal amount
    while (confettiPieces.length > 60) confettiPieces.pop();
  }
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ==================== EASTER EGG: Click age number ====================
const ageNumber = document.getElementById('age-number');
if (ageNumber) {
  ageNumber.style.cursor = 'pointer';
  ageNumber.addEventListener('click', () => {
    // Burst of confetti & balloons
    for (let i = 0; i < 30; i++) confettiPieces.push(new Confetti());
    for (let i = 0; i < 8; i++) createFloatingItem();
    ageNumber.style.animation = 'none';
    void ageNumber.offsetWidth;
    ageNumber.style.animation = 'pop 0.5s ease';
  });
}

console.log('🎂 Happy 5th Birthday Shaurya! 🎉');
