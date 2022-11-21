const patientsTabelEl = document.getElementById('patients-table');
const addPatientBtn = document.getElementById('add-btn');
const addPatientModal = document.getElementById('add-patient-modal');
const editPatientBtn = document.getElementById('edit');
const editPatientModal = document.getElementById('edit-patient-modal');
const closeBtn = document.getElementById('add-close');

addPatientBtn.addEventListener('click', () => {
  addPatientModal.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
  addPatientModal.classList.add('hidden');
});

// console.log(document.querySelector('#addPatientModal'));

patientsTabelEl.addEventListener('click', async (e) => {
  console.log('click');
  e.preventDefault();
  // make sure a button element was the event target
  // if (e.target instanceof HTMLButtonElement && e.target.getAttribute('id') )
  if (e.target.getAttribute('id') === 'view') {
    const userId = e.target.value;
    window.location.replace(`/patientmeds/${userId}`);
  } else if (e.target.getAttribute('id') === 'edit') {
    const userId = e.target.value;
    window.location.replace(`/edit/${userId}`);
  } else if (e.target.getAttribute('id') === 'delete') {
    const userId = e.target.value;
    window.location.replace(`/delete/${userId}`);
  }
});
