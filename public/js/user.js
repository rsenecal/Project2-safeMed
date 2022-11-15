// Click event listener for all user cards rendered on user view
document
  .querySelector('#user-select-container')
  .addEventListener('click', async (e) => {
    // The id of the user selected by the potential customer
    const userId = e.target.getAttribute('id');
    localStorage.setItem('currentUserId', userId);
    window.location.replace(`/dashboard/${userId}`);
  });
