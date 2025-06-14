// =======================
// Theme Toggle
// =======================
const themeToggle = document.getElementById('theme-toggle');
const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
  document.body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

// =======================
// Fade-in Animation
// =======================
function fadeIn(el) {
  requestAnimationFrame(() => {
    el.style.opacity = 1;
    el.style.transform = 'translateY(0)';
  });
}

// =======================
// Load JSON Helper
// =======================
function loadJSON(path, callback) {
  fetch(path)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${path}`);
      return res.json();
    })
    .then(data => callback(data))
    .catch(err => console.error(err));
}

// =======================
// Experience
// =======================
loadJSON('data/experience.json', data => {
  const container = document.getElementById('experience-list');
  container.innerHTML = "";
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    const title = `<h3>${item.role} @ ${item.company}</h3>`;
    const dates = `<p><strong>${item.startDate} – ${item.endDate}</strong></p>`;
    const bullets = Array.isArray(item.description)
      ? `<ul>${item.description.map(d => `<li>${d}</li>`).join("")}</ul>`
      : `<p>${item.description}</p>`;

    card.innerHTML = `${title}${dates}${bullets}`;
    fadeIn(card);
    container.appendChild(card);
  });
});

// =======================
// Certifications
// =======================
loadJSON('data/certifications.json', data => {
  const container = document.getElementById('certifications-list');
  container.innerHTML = "";
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${item.logo}" alt="${item.issuer} logo" loading="lazy" />
      <h3>${item.title}</h3>
      <p><strong>${item.issuer}</strong> – ${item.date}</p>
      <a href="${item.link}" target="_blank" download>Download Certificate</a>
    `;

    fadeIn(card);
    container.appendChild(card);
  });
});

// =======================
// Projects
// =======================
loadJSON('data/projects.json', data => {
  const container = document.getElementById('projects-list');
  container.innerHTML = "";
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    const tech = item.techStack.map(tag => `<span class="tag">${tag}</span>`).join("");
    const link = item.link ? `<a href="${item.link}" target="_blank">View Project</a>` : "";

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="tags">${tech}</div>
      ${link}
    `;

    fadeIn(card);
    container.appendChild(card);
  });
});
