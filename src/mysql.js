const mysql = require('mysql');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

// Configuración de la conexión a MySQL usando variables de entorno
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Creación de la conexión a MySQL
const db = mysql.createConnection(dbConfig);

// Función para conectar y manejar errores
const connectWithRetry = () => {
  db.connect((err) => {
    if (err) {
      console.error('Error al conectar a MySQL:', err.message);
      console.log('Reintentando en 5 segundos...');
      setTimeout(connectWithRetry, 5000); // Reintentar conexión cada 5 segundos
    } else {
      console.log('Conectado a MySQL');
    }
  });
};

// Iniciar conexión
connectWithRetry();

// Manejar cierre de conexión
db.on('error', (err) => {
  console.error('Error en la conexión de MySQL:', err.message);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    connectWithRetry(); // Reintentar conexión si se pierde
  } else {
    throw err;
  }
});

module.exports = db;
