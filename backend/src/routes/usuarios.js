const express = require('express');
const router = express.Router();
const pool = require('../db');

// Crear tabla si no existe y agregar columna 'estado' por si ya existiera de antes
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        telefono VARCHAR(20),
        edad INTEGER,
        direccion VARCHAR(200),
        rol VARCHAR(20) DEFAULT 'viewer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Agregamos la columna estado si no existe (PostgreSQL 9.6+)
    await pool.query(`
      ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS estado VARCHAR(20) DEFAULT 'activo'
    `);
    console.log('Tabla usuarios lista y actualizada.');
  } catch (err) {
    console.error('Error inicializando DB:', err);
  }
};

initDB();

// GET - Obtener todos (activos) y buscar por texto
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    let queryText = "SELECT * FROM usuarios WHERE estado = 'activo'";
    let queryParams = [];

    if (q) {
      queryText += " AND (nombre ILIKE $1 OR email ILIKE $1 OR telefono ILIKE $1)";
      queryParams.push(`%${q}%`);
    }

    queryText += " ORDER BY id DESC";

    const result = await pool.query(queryText, queryParams);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Obtener uno por id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE id = $1 AND estado = 'activo'", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Crear usuario
router.post('/', async (req, res) => {
  const { nombre, email, telefono, edad, direccion, rol } = req.body;
  
  // Validaciones básicas
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email son obligatorios.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO usuarios (nombre, email, telefono, edad, direccion, rol, estado)
       VALUES ($1, $2, $3, $4, $5, $6, 'activo') RETURNING *`,
      [nombre, email, telefono, edad || null, direccion, rol || 'viewer']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'El email ya está registrado.' });
    }
    res.status(500).json({ error: err.message });
  }
});

// PUT - Actualizar usuario
router.put('/:id', async (req, res) => {
  const { nombre, email, telefono, edad, direccion, rol } = req.body;
  try {
    const result = await pool.query(
      `UPDATE usuarios SET nombre=$1, email=$2, telefono=$3, edad=$4, direccion=$5, rol=$6
       WHERE id=$7 AND estado='activo' RETURNING *`,
      [nombre, email, telefono, edad || null, direccion, rol, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado o inactivo' });
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'El email ya está asociado a otro usuario.' });
    }
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Eliminado Lógico (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE usuarios SET estado='inactivo' WHERE id=$1 RETURNING *", 
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado exitosamente (inactivo)', usuario: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;