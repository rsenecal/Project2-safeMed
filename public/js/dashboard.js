const patientsTabelEl = document.getElementById('patients-table');

patientsTabelEl.addEventListener('click', async (e) => {
  console.log('click');
  e.preventDefault();
  // make sure a button element was the event target
  if (e.target instanceof HTMLButtonElement) {
    const userId = e.target.getAttribute('id');
    window.location.replace(`/patientmeds/${userId}`);
  }
});
