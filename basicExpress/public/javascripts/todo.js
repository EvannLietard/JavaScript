const displayMessage = msg => document.getElementById('content').textContent = msg;

const setup = () => {
  displayMessage('prêt');
}

// go !
setup();


// Fonction pour afficher la liste des tâches
async function displayTasks() {
  try {
      const response = await fetch('/task');
      const tasks = await response.json();

      const listDiv = document.getElementById('list');
      listDiv.innerHTML = '';

      tasks.forEach(task => {
          const taskDiv = document.createElement('div');
          taskDiv.textContent = `Description: ${task.description}, Urgence: ${task.urgency}`;

          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Supprimer';
          deleteButton.addEventListener('click', async () => {
              try {
                  const deleteResponse = await fetch(`/task/${task._id}`, {
                      method: 'DELETE'
                  });                  
                  displayMessage("supression effectué");
                  displayTasks();
              } catch (error) {
                  console.error('Erreur lors de la suppression de la tâche:', error.message);
              }
          });
          taskDiv.appendChild(deleteButton);
          listDiv.appendChild(taskDiv);
      });
  } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error.message);
  }
}

// Fonction pour créer une nouvelle tâche
async function createTask() {
  const descriptionInput = document.getElementById('desc');
  const urgencyInput = document.getElementById('urgency');

  const description = descriptionInput.value.trim();
  const urgency = parseInt(urgencyInput.value);

  if (!description) {
    displayMessage('La description ne peut pas être vide.');
    return;  
  }

  try {
      const response = await fetch('/task', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              description,
              urgency
          })
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log('Nouvelle tâche créée:', responseData._id);
        displayTasks();
        displayMessage(`Nouvelle tâche créée avec succès. ID: ${responseData._id}`);
        descriptionInput.value = '';
        urgencyInput.value = '3';
    } else {
        const errorMessage = await response.text();
            displayMessage('Erreur : Cette description existe déjà.');
        }
    
} catch (error) {
    console.error('Erreur lors de la création de la tâche:', error.message);
    displayMessage('Erreur lors de la création de la tâche.');
}
}

// Gestionnaire d'événement pour le clic sur le bouton de création de tâche
document.getElementById('create').addEventListener('click', createTask);

// Chargement initial : afficher la liste des tâches
displayTasks();

