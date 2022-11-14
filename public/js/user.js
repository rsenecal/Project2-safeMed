document
  .querySelector('#user-select-container')
  .addEventListener('click', async (e) => {
    e.preventDefault();

    const userId = e.target.getAttribute('id');

    try {
      const userResponse = await fetch(`/api/users/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const { username, password } = await userResponse.json();

      const user = {
        username: username,
        password: password,
      };

      const loginResponse = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
      });
      if (loginResponse.ok) {
        window.location.replace('/dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  });
