/* ==========================================
   MANOJ X STUDIO — Work Showcase JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const showcaseGrid = document.getElementById('showcaseGrid');
  if (!showcaseGrid) return;

  const fallbackShowcase = [
    {
      category: "Internship",
      type: "pdf",
      description: "Professional engineering internship documentation and verified completion records.",
      buttonText: "View Internship Work",
      url: "https://drive.google.com/file/d/1qTbh93c4E1mouADW-UrzHhk9Nu5-VmrG/view?usp=sharing"
    },
    {
      category: "Freelancing",
      type: "cards",
      description: "Client production and web deliverables deployed in professional settings.",
      items: [
        { title: "NOC Portal", url: "https://lnkd.in/p/gnwBQVSV" },
        { title: "Task Master — To-Do Application", url: "https://lnkd.in/p/gnwBQVSV" }
      ]
    },
    {
      category: "Computer Operator & Back Office",
      type: "folder",
      description: "Administrative document systems, automated registers, and structured spreadsheets.",
      buttonText: "View Office Work",
      url: "https://drive.google.com/drive/folders/1ZCOakgCmZdXnmFNok72WtDWTO-bxT7aZ?usp=sharing"
    },
    {
      category: "Graphic Designing",
      type: "folder",
      description: "Posters, brand identities, digital assets, and high-impact visual layouts.",
      buttonText: "View Designs",
      url: "https://drive.google.com/drive/folders/14feXehlnCBYj5uDEU5E_IkPPF6co7W6O?usp=drive_link"
    },
    {
      category: "Video Editing",
      type: "folder",
      description: "Cinematic music videos, color grading, lyrical cuts, and dynamic visual motion reels.",
      buttonText: "View Video Editing Work",
      url: "https://drive.google.com/drive/folders/1rWvGIo3tsX1DBNhFlzxMd7gsQpeHMa05?usp=sharing"
    }
  ];

  function renderShowcase(data) {
    showcaseGrid.innerHTML = '';
    data.forEach((section, index) => {
      const card = document.createElement('div');
      card.style.cssText = "background-color: var(--surface); border: 1px solid var(--border); padding: 2.5rem; border-radius: 6px; display: flex; flex-direction: column; justify-content: space-between;";

      let actionHTML = '';
      if (section.type === 'cards') {
        actionHTML = `<div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem;">
          ${section.items.map(item => `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="justify-content: space-between; font-size: 0.9rem; padding: 0.75rem 1rem;"><span>${item.title}</span> <span>→</span></a>`).join('')}
        </div>`;
      } else {
        actionHTML = `<div style="margin-top: 1.5rem;"><a href="${section.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%; text-align: center;">${section.buttonText} →</a></div>`;
      }

      card.innerHTML = `
        <div>
          <span style="font-family: var(--font-heading); color: var(--accent); font-size: 0.85rem; display: block; margin-bottom: 0.75rem;">CATEGORY 0${index + 1}</span>
          <h3 style="font-size: 1.35rem; margin-bottom: 0.75rem;">${section.category}</h3>
          <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">${section.description}</p>
        </div>
        ${actionHTML}
      `;
      showcaseGrid.appendChild(card);
    });
  }

  fetch('data/work-showcase.json')
    .then(res => res.json())
    .then(data => renderShowcase(data))
    .catch(() => renderShowcase(fallbackShowcase));
});