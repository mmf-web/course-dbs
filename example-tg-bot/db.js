import { AsyncDatabase } from 'promised-sqlite3'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function initDatabase(dbPath) {
  const db = await AsyncDatabase.open(dbPath)

  const migrations = fs.readFileSync(path.join(__dirname, 'sql', '00_migrations.sql'), 'utf8')
  for (const migration of migrations.split(';')) {
    if (migration.trim()) {
      await db.run(migration.trim())
    }
  }

  return db
}
