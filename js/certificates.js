/* ==========================================
   MANOJ X STUDIO — Certificates JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  const certificatesGrid = document.getElementById('certificatesGrid');
  if (!certificatesGrid) return;

  const fallbackCertificates = [
    { id: "html-training", title: "HTML Training", issuer: "IIT Bombay · Spoken Tutorial", date: "Verified Credential", image: "assets/images/certificates/html-training.webp" },
    { id: "linux-training", title: "Linux Training", issuer: "IIT Bombay · Spoken Tutorial", date: "Verified Credential", image: "assets/images/certificates/linux-training.webp" },
    { id: "rs-cit", title: "RS-CIT", issuer: "Vardhman Mahaveer Open University", date: "State Certified", image: "assets/images/certificates/rs-cit.webp" },
    { id: "research-paper-publication", title: "Research Paper Publication", issuer: "IJIRT · Vol. 12, Issue 12", date: "May 2026", image: "assets/images/certificates/research-paper-publication.webp" },
    { id: "icas-digital-technologies", title: "ICAS Digital Technologies — Merit", issuer: "UNSW Global", date: "2017", image: "assets/images/certificates/icas-digital-technologies.webp" },
    { id: "frontend-internship", title: "Front-End Development Internship", issuer: "CodeCrafter Technologies", date: "2026", image: "assets/images/certificates/frontend-internship.webp" },
    { id: "hour-of-code", title: "Hour of Code — Appreciation", issuer: "Codevidhya", date: "2017", image: "assets/images/certificates/hour-of-code.jpg" }
  ];

  // Create Modal Element dynamically
  const modal = document.createElement('div');
  modal.id = 'certModal';
  modal.style.cssText = "display: none; position: fixed; inset: 0; background-color: rgba(11, 13, 12, 0.9); z-index: 2000; align-items: center; justify-content: center; padding: 2rem; backdrop-filter: blur(8px);";
  modal.innerHTML = `
    <div style="position: relative; max-width: 900px; width: 100%; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; padding: 2rem;">
      <button id="closeModal" style="position: absolute; top: 1rem; right: 1rem; background: var(--surface-elevated); color: var(--text-primary); border: 1px solid var(--border); width: 40px; height: 40px; border-radius: 50%; font-size: 1.25rem; cursor: pointer; display: flex; align-items: center; justify-content: center;">&times;</button>
      <div id="modalContent" style="text-align: center;">
        <img id="modalImg" src="" alt="Certificate Preview" style="max-height: 70vh; width: auto; max-width: 100%; object-fit: contain; border-radius: 4px; margin-bottom: 1rem; border: 1px solid var(--border);">
        <h3 id="modalTitle" style="font-size: 1.35rem; margin-bottom: 0.5rem; color: var(--text-primary);"></h3>
        <p id="modalIssuer" style="color: var(--text-secondary); font-size: 0.95rem;"></p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalIssuer = document.getElementById('modalIssuer');
  const closeModal = document.getElementById('closeModal');

  function openModal(cert) {
    modalImg.src = cert.image;
    modalTitle.textContent = cert.title;
    modalIssuer.textContent = `${cert.issuer} · ${cert.date}`;
    modal.style.display = 'flex';
  }

  function closeModalFn() {
    modal.style.display = 'none';
    modalImg.src = '';
  }

  closeModal.addEventListener('click', closeModalFn);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModalFn();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModalFn();
  });

  function renderCertificates(certs) {
    certificatesGrid.innerHTML = '';
    certs.forEach((cert, index) => {
      const card = document.createElement('div');
      card.style.cssText = "background-color: var(--surface); border: 1px solid var(--border); border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: var(--transition);";
      
      card.innerHTML = `
        <div style="height: 220px; background-color: var(--surface-elevated); border-bottom: 1px solid var(--border); position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden;">
          <img src="${cert.image}" alt="${cert.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div style="display: none; position: absolute; inset: 0; align-items: center; justify-content: center; background: var(--surface-elevated); color: var(--text-secondary); font-size: 0.85rem; padding: 1rem; text-align: center;">
            <span>${cert.title}</span>
          </div>
          <span style="position: absolute; top: 1rem; left: 1rem; background-color: rgba(11,13,12,0.8); border: 1px solid var(--border); padding: 0.25rem 0.75rem; font-size: 0.75rem; border-radius: 4px; color: var(--accent); font-family: var(--font-heading);">CERT 0${index + 1}</span>
        </div>
        <div style="padding: 2rem;">
          <span style="font-size: 0.8rem; color: var(--accent); font-family: var(--font-heading); display: block; margin-bottom: 0.5rem;">${cert.date}</span>
          <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--text-primary);">${cert.title}</h3>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">${cert.issuer}</p>
        </div>
      `;

      card.addEventListener('click', () => openModal(cert));
      certificatesGrid.appendChild(card);
    });
  }

  fetch('data/certificates.json')
    .then(res => res.json())
    .then(data => renderCertificates(data))
    .catch(() => renderCertificates(fallbackCertificates));
});