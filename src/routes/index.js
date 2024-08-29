const { db } = require("../firebase");
const { Router } = require("express");
const router = Router();

// Función para manejar errores de la base de datos
const handleDatabaseError = (error, res) => {
  console.error(error);
  res.status(500).send("Error en el servidor.");
};

// Ruta para obtener y mostrar todos los contactos
router.get("/", async (req, res) => {
  try {
    const querySnapshot = await db.collection("admin").get();
    const contacts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.render("index", { contacts });
  } catch (error) {
    handleDatabaseError(error, res);
  }
});

// Ruta para agregar un nuevo contacto
router.post("/new-contact", async (req, res) => {
  const { firstname, lastname, email, phone } = req.body;
  try {
    await db.collection("admin").add({ firstname, lastname, email, phone });
    res.redirect("/");
  } catch (error) {
    handleDatabaseError(error, res);
  }
});

// Ruta para eliminar un contacto por ID
router.get("/delete-contact/:id", async (req, res) => {
  try {
    await db.collection("admin").doc(req.params.id).delete();
    res.redirect("/");
  } catch (error) {
    handleDatabaseError(error, res);
  }
});

// Ruta para obtener un contacto por ID y mostrarlo para edición
router.get("/edit-contact/:id", async (req, res) => {
  try {
    const doc = await db.collection("admin").doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).send("Contacto no encontrado.");
    }
    res.render("index", { contact: { id: doc.id, ...doc.data() } });
  } catch (error) {
    handleDatabaseError(error, res);
  }
});

// Ruta para actualizar un contacto por ID
router.post("/update-contact/:id", async (req, res) => {
  const { firstname, lastname, email, phone } = req.body;
  const { id } = req.params;
  try {
    await db.collection("admin").doc(id).update({ firstname, lastname, email, phone });
    res.redirect("/");
  } catch (error) {
    handleDatabaseError(error, res);
  }
});

module.exports = router;
