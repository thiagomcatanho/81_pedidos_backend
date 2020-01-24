const { 
    databaseURI, 
    databaseUsername, 
    databasePassword, 
    databaseName } = require('../config/keys');

exports.getConnection = () => {

    const connection = require('knex')({
        client: 'mysql',
		connection: {
			host : databaseURI,
			user : databaseUsername,
			password : databasePassword,
			database : databaseName
		}
    });

    return connection;
}