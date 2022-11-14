const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('floatingEmail');
const passwordInput = document.getElementById('floatingPassword');

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
    if (response.ok) {
      window.location.replace('/user-select');
    }
  } catch (err) {
    console.log(err);
  }
});
