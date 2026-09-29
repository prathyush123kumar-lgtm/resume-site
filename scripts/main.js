document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Logic
  const themeBtn = document.getElementById('themeBtn');
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Command Palette Logic
  const palette = document.getElementById('command-palette');
  const search = document.getElementById('palette-search');
  const results = document.getElementById('palette-results');
  
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      palette.showModal();
      search.focus();
      search.dispatchEvent(new Event('input')); // trigger initial list
    }
  });

  palette.addEventListener('click', (e) => {
    if (e.target === palette) palette.close();
  });

  const commands = [
    { name: 'Toggle Theme', action: () => { themeBtn.click(); palette.close(); } },
    { name: 'Go to Projects', action: () => { document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }); palette.close(); } },
    { name: 'Go to Resume & Skills', action: () => { document.getElementById('resume').scrollIntoView({ behavior: 'smooth' }); palette.close(); } },
    { name: 'View GitHub Profile', action: () => { window.open('https://github.com/prathyush123kumar-lgtm', '_blank'); palette.close(); } },
  ];

  search.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    results.innerHTML = '';
    const filtered = commands.filter(c => c.name.toLowerCase().includes(q));
    filtered.forEach(cmd => {
      const li = document.createElement('li');
      li.textContent = cmd.name;
      li.addEventListener('click', cmd.action);
      results.appendChild(li);
    });
  });

  // Load Resume Data
  fetch('../resume/resume-data.json')
    .then(response => response.json())
    .then(data => {
      // Set summary
      document.getElementById('summary-text').textContent = data.summary;

      // Load Projects
      const projectsContainer = document.getElementById('projects-container');
      const filtersContainer = document.getElementById('project-filters');
      
      // Clear skeletons
      projectsContainer.innerHTML = '';
      
      const allTechs = new Set();
      data.projects.forEach(p => p.techStack.forEach(t => allTechs.add(t)));
      
      const renderProjects = (filterTag) => {
        projectsContainer.innerHTML = '';
        const filtered = filterTag === 'All' 
          ? data.projects 
          : data.projects.filter(p => p.techStack.includes(filterTag));
          
        filtered.forEach((project, index) => {
          const card = document.createElement('div');
          card.className = 'project-card';
          
          const techTags = project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
          const imageUrl = `../assets/images/project-${index + 1}-placeholder.jpg`;

          card.innerHTML = `
            <img src="${imageUrl}" alt="${project.title} screenshot" style="width: 100%; border-radius: 4px; margin-bottom: 10px; object-fit: cover; height: 180px;">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div>${techTags}</div>
            <br>
            <a href="${project.link}" target="_blank" style="color: var(--color-primary)">View Project</a>
          `;
          projectsContainer.appendChild(card);
        });
      };

      // Render filters
      const renderFilters = () => {
        const tags = ['All', ...Array.from(allTechs).sort()];
        tags.forEach(tag => {
          const btn = document.createElement('button');
          btn.className = 'filter-btn';
          if (tag === 'All') btn.classList.add('active');
          btn.textContent = tag;
          
          btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(tag);
          });
          
          filtersContainer.appendChild(btn);
        });
      };

      renderFilters();
      renderProjects('All');

      // Load Skills
      const skillsContainer = document.getElementById('skills-container');
      skillsContainer.className = 'timeline';
      skillsContainer.innerHTML = `
        <div class="timeline-item">
          <div class="timeline-content">
            <h3>${data.education.degree}</h3>
            <p>${data.education.institution}</p>
            <span class="tech-tag">${data.education.year}</span>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content">
            <h3>Languages</h3>
            <p>${data.skills.languages.join(', ')}</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content">
            <h3>Web Technologies</h3>
            <p>${data.skills.web.join(', ')}</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content">
            <h3>Tools & Platforms</h3>
            <p>${data.skills.tools.join(', ')}</p>
          </div>
        </div>
      `;
    })
    .catch(err => console.error('Error loading resume data:', err));

  // Contact Form Logic
  const contactForm = document.getElementById('contact-form');
  const contactStatus = document.getElementById('contact-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      contactStatus.textContent = 'Sending...';
      contactStatus.style.color = 'var(--color-text)';

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      // Get Turnstile token if it exists (using standard Cloudflare form field name)
      data.cfTurnstileResponse = formData.get('cf-turnstile-response') || '';

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await response.json();
        
        if (response.ok) {
          contactStatus.textContent = 'Message sent successfully!';
          contactStatus.style.color = 'green';
          contactForm.reset();
        } else {
          contactStatus.textContent = result.error || 'Failed to send message.';
          contactStatus.style.color = 'red';
        }
      } catch (err) {
        console.error('Contact error:', err);
        contactStatus.textContent = 'Network error. Please try again later.';
        contactStatus.style.color = 'red';
      }
    });
  }
});
