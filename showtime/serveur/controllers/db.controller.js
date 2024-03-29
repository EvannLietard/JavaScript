const mongoose = require('mongoose');
const dbURI = require('../config/db.config').dbURI;


const dbConnection = mongoose.createConnection(dbURI);

module.exports = dbConnection;        // exporte la connection créée

// mise en place des abonnements aux événéments
dbConnection.on('connected',
  () => console.log(`db.controller.js : connected to ${dbURI}`)
);
dbConnection.on('disconnected', () => console.log(`db.controller.js : disconnected from ${dbURI}`));


const shutdown = async msg => {    // fonction pour
   await dbConnection.close();     // fermer proprement la connexion
   console.log(` Mongoose shutdown : ${msg}`);
   process.exit(0);
}


process.on('SIGINT', () => shutdown('application ends') ); // application killed (Ctrl+c)
process.on('SIGTERM', () => shutdown('SIGTERM received') );

