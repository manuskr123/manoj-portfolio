/* ==========================================
   MANOJ X STUDIO — Projects JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const projectsGrid = document.getElementById('projectsGrid');
  
  if (!projectsGrid) return;

  // Fallback data in case JSON fetch fails over direct file:// protocol
  const fallbackProjects = [
    {
      id: "noc-portal",
      title: "NOC Portal for Universities",
      description: "Digital NOC requests, admin approvals, email signature system and PDF generation.",
      technologies: "React, Next.js, Tailwind",
      category: "Web Development",
      link: "https://lnkd.in/p/gnwBQVSV",
      badge: "Live Demo"
    },
    {
      id: "taskmaster",
      title: "TaskMaster — To-Do App",
      description: "Productivity app with reminders, dark mode & offline persistence.",
      technologies: "JavaScript, HTML, CSS",
      category: "Web Application",
      link: "https://lnkd.in/p/gnwBQVSV",
      badge: "Live Demo"
    },
    {
      id: "resume-builder",
      title: "Resume Builder",
      description: "Resume creation experience with live preview.",
      technologies: "React, JavaScript, CSS3",
      category: "Web Application",
      link: "",
      badge: "Local Deployment"
    },
    {
      id: "badfellowmedia",
      title: "BadFellowMedia",
      description: "Music portfolio website for the BadFellowMedia label.",
      technologies: "HTML, CSS, JavaScript, XML",
      category: "Web Development",
      link: "",
      badge: "Local Deployment"
    },
    {
      id: "jio-promo-clone",
      title: "Jio Promo Clone",
      description: "Pixel-faithful marketing site clone.",
      technologies: "HTML5, CSS3, JavaScript",
      category: "Web Development",
      link: "",
      badge: "Local Deployment"
    },
    {
      id: "ekunit",
      title: "EKUNIT — Blood Donation",
      description: "Donor matching & request platform.",
      technologies: "React, Node.js, MongoDB",
      category: "Web Application",
      link: "",
      badge: "Local Deployment"
    },
    {
      id: "desi-drip",
      title: "Desi Drip — Lyrical Video",
      description: "Music video edit with cinematic transitions and color grade.",
      technologies: "DaVinci Resolve, Premiere Pro, Canva, Firefly",
      category: "Video & Design",
      link: "",
      badge: "Creative Production"
    },
    {
      id: "tera-hogya-re-bhole",
      title: "Tera Hogya Re Bhole",
      description: "Devotional music video edit with grading.",
      technologies: "DaVinci Resolve, InShot, Canva, Premiere Pro",
      category: "Video & Design",
      link: "",
      badge: "Creative Production"
    }
  ];

  function renderProjects(projects) {
    projectsGrid.innerHTML = '';
    projects.forEach(project => {
      const card = document.createElement('div');
      card.style.cssText = "background-color: var(--surface); border: 1px solid var(--border); border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; transition: var(--transition);";
      
      card.innerHTML = `
        <div>
          <!-- Project Image Slot -->
          <div style="height: 200px; background-color: var(--surface-elevated); border-bottom: 1px solid var(--border); position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden;">
            <img src="assets/images/projects/${project.id}.webp" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div style="display: none; position: absolute; inset: 0; align-items: center; justify-content: center; background: var(--surface-elevated); color: var(--text-secondary); font-size: 0.85rem; padding: 1rem; text-align: center;">
              <span>${project.title} Preview</span>
            </div>
            <span style="position: absolute; top: 1rem; right: 1rem; background-color: rgba(11,13,12,0.8); border: 1px solid var(--border); padding: 0.25rem 0.75rem; font-size: 0.75rem; border-radius: 4px; color: var(--accent); font-family: var(--font-heading);">${project.badge}</span>
          </div>

          <div style="padding: 2rem;">
            <span style="font-size: 0.8rem; color: var(--accent); font-family: var(--font-heading); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.5rem;">${project.category}</span>
            <h3 style="font-size: 1.25rem; margin-bottom: 0.75rem; color: var(--text-primary);">${project.title}</h3>
            <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.5;">${project.description}</p>
            <div style="font-size: 0.85rem; color: var(--text-primary); background: var(--surface-elevated); padding: 0.5rem 0.75rem; border-radius: 4px; border: 1px solid var(--border); display: inline-block; margin-bottom: 1.5rem;">
              <strong>Tools/Tech:</strong> ${project.technologies}
            </div>
          </div>
        </div>

        <div style="padding: 0 2rem 2rem 2rem;">
          ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%; text-align: center; padding: 0.75rem;">View Project Link →</a>` : `<span style="display: block; text-align: center; padding: 0.75rem; font-size: 0.9rem; color: var(--text-secondary); border: 1px dashed var(--border); border-radius: 4px;">Local Deployment / Private Source</span>`}
        </div>
      `;
      projectsGrid.appendChild(card);
    });
  }

  // Attempt to fetch json, fallback to array if file protocol blocks fetch
  fetch('data/projects.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => renderProjects(data))
    .catch(error => {
      console.warn('JSON fetch warning (likely due to file:// protocol without Live Server). Using fallback data.', error);
      renderProjects(fallbackProjects);
    });
});