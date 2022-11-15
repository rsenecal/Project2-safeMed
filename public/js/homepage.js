// DEPENDENCIES
const signUpForm = document.getElementById('sign-up-form');
// form inputs
const firstNameInput = document.getElementById('floatingFirstName');
const lastNameInput = document.getElementById('floatingLastName');
const emailInput = document.getElementById('floatingEmail');
const passwordInput = document.getElementById('floatingPassword');
const affiliationInput = document.getElementById('floatingAffiliation');

// handler function adds customer to database
signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newPotentialCustomer = {
    first_name: firstNameInput.value.trim(),
    last_name: lastNameInput.value.trim(),
    email: emailInput.value.trim(),
    password: passwordInput.value.trim(),
    affiliation: affiliationInput.value.trim() || null,
  };

  try {
    // endpoint creates entry for customer in safeMed database/logs them intp application
    const response = await fetch('/api/customers', {
      method: 'POST',
      body: JSON.stringify(newPotentialCustomer),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // send to user select page
      window.location.replace('/user-select');
    }
  } catch (err) {
    console.log(err);
  }
});
