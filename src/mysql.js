const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'mysql-tendenciasarquitectura.alwaysdata.net',
    user: '333398_free',
    password: 'g1-tendencias-arquitectura',
    database: 'tendenciasarquitectura_relacional',
});

// Conectar a MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a MySQL');
});

module.exports = db;
