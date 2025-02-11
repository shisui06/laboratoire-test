document.getElementById('taskForm').addEventListener('submit', async (e) => {
 e.preventDefault();
 const response = await fetch('/api/tasks', {
   method: 'POST',
   headers: { 
     'Content-Type': 'application/json',
     'Authorization': 'Basic ma_clé_secrète'
   },
   body: JSON.stringify({ 
     title: document.getElementById('taskTitle').value,
     description: "Description ici." 
   }),
 });
 console.log(await response.json());
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    
    if (response.ok) {
      alert('Login successful!');
      // You can redirect or update the UI here
    } else {
      alert(result.error || 'Login failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during login');
  }
});
