const express = require('express');
const router = express.Router();
const db = require('../mysql'); // Importa la conexión a la base de datos MySQL

// Función para manejar errores de la base de datos
const handleDatabaseError = (error, res) => {
    console.error(error);
    res.status(500).send('Error en el servidor.');
};

// Ruta para consultar todos los elementos y renderizar la vista
router.get('/', (req, res) => {
    const query = 'SELECT * FROM admin';
    db.query(query, (error, results) => {
        if (error) return handleDatabaseError(error, res);
        res.render('index', { contacts: results });
    });
});

// Ruta para insertar un nuevo contacto
router.post('/new-contact', (req, res) => {
    const { firstname, lastname, email, phone } = req.body;
    const query = 'INSERT INTO admin (firstname, lastname, email, phone) VALUES (?, ?, ?, ?)';
    db.query(query, [firstname, lastname, email, phone], (error) => {
        if (error) return handleDatabaseError(error, res);
        res.redirect('/');
    });
});

// Ruta para eliminar un contacto por email
router.get('/delete-contact/:email', (req, res) => {
    const { email } = req.params;
    const query = 'DELETE FROM admin WHERE email = ?';
    db.query(query, [email], (error) => {
        if (error) return handleDatabaseError(error, res);
        res.redirect('/');
    });
});

// Ruta para editar un contacto por email
router.get('/edit-contact/:email', (req, res) => {
    const { email } = req.params;
    const query = 'SELECT * FROM admin WHERE email = ?';
    db.query(query, [email], (error, results) => {
        if (error) return handleDatabaseError(error, res);
        res.render('index', { contact: results[0] });
    });
});

// Ruta para actualizar un contacto por email
router.post('/update-contact/:email', (req, res) => {
    const { firstname, lastname, phone } = req.body;
    const { email } = req.params;
    const query = 'UPDATE admin SET firstname = ?, lastname = ?, phone = ? WHERE email = ?';
    db.query(query, [firstname, lastname, phone, email], (error) => {
        if (error) return handleDatabaseError(error, res);
        res.redirect('/');
    });
});

module.exports = router;
