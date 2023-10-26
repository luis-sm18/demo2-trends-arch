const express = require('express');
const router = express.Router();
const db = require('../mysql'); // Importa la conexión a la base de datos MySQL

// Consulta todos los elementos en MySQL y renderiza la vista
router.get('/', (req, res) => {
    db.query('SELECT * FROM admin', (error, results) => {
        if (error) {
            console.error(error);
        } else {
            res.render('index', { contacts: results });
        }
    });
});

// Inserta un nuevo contacto en MySQL
router.post('/new-contact', (req, res) => {
    const { firstname, lastname, email, phone } = req.body;
    const insertQuery = 'INSERT INTO admin (firstname, lastname, email, phone) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [firstname, lastname, email, phone], (error, result) => {
        if (error) {
            console.error(error);
        } else {
            res.redirect('/');
        }
    });
});

// Elimina un contacto en MySQL por email
router.get('/delete-contact/:email', (req, res) => {
    const email = req.params.email;
    const deleteQuery = 'DELETE FROM admin WHERE email = ?';
    db.query(deleteQuery, [email], (error, result) => {
        if (error) {
            console.error(error);
        } else {
            res.redirect('/');
        }
    });
});

// Edita un contacto en MySQL por email
router.get('/edit-contact/:email', (req, res) => {
    const email = req.params.email;
    const selectQuery = 'SELECT * FROM admin WHERE email = ?';
    db.query(selectQuery, [email], (error, results) => {
        if (error) {
            console.error(error);
        } else {
            res.render('index', { contact: results[0] });
        }
    });
});

// Actualiza un contacto en MySQL por email
router.post('/update-contact/:email', (req, res) => {
    const { firstname, lastname, phone } = req.body;
    const email = req.params.email;
    const updateQuery = 'UPDATE admin SET firstname = ?, lastname = ?, phone = ? WHERE email = ?';
    db.query(updateQuery, [firstname, lastname, phone, email], (error, result) => {
        if (error) {
            console.error(error);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
