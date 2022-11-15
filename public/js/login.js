// DEPENDENCIES
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('floatingEmail');
const passwordInput = document.getElementById('floatingPassword');

// logs user (a.k.a customer) into application
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const customer = {
    email: emailInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  try {
    const response = await fetch('/api/customers/login', {
      method: 'POST',
      body: JSON.stringify(customer),
      headers: { 'Content-Type': 'application/json' },
    });
    // check if login was successful
    if (response.ok) {
      // send to user select page
      window.location.replace('/user-select');
    }
  } catch (err) {
    console.log(err);
  }
});
