// backend/controllers/schoolController.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// ✅ Create MySQL connection with SSL fix
const pool = mysql.createPool({
  uri: process.env.MYSQL_URL,
  ssl: {
    rejectUnauthorized: false, // allow self-signed certificates
  },
});

// Add new school
export async function addSchoolToDB({
  name,
  address,
  city,
  state,
  contact,
  email_id,
  image,
}) {
  const sql = `
    INSERT INTO schools (name, address, city, state, contact, email_id, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  await pool.query(sql, [name, address, city, state, contact, email_id, image]);
}

// Fetch all schools
export async function getSchoolsFromDB() {
  const [rows] = await pool.query("SELECT * FROM schools ORDER BY id DESC");
  return rows;
}
