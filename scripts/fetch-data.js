/**
 * fetch-data.js
 * Fetches resume-data.json and dynamically renders:
 *  - Skills section (index.html + resume.html)
 *  - Projects grid (index.html + projects.html)
 *  - Projects timeline (resume.html)
 * Falls back to reading the JSON directly if the backend is not running.
 */

document.addEventListener('DOMContentLoaded', async function () {
  const DATA_URL = '/resume/resume-data.json';

  let data;
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error('Failed to fetch resume data');
    data = await res.json();
  } catch (err) {
    console.warn('Could not load resume-data.json:', err.message);
    return;
  }

  renderSkills(data.skills);
  renderProjects(data.projects);
  renderResumeProjects(data.projects);
  renderResumeSkills(data.skills);
});

/* ── Skills Rendering ── */
function renderSkills(skills) {
  const container = document.getElementById('skills-container');
  if (!container || !skills) return;

  const categories = [
    { key: 'proficient',        label: 'Proficient In' },
    { key: 'familiar',          label: 'Familiar With' },
    { key: 'currentlyLearning', label: 'Currently Learning' }
  ];

  container.innerHTML = categories.map(function (cat) {
    const items = skills[cat.key];
    if (!items || !items.length) return '';

    const pills = items.map(function (skill) {
      const isLearning = cat.key === 'currentlyLearning';
      return `<span class="skill-pill ${isLearning ? 'skill-pill-learning' : ''} animate-on-scroll animate-scale">
        ${skill.name}
      </span>`;
    }).join('');

    return `<div>
      <h3 class="skill-category-title">${cat.label}</h3>
      <div class="skills-grid">${pills}</div>
    </div>`;
  }).join('');

  // Re-observe new elements for scroll animation
  if (window.scrollAnimObserver) {
    container.querySelectorAll('.animate-on-scroll').forEach(function (el) {
      window.scrollAnimObserver.observe(el);
    });
  }
}

/* ── Projects Grid Rendering ── */
function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  if (!grid || !projects) return;

  // On homepage, show all (up to 3 featured); on projects page, show all
  const isHomepage = window.location.pathname.includes('index') ||
                     window.location.pathname === '/' ||
                     window.location.pathname.endsWith('/');
  const toRender = isHomepage
    ? projects.filter(function (p) { return p.featured; }).slice(0, 3)
    : projects;

  if (!toRender.length) {
    grid.innerHTML = '<p class="text-center text-muted" style="grid-column:1/-1">No projects found.</p>';
    return;
  }

  grid.innerHTML = toRender.map(function (project) {
    return buildProjectCard(project);
  }).join('');

  // Wire filter buttons
  wireFilterButtons(projects, grid);

  // Wire lightbox on thumbnails
  grid.querySelectorAll('.project-thumbnail-placeholder, .project-thumbnail').forEach(function (el) {
    el.addEventListener('click', function () {
      openLightbox(el.getAttribute('data-src') || '', el.getAttribute('alt') || project.title);
    });
  });
}

function buildProjectCard(project) {
  const statusBadge = project.status === 'in-progress'
    ? '<span class="badge badge-in-progress">⚡ In Progress</span>'
    : '<span class="badge badge-success">✓ Completed</span>';

  const techStack = Array.isArray(project.techStack)
    ? project.techStack
    : parseJsonArray(project.techStack);
  const techTags = techStack
    .map(function (t) { return `<span class="tech-tag">${escapeHtml(t)}</span>`; }).join('');

  const githubBtn = project.githubUrl
    ? `<a href="${escapeHtml(project.githubUrl)}" class="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeHtml(project.title)} on GitHub">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
        Code
      </a>`
    : '';

  const liveBtn = project.liveUrl
    ? `<a href="${escapeHtml(project.liveUrl)}" class="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer" aria-label="View live demo of ${escapeHtml(project.title)}">
        <span aria-hidden="true">🔗</span> Live Demo
      </a>`
    : '';

  return `<article class="project-card animate-on-scroll animate-fade-up" data-category="${escapeHtml(project.category)}" data-status="${escapeHtml(project.status)}">
    <div class="project-thumbnail-placeholder" data-src="${escapeHtml(project.imageUrl || '')}" alt="${escapeHtml(project.title)} screenshot" role="img" aria-label="Click to view ${escapeHtml(project.title)} screenshot" tabindex="0" style="cursor:pointer">
      📁
    </div>
    <div class="project-body">
      <div class="project-header">
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        ${statusBadge}
      </div>
      <p class="project-description">${escapeHtml(project.shortDescription)}</p>
      <div class="project-tech" aria-label="Technologies used">${techTags}</div>
      <div class="project-links">${githubBtn}${liveBtn}</div>
    </div>
  </article>`;
}

/* ── Filter Buttons ── */
function wireFilterButtons(allProjects, grid) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filtered = filter === 'all'
        ? allProjects
        : allProjects.filter(function (p) {
            return filter === 'in-progress' ? p.status === 'in-progress' : p.category === filter;
          });

      grid.innerHTML = filtered.length
        ? filtered.map(buildProjectCard).join('')
        : '<p class="text-center text-muted" style="grid-column:1/-1">No projects in this category.</p>';
    });
  });
}

/* ── Resume Page: Projects Timeline ── */
function renderResumeProjects(projects) {
  const timeline = document.getElementById('resume-projects-timeline');
  if (!timeline || !projects) return;

  timeline.innerHTML = projects.map(function (project) {
    const techStack = Array.isArray(project.techStack)
      ? project.techStack.join(', ')
      : project.techStack;

    const highlights = (project.highlights || []).map(function (h) {
      return `<li>${escapeHtml(h)}</li>`;
    }).join('');

    const links = [
      project.githubUrl ? `<a href="${escapeHtml(project.githubUrl)}" class="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer">GitHub</a>` : '',
      project.liveUrl   ? `<a href="${escapeHtml(project.liveUrl)}"   class="btn btn-primary btn-sm"   target="_blank" rel="noopener noreferrer">Live Demo</a>` : ''
    ].join('');

    return `<div class="timeline-item animate-on-scroll animate-fade-up">
      <div class="timeline-dot ${project.status === 'in-progress' ? 'active' : ''}" aria-hidden="true"></div>
      <p class="timeline-date">${escapeHtml(techStack)}</p>
      <h3 class="timeline-title">${escapeHtml(project.title)}</h3>
      <p class="timeline-institution">${escapeHtml(project.shortDescription)}</p>
      ${highlights ? `<ul class="timeline-highlights" aria-label="Project highlights">${highlights}</ul>` : ''}
      <div style="margin-top:var(--space-4);display:flex;gap:var(--space-3)">${links}</div>
    </div>`;
  }).join('');
}

/* ── Resume Page: Skills ── */
function renderResumeSkills(skills) {
  const container = document.getElementById('resume-skills');
  if (!container || !skills) return;

  const allSkills = [
    ...(skills.proficient || []),
    ...(skills.familiar || [])
  ];

  container.innerHTML = `<div class="skills-grid">
    ${allSkills.map(function (s) {
      return `<span class="skill-pill">${escapeHtml(s.name)}</span>`;
    }).join('')}
  </div>`;
}

/* ── Lightbox helper (used by project cards) ── */
function openLightbox(src, alt) {
  var modal   = document.getElementById('modal');
  var img     = document.getElementById('modal-img');
  if (!modal || !img || !src) return;
  img.src = src;
  img.alt = alt || 'Project screenshot';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ── XSS-safe text escaper ── */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;');
}

function parseJsonArray(value) {
  if (typeof value !== 'string') return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}
