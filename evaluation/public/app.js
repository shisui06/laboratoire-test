document.getElementById('taskForm').addEventListener('submit', async (e) => {
 e.preventDefault();
 const response = await fetch('/tasks', {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({ title: "Nouvelle Tâche", description: "Description ici." }),
 });
 console.log(await response.json());
});
