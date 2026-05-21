// vip-nav.js — Shared VIP sidebar loader
// Include this script on every VIP page and call loadVipNav()
// It loads nav.html, injects the VIP section after Ecosystem,
// adds the user avatar/logout at the bottom, and highlights the active page.

function loadVipNav(opts = {}) {
  const API = 'https://nexus-validator.dfuentes4211.workers.dev';
  const activePage = opts.activePage || window.location.pathname.split('/').pop();

  fetch('nav.html')
    .then(r => r.text())
    .then(html => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html;
      const topDiv = wrapper.querySelector('div:first-child');

      // Remove Member Login button — not needed when logged in
      const loginBtn = topDiv.querySelector('a[href="login.html"]');
      if (loginBtn) loginBtn.closest('.space-y-3') ? null : loginBtn.remove();

      // Highlight active public nav links
      topDiv.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === activePage) {
          link.classList.remove('text-zinc-400');
          link.classList.add('text-green-400', 'font-bold');
        }
      });

      // Build VIP section
      const vipSection = document.createElement('div');
      vipSection.className = 'mt-2';
      vipSection.innerHTML = `
        <div class="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">// VIP Area</div>
        <div class="flex flex-col gap-2.5 pl-1" id="vip-nav-links">
          <a href="dashboard.html" class="vip-nav-link text-zinc-400 hover:text-green-400 font-medium transition text-sm flex items-center gap-2">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg>
            Dashboard
          </a>
          <a href="recaps.html" class="vip-nav-link text-zinc-400 hover:text-green-400 font-medium transition text-sm flex items-center gap-2">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>
            Session Recaps
          </a>
          <a href="profile.html" class="vip-nav-link text-zinc-400 hover:text-green-400 font-medium transition text-sm flex items-center gap-2">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>
            My Profile
          </a>
        </div>`;

      // Highlight active VIP link
      vipSection.querySelectorAll('.vip-nav-link').forEach(link => {
        if (link.getAttribute('href') === activePage) {
          link.classList.remove('text-zinc-400');
          link.classList.add('text-green-400', 'font-bold');
        }
      });

      // Inject VIP section after first nav section (Ecosystem)
      const navEl = topDiv.querySelector('nav');
      if (navEl) {
        const firstSection = navEl.querySelector('div:first-child');
        if (firstSection) firstSection.after(vipSection);
        else navEl.prepend(vipSection);
      }

      // Build user/logout block
      const userBlock = document.createElement('div');
      userBlock.className = 'w-full pt-4 border-t border-white/5 mt-4 space-y-2';
      userBlock.innerHTML = `
        <a href="profile.html" class="flex items-center gap-3 px-2 hover:bg-white/5 rounded-xl py-1.5 transition group">
          <div id="user-avatar" class="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 text-xs font-black shrink-0 group-hover:border-green-500/60 transition">?</div>
          <div class="flex-1 min-w-0">
            <div id="user-name" class="text-sm text-white font-bold truncate group-hover:text-green-400 transition">Loading...</div>
            <div id="user-tier" class="text-[10px] text-green-400 uppercase tracking-wider">VIP</div>
          </div>
          <svg class="w-3 h-3 text-zinc-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
        </a>
        <button onclick="vipNavLogout()" class="w-full text-left text-xs text-zinc-500 hover:text-white transition flex items-center gap-2 px-2 py-1">
          <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/></svg>
          Logout
        </button>`;

      // Populate user info from localStorage
      const firstName = localStorage.getItem('fsdx_name') || 'Member';
      const tier = localStorage.getItem('fsdx_tier') || 'pro';
      userBlock.querySelector('#user-avatar').textContent = firstName.charAt(0).toUpperCase();
      userBlock.querySelector('#user-name').textContent = firstName;
      userBlock.querySelector('#user-tier').textContent = tier === 'trial' ? 'VIP Trial' : 'VIP Member';

      // Remove old bottom section from nav, replace with user block
      const navContent = document.getElementById('nav-content');
      navContent.innerHTML = '';
      navContent.appendChild(topDiv);
      navContent.appendChild(userBlock);
    })
    .catch(err => console.error('[vip-nav] Failed to load nav:', err));
}

function vipNavLogout() {
  const API = 'https://nexus-validator.dfuentes4211.workers.dev';
  const token = localStorage.getItem('fsdx_token');
  if (token) fetch(`${API}/api/auth/logout`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } }).catch(() => {});
  localStorage.removeItem('fsdx_token');
  localStorage.removeItem('fsdx_name');
  localStorage.removeItem('fsdx_tier');
  window.location.href = 'login.html';
}
