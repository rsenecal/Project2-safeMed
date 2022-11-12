const navBtnContainer = document.getElementById('nav-btn-container');

navBtnContainer.addEventListener('click', async (e) => {
  e.preventDefault();
  const targetId = e.target.getAttribute('id');
  if (targetId === 'dashboard') {
    window.location.replace('/dashboard');
  } else if (targetId === 'login-btn') {
    window.location.replace('/login');
  } else {
    const response = await fetch('/api/users/logout', { method: 'GET' });
    if (response.status === 204) {
      document.location.replace('/login');
    }
  }
});
