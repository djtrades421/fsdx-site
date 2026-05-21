// nav-loader.js — Universal nav loader
// Handles logged-in and logged-out states automatically

(function() {
  fetch('nav.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById('nav-content').innerHTML = html;

      // Highlight active page
      const current = window.location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('#nav-content .nav-link').forEach(link => {
        if (link.getAttribute('href') === current) {
          link.classList.remove('text-zinc-400');
          link.classList.add('text-green-400', 'font-bold');
        }
      });

      // Show VIP section if logged in
      const token = localStorage.getItem('fsdx_token');
      if (token) {
        // Show all vip-only elements
        document.querySelectorAll('#nav-content .vip-only').forEach(el => {
          el.classList.remove('hidden');
        });
        // Hide member login button
        const loginBtn = document.getElementById('nav-login-btn');
        if (loginBtn) loginBtn.classList.add('hidden');
        // Populate user info
        const name = localStorage.getItem('fsdx_name') || 'Member';
        const tier = localStorage.getItem('fsdx_tier') || 'pro';
        const avatar = document.getElementById('nav-avatar');
        const username = document.getElementById('nav-username');
        const tierEl = document.getElementById('nav-tier');
        if (avatar) avatar.textContent = name.charAt(0).toUpperCase();
        if (username) username.textContent = name;
        if (tierEl) tierEl.textContent = tier === 'trial' ? 'VIP Trial' : 'VIP Member';
      }
    })
    .catch(err => console.error('[nav] Failed to load nav.html:', err));
})();

function navLogout() {
  const token = localStorage.getItem('fsdx_token');
  if (token) {
    fetch('https://nexus-validator.dfuentes4211.workers.dev/api/auth/logout', {
      method: 'POST', headers: { 'Authorization': `Bearer ${token}` }
    }).catch(() => {});
  }
  localStorage.removeItem('fsdx_token');
  localStorage.removeItem('fsdx_name');
  localStorage.removeItem('fsdx_tier');
  window.location.href = 'index.html';
}
