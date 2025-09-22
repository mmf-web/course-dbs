import fs from 'fs'

/**
 * @type {Array<{name: string, description: string, run: (db: import('promised-sqlite3').AsyncDatabase, args: string[]) => Promise<string>}>}
 */
export const commands = [
  {
    name: 'add',
    description: 'Добавить расход (сумма, категория, описание)',
    run: async (db, args) => {
      const sql = fs.readFileSync('./sql/08_add_expense.sql', 'utf8').trim()
      await db.run(sql, args)
      return 'OK'
    },
  },
  {
    name: 'expenses',
    description: 'Показать все расходы',
    run: async (db, args) => {
      const sql = fs.readFileSync('./sql/02_expenses.sql', 'utf8').trim()
      return JSON.stringify(await db.all(sql, []), null, 2)
    },
  },
  {
    name: 'expenses_by_category',
    description: 'Показать все расходы по категориям',
    run: async (db, args) => {
      const sql = fs.readFileSync('./sql/04_expenses_by_category.sql', 'utf8').trim()
      return JSON.stringify(await db.all(sql, []), null, 2)
    },
  },
  {
    name: 'expenses_by_date',
    description: 'Показать все расходы по дате',
    run: async (db, args) => {
      const sql = fs.readFileSync('./sql/05_expenses_by_date.sql', 'utf8').trim()
      return JSON.stringify(await db.all(sql, []), null, 2)
    },
  },
  {
    name: 'categories',
    description: 'Показать все категории',
    run: async (db, args) => {
      const sql = fs.readFileSync('./sql/01_categories.sql', 'utf8').trim()
      return JSON.stringify(await db.all(sql, []), null, 2)
    },
  },
  {
    name: 'total',
    description: 'Показать общую сумму расходов',
    run: async (db, args) => {
      const sql = fs.readFileSync('./sql/03_total.sql', 'utf8').trim()
      return JSON.stringify(await db.get(sql, []), null, 2)
    },
  },
  {
    name: 'total_by_category',
    description: 'Показать общую сумму расходов по категориям',
    run: async (db, args) => {
      const sql = fs.readFileSync('./sql/06_total_by_category.sql', 'utf8').trim()
      return JSON.stringify(await db.all(sql, []), null, 2)
    },
  },
  {
    name: 'total_by_date',
    description: 'Показать общую сумму расходов по дате',
    run: async (db, args) => {
      const sql = fs.readFileSync('./sql/07_total_by_date.sql', 'utf8').trim()
      return JSON.stringify(await db.all(sql, []))
    },
  },
]
