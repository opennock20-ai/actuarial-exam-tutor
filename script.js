const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}


const emailToast = document.createElement('div');
emailToast.className = 'email-toast';
emailToast.setAttribute('role', 'status');
emailToast.setAttribute('aria-live', 'polite');
document.body.appendChild(emailToast);

let emailToastTimer;
function showEmailToast(message) {
  emailToast.textContent = message;
  emailToast.classList.add('show');
  clearTimeout(emailToastTimer);
  emailToastTimer = setTimeout(() => emailToast.classList.remove('show'), 3600);
}

async function copyEmailAddress(email) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(email);
      return true;
    }
  } catch (err) {}

  try {
    const input = document.createElement('textarea');
    input.value = email;
    input.setAttribute('readonly', '');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand('copy');
    input.remove();
    return copied;
  } catch (err) {
    return false;
  }
}

document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.addEventListener('click', async () => {
    const href = link.getAttribute('href') || '';
    const email = href.slice(7).split('?')[0] || 'hello@actuarialexamtutor.co.uk';
    const copied = await copyEmailAddress(email);
    if (copied) {
      showEmailToast(`Email address copied: ${email}. Your email app should open too.`);
    }
  });
});
