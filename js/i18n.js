/**
 * i18n.js — Portfolio Internationalization Engine
 * Handles EN/DE language switching for bishoy-labib.github.io
 * Usage: loaded on every page. Reads data-i18n attributes to inject text.
 */

const I18N = (() => {
    const STORAGE_KEY = 'portfolio-lang';
    const DATA_DIR = '/data/'; // absolute from root; project pages use ../data/
    let _t = null; // current translations object
    let _lang = 'en';

    // ── Detect base path so JSON loads correctly from /projects/ sub-pages ──
    function _dataBase() {
        return window.location.pathname.includes('/projects/') ? '../data/' : 'data/';
    }

    // ── Detect preferred language ──
    function _detectLang() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'en' || stored === 'de') return stored;
        return (navigator.language || 'en').toLowerCase().startsWith('de') ? 'de' : 'en';
    }

    // ── Fetch JSON and init page ──
    async function _load(lang) {
        const base = _dataBase();
        const url = `${base}content.${lang}.json`;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            _t = await res.json();
            _lang = lang;
            localStorage.setItem(STORAGE_KEY, lang);
            _applyAll();
            _updateSwitcher();
            document.documentElement.lang = lang;
        } catch (e) {
            console.error('[i18n] Failed to load', url, e);
        }
    }

    // ── Apply all translations to DOM ──
    function _applyAll() {
        if (!_t) return;
        _applyNav();
        _applyFooter();
        _applyDataAttrs(); // generic data-i18n fallback

        // Page-specific renderers
        const body = document.body;
        if (body.classList.contains('page-index')) _renderIndex();
        if (body.classList.contains('page-projects')) _renderProjects();
        if (body.classList.contains('page-experience')) _renderExperience();
        if (body.classList.contains('page-about')) _renderAbout();
        if (body.classList.contains('page-resume')) _renderResume();
        if (body.classList.contains('page-contact')) _renderContact();
        if (body.classList.contains('page-project')) _renderProjectDetail();
    }

    // ── Generic attribute-based replacements ──
    function _applyDataAttrs() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = _resolve(key);
            if (val !== undefined) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = val;
                } else {
                    el.innerHTML = val;
                }
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const val = _resolve(el.getAttribute('data-i18n-placeholder'));
            if (val !== undefined) el.placeholder = val;
        });
    }

    // ── Resolve dotted key path in _t ──
    function _resolve(path) {
        return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), _t);
    }

    // ── Nav ──
    function _applyNav() {
        const n = _t.nav;
        _setText('#nav-home', n.home);
        _setText('#nav-projects', n.projects);
        _setText('#nav-experience', n.experience);
        _setText('#nav-resume', n.resume);
        _setText('#nav-about', n.about);
        _setText('#nav-contact', n.contact);
    }

    // ── Footer ──
    function _applyFooter() {
        const f = _t.footer;
        const fp = document.querySelector('footer > p');
        if (fp) fp.innerHTML = f.copy;
    }

    // ── Index page ──
    function _renderIndex() {
        const ix = _t.index;
        _setHTML('.hero-tag', `<div class="hero-tag-dot"></div>${ix.heroTag}`);
        _setText('.hero-title', ix.heroTitle);
        _setText('.hero-desc', ix.heroDesc);
        _setHTML('[href="projects.html"].btn-primary', ix.heroBtnProjects);
        _setHTML('[href="contact.html"].btn-outline', ix.heroBtnContact);
        _setText('.chip-status .chip-label', ix.chipStatus);
        _setText('.chip-status .chip-value', `<span class="chip-dot"></span>${ix.chipStatusValue}`);
        _setText('.chip-location .chip-label', ix.chipLocation);
        _setText('.chip-location .chip-value', ix.chipLocationValue);

        // Strengths & Weaknesses
        _setText('.sw-card.strengths .sw-title', ix.swStrengthsTitle);
        _renderList('.sw-card.strengths .sw-list', ix.swStrengths, '<div class="sw-bullet"></div>');
        _setText('.sw-card.weaknesses .sw-title', ix.swWeaknessesTitle);
        _renderList('.sw-card.weaknesses .sw-list', ix.swWeaknesses, '<div class="sw-bullet"></div>');

        // Skill cards
        const skillCards = document.querySelectorAll('.skill-card');
        ix.skills.forEach((s, i) => {
            if (!skillCards[i]) return;
            skillCards[i].querySelector('.skill-card-icon').textContent = s.icon;
            skillCards[i].querySelector('.skill-card-title').textContent = s.title;
            const tagsEl = skillCards[i].querySelector('.skill-tags');
            if (tagsEl) tagsEl.innerHTML = s.tags.map(t => `<span class="skill-tag">${t}</span>`).join('');
        });

        // Experience teaser
        const expCards = document.querySelectorAll('.exp-teaser-card');
        ix.expItems.forEach((e, i) => {
            if (!expCards[i]) return;
            expCards[i].querySelector('.exp-role').textContent = e.role;
            expCards[i].querySelector('.exp-company').textContent = e.company;
            expCards[i].querySelector('.exp-date').textContent = e.date;
            expCards[i].querySelector('.exp-desc').textContent = e.desc;
            const tagsEl = expCards[i].querySelector('.exp-tags');
            if (tagsEl) tagsEl.innerHTML = e.tags.map(t => `<span class="exp-tag">${t}</span>`).join('');
        });

        // About teaser
        const at = document.querySelector('.about-teaser-text');
        if (at) {
            const ps = at.querySelectorAll('p');
            if (ps[0]) ps[0].innerHTML = ix.aboutP1;
            if (ps[1]) ps[1].innerHTML = ix.aboutP2;
            const btn = at.querySelector('.btn-primary');
            if (btn) btn.innerHTML = ix.aboutBtn;
        }
    }

    // ── Projects page — full JS render ──
    function _renderProjects() {
        const pp = _t.projects_page;
        _setText('.projects-eyebrow', pp.eyebrow);
        _setHTML('.projects-title', pp.title);
        _setText('.projects-desc', pp.desc);

        const grid = document.getElementById('projectsGrid');
        if (!grid) return;
        grid.innerHTML = '';

        _t.projects.forEach((p, idx) => {
            const delay = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'][idx % 4];
            const tagsHtml = p.cardTags.map(t => `<span class="project-tag">${t}</span>`).join('');
            const card = document.createElement('div');
            card.className = `project-card reveal ${delay}`;
            card.innerHTML = `
        <div class="project-card-header">
          <div class="project-tags">${tagsHtml}</div>
          <div class="project-year">${p.date}</div>
        </div>
        <h3 class="project-card-title">${p.title}</h3>
        <p class="project-card-desc">${p.cardDesc}</p>
        <a class="project-card-link" href="projects/${p.file}">${pp.viewDetails}</a>
      `;
            grid.appendChild(card);
        });
    }

    // ── Experience page ──
    function _renderExperience() {
        const ep = _t.experience_page;
        _setText('.exp-eyebrow', ep.eyebrow);
        _setHTML('.exp-title', ep.title);
        _setText('.exp-desc', ep.desc);
        _setText('.work-label', ep.workLabel);
        _setText('.edu-label', ep.educationLabel);
        _setText('.gears-eyebrow', ep.gearsEyebrow);
        _setHTML('.gears-title', ep.gearsTitle);
        _setText('.gears-desc', ep.gearsDesc);

        const tlItems = document.querySelectorAll('.timeline-item');
        ep.workItems.forEach((w, i) => {
            if (!tlItems[i]) return;
            tlItems[i].querySelector('.tl-date').textContent = w.date;
            tlItems[i].querySelector('.tl-role').textContent = w.role;
            tlItems[i].querySelector('.tl-company').textContent = w.company;
            tlItems[i].querySelector('.tl-desc').textContent = w.desc;
            const tagsEl = tlItems[i].querySelector('.tl-tags');
            if (tagsEl) tagsEl.innerHTML = w.tags.map(t => `<span class="tl-tag">${t}</span>`).join('');
        });

        const eduCards = document.querySelectorAll('.edu-card');
        ep.eduItems.forEach((e, i) => {
            if (!eduCards[i]) return;
            eduCards[i].querySelector('.edu-icon-box').textContent = e.icon;
            eduCards[i].querySelector('.edu-degree').textContent = e.degree;
            eduCards[i].querySelector('.edu-school').textContent = e.school;
            eduCards[i].querySelector('.edu-year').textContent = e.year;
            const badge = eduCards[i].querySelector('.edu-badge');
            if (badge && e.badge) badge.textContent = e.badge;
            const desc = eduCards[i].querySelector('p');
            if (desc) desc.textContent = e.desc;
        });
    }

    // ── About page ──
    function _renderAbout() {
        const ap = _t.about_page;
        _setHTML('.about-hero h2', ap.heroTitle);
        const ps = document.querySelectorAll('.about-hero > div > p');
        if (ps[0]) ps[0].innerHTML = ap.heroP1;
        if (ps[1]) ps[1].innerHTML = ap.heroP2;
        if (ps[2]) ps[2].innerHTML = ap.heroP3;

        const valueCards = document.querySelectorAll('.value-card');
        ap.values.forEach((v, i) => {
            if (!valueCards[i]) return;
            valueCards[i].querySelector('.value-title').textContent = v.title;
            valueCards[i].querySelector('.value-desc').textContent = v.desc;
        });

        _setText('.langs-eyebrow', ap.langsEyebrow);
        const langCards = document.querySelectorAll('.lang-card');
        ap.langs.forEach((l, i) => {
            if (!langCards[i]) return;
            langCards[i].querySelector('.lang-name').textContent = l.name;
            langCards[i].querySelector('.lang-level').textContent = l.level;
            const fill = langCards[i].querySelector('.lang-bar-fill');
            if (fill) fill.style.width = l.pct + '%';
        });

        _setText('.awards-eyebrow', ap.awardsEyebrow);
        const awardCards = document.querySelectorAll('.award-card');
        ap.awards.forEach((a, i) => {
            if (!awardCards[i]) return;
            awardCards[i].querySelector('.award-icon').textContent = a.icon;
            awardCards[i].querySelector('.award-title').textContent = a.title;
            awardCards[i].querySelector('.award-desc').textContent = a.desc;
        });
    }

    // ── Resume page ──
    function _renderResume() {
        const rp = _t.resume_page;
        _setText('.resume-eyebrow', rp.eyebrow);
        _setHTML('.resume-title', rp.title);
        _setText('.resume-desc', rp.desc);
        _setText('.resume-download-left h3', rp.cvTitle);
        _setText('.resume-download-left p', rp.cvMeta);
        const btn = document.querySelector('.resume-download-bar .btn-primary');
        if (btn) btn.textContent = rp.downloadBtn;
    }

    // ── Contact page ──
    function _renderContact() {
        const cp = _t.contact_page;
        _setText('.contact-form-card h3', cp.formTitle);
        _setText('.contact-form-card > p', cp.formDesc);
        _setHTML('.contact-big-text', cp.bigText);
        _setText('.contact-sub', cp.subText);

        const labels = document.querySelectorAll('.contact-form-card .form-label');
        const inputs = document.querySelectorAll('.contact-form-card .form-input, .contact-form-card .form-textarea');
        const labelKeys = ['labelName', 'labelEmail', 'labelSubject', 'labelMessage'];
        const phKeys = ['placeholderName', 'placeholderEmail', 'placeholderSubject', 'placeholderMessage'];
        labels.forEach((l, i) => { if (cp[labelKeys[i]]) l.textContent = cp[labelKeys[i]]; });
        inputs.forEach((inp, i) => { if (cp[phKeys[i]]) inp.placeholder = cp[phKeys[i]]; });

        const sendBtn = document.querySelector('.contact-form-card button[type="submit"]');
        if (sendBtn) sendBtn.textContent = cp.sendBtn;

        // Contact link rows
        const rows = document.querySelectorAll('.contact-link-row');
        const rowKeys = ['linkEmail', 'linkPhone', 'linkLinkedIn', 'linkGitHub', 'linkPortfolio'];
        rows.forEach((r, i) => {
            const lbl = r.querySelector('.contact-link-label');
            if (lbl && cp[rowKeys[i]]) lbl.textContent = cp[rowKeys[i]];
        });
    }

    // ── Project detail page ──
    function _renderProjectDetail() {
        const ui = _t.project_ui;
        _setHTML('.back-btn', ui.backBtn);

        // Identify which project this page is via body data-project-id
        const pid = document.body.getAttribute('data-project-id');
        if (!pid) return;
        const proj = _t.projects.find(p => p.id === pid);
        if (!proj) return;

        // Hero tags + title
        _setText('h1', proj.h1);
        const heroTagsEl = document.querySelector('.project-detail-hero .project-tags');
        if (heroTagsEl) {
            const dateTint = `background:rgba(255,255,255,.15);color:#fff;`;
            heroTagsEl.innerHTML =
                proj.heroTags.map(t => `<span class="project-tag">${t}</span>`).join('') +
                `<span class="project-tag" style="${dateTint}">${proj.date}</span>`;
        }

        // Overview
        _setHTML('.project-detail-main > h2:first-of-type', proj.overviewH2);
        const overviewP = document.querySelector('.project-overview-text');
        if (overviewP) overviewP.innerHTML = proj.overview;

        // Bullets
        const bulletsH2 = document.querySelector('.project-bullets-h2');
        if (bulletsH2) bulletsH2.innerHTML = proj.bulletsH2;
        const bulletsList = document.querySelector('.project-bullets');
        if (bulletsList) {
            bulletsList.innerHTML = proj.bullets.map(b => `<li>${b}</li>`).join('');
        }

        // Tech Stack card - update h3 heading with date
        const tsH3 = document.querySelector('.sidebar-card.tech-stack-card h3');
        if (tsH3) tsH3.textContent = `${ui.techStackLabel} · ${proj.date}`;

        // Tech stack tags
        const tsTagsEl = document.querySelector('.sidebar-card.tech-stack-card .sidebar-tags');
        if (tsTagsEl && proj.techStack) {
            tsTagsEl.innerHTML = proj.techStack.map(t => `<span class="project-tag">${t}</span>`).join('');
        }

        // Discuss button
        const discussBtn = document.querySelector('.sidebar-discuss-btn');
        if (discussBtn) discussBtn.textContent = ui.discussBtn;
    }

    // ── Helpers ──
    function _setText(sel, val) {
        const el = document.querySelector(sel);
        if (el && val !== undefined) el.textContent = val;
    }
    function _setHTML(sel, val) {
        const el = document.querySelector(sel);
        if (el && val !== undefined) el.innerHTML = val;
    }
    function _renderList(sel, items, prefix = '') {
        const el = document.querySelector(sel);
        if (!el) return;
        el.innerHTML = items.map(item => `<li>${prefix}${item}</li>`).join('');
    }

    // ── Switcher UI update ──
    function _updateSwitcher() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('lang-btn-active', btn.getAttribute('data-lang') === _lang);
        });
    }

    // ── Public API ──
    return {
        init() {
            _lang = _detectLang();
            _load(_lang);
        },
        setLang(lang) {
            if (lang !== 'en' && lang !== 'de') return;
            _load(lang);
        },
        get lang() { return _lang; },
        get t() { return _t; }
    };
})();

// Auto-initialise once DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => I18N.init());
} else {
    I18N.init();
}

// Expose globally for switcher buttons
window.setLang = (lang) => I18N.setLang(lang);
