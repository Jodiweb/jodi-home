document.querySelectorAll('.footer-contact-list').forEach(function (contactList) {
  var socialLinks = document.createElement('div');
  socialLinks.className = 'footer-social-links';
  socialLinks.innerHTML = '<a href="https://www.linkedin.com/company/jodi-tecnologias" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://www.youtube.com/@joditecnologiasindustriais" target="_blank" rel="noopener noreferrer">YouTube</a>';
  contactList.appendChild(socialLinks);
});
