/* ═══════════════════════════════════════════════════════════
   Mpilo Mankazana — Portfolio Script
   ═══════════════════════════════════════════════════════════ */

/* ─── Nav mobile ─── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ─── Skill data ─── */
const SKILLS = {
  python: {
    icon:'🐍', name:'Python', subtitle:'Core & Advanced OOP',
    proficiency:80, level:'Advanced',
    tags:['Python 3','OOP','Functional Patterns','Data Structures','File I/O','REST APIs'],
    desc:'Primary language at WeThinkCode_. Proficient in object-oriented design, algorithm implementation, and backend service development. Applied in projects involving authorization logic, database interactions, and data processing pipelines.'
  },
  java: {
    icon:'☕', name:'Java', subtitle:'Object-Oriented Programming & Systems Design',
    proficiency:68, level:'Proficient',
    tags:['Java SE','OOP','Systems Analysis & Design','Software Testing & Debugging','Collections API'],
    desc:'Built through formal Year 1 coursework in Object-Oriented Programming and Systems Analysis & Design at WeThinkCode_. Comfortable applying core OOP principles — encapsulation, inheritance, polymorphism — to structured application design, and experienced in systematic testing and debugging to ensure code correctness.'
  },
  swmath: {
    icon:'📐', name:'Mathematics & Analytics', subtitle:'Software Engineering Mathematics',
    proficiency:72, level:'Proficient',
    tags:['Calculus','Linear Programming','Exponents & Logarithms','Statistics & Probability','Algebra'],
    desc:'Strong foundation built through Software Engineering Mathematics coursework, spanning calculus, linear programming, exponents and logarithms, and statistics and probability. This analytical grounding underpins algorithm analysis, performance reasoning, and data-driven decision-making across engineering projects.'
  },
  sql: {
    icon:'🗄️', name:'SQL & Relational Databases', subtitle:'SQLite · Schema Design · Backend Integration',
    proficiency:70, level:'Proficient',
    tags:['SQL','SQLite','Schema Design','JOINs','Indexing','Query Optimisation'],
    desc:'Hands-on experience designing and querying relational databases. Built backend systems with SQLite for authentication and data persistence. Comfortable with schema normalisation, foreign key constraints, and writing optimised queries for application backends.'
  },
  finance: {
    icon:'📊', name:'Financial & Business Analytics', subtitle:'BCom Business Informatics — UNISA',
    proficiency:65, level:'Proficient',
    tags:['Financial Maths','Business Analytics','Economics','Data Interpretation','Forecasting'],
    desc:'Academic grounding in financial modelling, economic theory, and business data analysis through BCom studies at UNISA. Applies analytical thinking to bridge technical development with business outcome measurement and strategic decision support.'
  },
  azure: {
    icon:'☁️', name:'Azure AI Foundations', subtitle:'Microsoft Azure · Cloud · AI Services',
    proficiency:50, level:'Intermediate',
    tags:['Azure AI','Cognitive Services','ML Concepts','Cloud Fundamentals','Azure Portal'],
    desc:'Foundational knowledge of Microsoft Azure AI services, cloud architecture principles, and machine learning concepts. Applying cloud-first thinking to application architecture decisions and working toward formal Azure AI certification.'
  },
  backend: {
    icon:'🔐', name:'Backend & Authorization Systems', subtitle:'REST APIs · RBAC · Auth Flows',
    proficiency:68, level:'Proficient',
    tags:['REST APIs','Authorization','RBAC','Session Management','Token Auth','SQLite Backend'],
    desc:'Core focus area within the software engineering curriculum. Experience building backend services that implement role-based access control, token-based authentication flows, and secure data access patterns — primarily using Python with SQLite persistence layers.'
  }
};

/* ─── Modal ─── */
const modalOverlay = document.getElementById('skillModal');
const modalContent = document.getElementById('modalContent');
const modalClose   = document.getElementById('modalClose');

document.querySelectorAll('.skill-block').forEach(block => {
  block.addEventListener('click', () => {
    const s = SKILLS[block.dataset.skill];
    if (!s) return;
    modalContent.innerHTML = `
      <div class="modal-icon">${s.icon}</div>
      <div class="modal-title">${s.name}</div>
      <div class="modal-subtitle">${s.subtitle}</div>
      <div class="modal-tags">${s.tags.map(t=>`<span class="modal-tag">${t}</span>`).join('')}</div>
      <div class="modal-prof-hd">PROFICIENCY</div>
      <div class="modal-bar-wrap"><div class="modal-bar" style="width:${s.proficiency}%"></div></div>
      <div class="modal-prof-labels"><span>${s.level}</span><span>${s.proficiency}%</span></div>
      <div class="modal-desc">${s.desc}</div>
    `;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

/* ─── Timeline scroll-in ─── */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.style.opacity = '1';
      en.target.style.transform = 'translateX(0)';
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.timeline-card').forEach((card, i) => {
  card.style.cssText += `opacity:0;transform:translateX(-16px);transition:opacity .45s ease ${i*.13}s,transform .45s ease ${i*.13}s`;
  io.observe(card);
});

/* ─── Skill bars on scroll ─── */
const barIO = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.querySelectorAll('.skill-bar').forEach(bar => {
        const w = bar.style.width;
        bar.style.width = '0';
        requestAnimationFrame(() => setTimeout(() => bar.style.width = w, 80));
      });
      barIO.unobserve(en.target);
    }
  });
}, { threshold: 0.25 });
const grid = document.getElementById('skillsGrid');
if (grid) barIO.observe(grid);

