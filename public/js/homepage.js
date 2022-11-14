const signUpForm = document.getElementById('sign-up-form');
const firstNameInput = document.getElementById('floatingFirstName');
const lastNameInput = document.getElementById('floatingLastName');
const emailInput = document.getElementById('floatingEmail');
const passwordInput = document.getElementById('floatingPassword');
const affiliationInput = document.getElementById('floatingAffiliation');

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
    const response = await fetch('/api/customers', {
      method: 'POST',
      body: JSON.stringify(newPotentialCustomer),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      window.location.replace('/user-select');
    }
  } catch (err) {
    console.log(err);
  }
});
