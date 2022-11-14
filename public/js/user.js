document
  .querySelector('#user-select-container')
  .addEventListener('click', async (e) => {
    e.preventDefault();
    // remove any cached userIds from local storage
    localStorage.clear();
    const userId = e.target.getAttribute('id');
    localStorage.setItem('userId', userId);
    window.location.replace('/dashboard');
  });
