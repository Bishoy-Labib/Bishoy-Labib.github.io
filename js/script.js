// ── GEARS CANVAS ANIMATION ──────────────────────────────────────────────────
function initGears() {
    const canvas = document.getElementById('gearsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const gears = [
        { cx: 130, cy: 130, r: 78, teeth: 16, color: '#c8521a', speed: 0.008, angle: 0, dir: 1 },
        { cx: 258, cy: 108, r: 50, teeth: 10, color: '#2e5c8a', speed: 0.0126, angle: 0.8, dir: -1 },
        { cx: 258, cy: 210, r: 34, teeth: 7, color: '#8c8478', speed: 0.0185, angle: 1.2, dir: 1 },
        { cx: 52, cy: 220, r: 42, teeth: 8, color: '#c8521a', speed: 0.0152, angle: 0.4, dir: -1 },
    ];
    function drawGear(g) {
        const { cx, cy, r, teeth, color, angle } = g;
        const toothH = r * 0.22;
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle);
        ctx.beginPath();
        for (let i = 0; i < teeth * 2; i++) {
            const a = (i / (teeth * 2)) * Math.PI * 2;
            const rad = (i % 2 === 0) ? r + toothH : r;
            const x = Math.cos(a) * rad, y = Math.sin(a) * rad;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath(); ctx.fillStyle = color; ctx.globalAlpha = 0.18; ctx.fill();
        ctx.globalAlpha = 1; ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath(); ctx.arc(0, 0, r * 0.72, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < 4; i++) {
            const a = (i / 4) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(Math.cos(a) * r * .072 * .25, Math.sin(a) * r * .072 * .25);
            ctx.lineTo(Math.cos(a) * r * .72 * .9, Math.sin(a) * r * .72 * .9);
            ctx.globalAlpha = 0.5; ctx.stroke(); ctx.globalAlpha = 1;
        }
        ctx.beginPath(); ctx.arc(0, 0, r * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.globalAlpha = 0.6; ctx.fill(); ctx.globalAlpha = 1;
        ctx.restore();
    }
    let animId;
    function drawFrame() {
        ctx.clearRect(0, 0, W, H);
        for (const g of gears) { g.angle += g.speed * g.dir; drawGear(g); }
        animId = requestAnimationFrame(drawFrame);
    }
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { if (!animId) drawFrame(); }
            else { cancelAnimationFrame(animId); animId = null; }
        });
    }, { threshold: 0.1 });
    const sec = canvas.closest('.gears-section');
    if (sec) obs.observe(sec);
}

// ── SCROLL REVEAL ────────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

function initReveal() {
    document.querySelectorAll('.reveal').forEach(el => {
        el.classList.remove('visible');
        revealObserver.observe(el);
    });
}

// ── CUSTOM CURSOR ─────────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
if (cursor && ring) {
    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
    });
    function animateRing() {
        rx += (mx - rx - 20) * 0.15;
        ry += (my - ry - 20) * 0.15;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
        requestAnimationFrame(animateRing);
    }
    animateRing();
    document.querySelectorAll('a, button, .project-card, .nav-links a').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
}

// ── PROJECT DETAIL TOGGLE (projects.html only) ────────────────────────────────
function showProject(pid) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-project-' + pid);
    if (target) target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showProjectsGrid() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const grid = document.getElementById('page-projects-grid');
    if (grid) grid.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── MARK ACTIVE NAV LINK per page ─────────────────────────────────────────────
(function () {
    const page = location.pathname.split('/').pop() || 'index.html';
    const map = {
        'index.html': 'nav-home',
        '': 'nav-home',
        'projects.html': 'nav-projects',
        'experience.html': 'nav-experience',
        'resume.html': 'nav-resume',
        'about.html': 'nav-about',
        'contact.html': 'nav-contact',
    };
    const id = map[page];
    if (id) {
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
    }
})();

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initGears();
});
