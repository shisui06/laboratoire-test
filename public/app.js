document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value; 
    const title = document.getElementById('taskTitle').value;

    try {
        const response = await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Basic ma_clé_secrète',
                'Accept': 'application/json' 
            },
            body: JSON.stringify({ 
                title: title,
                description: "Description ici.",
                userId: email
            }),
        });

      
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Server returned non-JSON response');
        }

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Erreur inconnue');
        }

        alert('Tâche ajoutée avec succès!');
        await fetchAndDisplayTasks(email); 
        
    } catch (error) {
        console.error('Error:', error);
        alert(`Erreur: ${error.message}`);
    }
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
      document.getElementById('taskSection').style.display = 'block';
      await fetchAndDisplayTasks(email);
      alert('Login successful!');
    } else {
      alert(result.error || 'Login failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during login');
  }
});

async function fetchAndDisplayTasks(email) {
  try {
    const response = await fetch(`http://localhost:3000/api/tasks?email=${encodeURIComponent(email)}`, {
      headers: {
        'Authorization': 'Basic ma_clé_secrète'
      }
    });
    
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    
    taskList.innerHTML = tasks.map(task => `
      <div class="task-item">
        <h3>${task.title}</h3>
        <p>${task.description}</p>
      </div>
    `).join('');
    
  } catch (error) {
    console.error('Erreur:', error);
  }
}
