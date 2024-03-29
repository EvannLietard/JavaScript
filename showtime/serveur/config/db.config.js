const dbHost = '127.0.0.1';
const dbPort = 27017;
const dbName = 'showsBase';
const dbURI = `mongodb://${dbHost}:${dbPort}/${dbName}`;

module.exports = {
    dbHost : dbHost,
    dbPort : dbPort,
    dbName : dbName,
    dbURI : dbURI
  }