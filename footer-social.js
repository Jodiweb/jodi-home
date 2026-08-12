document.querySelectorAll('.footer-contact-list').forEach(function (contactList) {
  var socialTitle = document.createElement('h4');
  socialTitle.className = 'footer-social-title';
  socialTitle.textContent = 'Redes sociais';

  var socialLinks = document.createElement('div');
  socialLinks.className = 'footer-social-links';
  socialLinks.innerHTML = '<a href="https://www.linkedin.com/company/jodi-tecnologias" target="_blank" rel="noopener noreferrer" aria-label="JODI Tecnologias no LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.25H3V21h3.5V8.25ZM4.75 3A2.05 2.05 0 1 0 4.75 7.1 2.05 2.05 0 0 0 4.75 3ZM21 13.7c0-3.84-2.05-5.63-4.78-5.63-2.2 0-3.19 1.21-3.74 2.06V8.25H9V21h3.48v-6.31c0-1.66.32-3.27 2.38-3.27 2.03 0 2.06 1.9 2.06 3.38V21H21v-7.3Z"/></svg><span>LinkedIn</span></a><a href="https://www.youtube.com/@joditecnologiasindustriais" target="_blank" rel="noopener noreferrer" aria-label="JODI Tecnologias no YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.55 3.58 12 3.58 12 3.58s-7.55 0-9.4.5A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.85.5 9.4.5 9.4.5s7.55 0 9.4-.5a3 3 0 0 0 2.1-2.12A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.85 12 9.6 15.6Z"/></svg><span>YouTube</span></a>';
  contactList.appendChild(socialTitle);
  contactList.appendChild(socialLinks);
});
