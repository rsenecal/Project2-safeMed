const navBtnContainer = document.getElementById('nav-btn-container');
const currentUserId = localStorage.getItem('currentUserId');

// Handler function for navbar buttons
navBtnContainer.addEventListener('click', async (e) => {
  e.preventDefault();
  const targetId = e.target.getAttribute('id');
  // conditional statements to handle the dynamically rendered buttons
  if (targetId === 'dashboard') {
    if (currentUserId) {
      window.location.replace(`/dashboard/${currentUserId}`);
    }
  } else if (targetId === 'login-btn') {
    window.location.replace('/login');
  } else {
    const response = await fetch('/api/customers/logout', { method: 'GET' });
    if (response.status === 204) {
      document.location.replace('/login');
    }
  }
});
