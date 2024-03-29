const Task = require('../models/task.model');

// Fonction pour récupérer toutes les tâches
async function getAllTasks(req, res) {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error('Erreur lors de la récupération des tâches :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des tâches' });
    }
}

// Fonction pour créer une nouvelle tâche
async function createTask(req, res) {
    const task = new Task({
        description: req.body.description,
        urgency: req.body.urgency
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


async function deleteTask(req, res) {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (deletedTask) {
            res.json({ message: 'Tâche supprimée avec succès' });
        } else {
            res.status(404).json({ message: 'Tâche non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllTasks, createTask, deleteTask };
