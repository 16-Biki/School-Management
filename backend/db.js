// backend/db.js
import mysql from "mysql2/promise";
import { URL } from "url";

let pool;

export function getPool() {
  if (pool) return pool;

  const raw = process.env.MYSQL_URL;
  if (!raw) {
    throw new Error("MYSQL_URL not set in environment");
  }

  const parsed = new URL(raw);

  const user = decodeURIComponent(parsed.username);
  const password = decodeURIComponent(parsed.password);
  const host = parsed.hostname;
  const port = parsed.port ? Number(parsed.port) : 3306;
  const database = parsed.pathname ? parsed.pathname.slice(1) : undefined;
  const searchParams = Object.fromEntries(parsed.searchParams.entries());

  const config = {
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };

  // handle ssl-mode=REQUIRED
  if (
    searchParams["ssl-mode"] &&
    searchParams["ssl-mode"].toUpperCase() === "REQUIRED"
  ) {
    config.ssl = { rejectUnauthorized: true };
  }

  pool = mysql.createPool(config);
  return pool;
}
