const pool = require("../db/pool");

async function findAll() {
  const { rows } = await pool.query(
    "SELECT * FROM articles ORDER BY created_at DESC",
  );
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query("SELECT * FROM articles WHERE id = $1", [
    id,
  ]);
  return rows[0] || null;
}

async function findByTitle(title) {
  const { rows } = await pool.query("SELECT * FROM articles WHERE title = $1", [
    title,
  ]);
  return rows[0] || null;
}

async function create({ title, content, author, tags }) {
  const { rows } = await pool.query(
    `INSERT INTO articles (title, content, author, tags)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, content, author, tags || []],
  );
  // console.log(rows);
  return rows[0];
}

async function update(id, changes) {
  const keys = Object.keys(changes);
  if (keys.length === 0) return findById(id);

  const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(", ");
  const { rows } = await pool.query(
    `UPDATE articles SET ${setClause} WHERE id = $1 RETURNING *`,
    [id, ...Object.values(changes)],
  );
  return rows[0] || null;
}

async function remove(id) {
  const { rows } = await pool.query(
    "DELETE FROM articles WHERE id = $1 RETURNING *",
    [id],
  );
  return rows[0] || null;
}

module.exports = { findAll, findById, findByTitle, create, update, remove };
