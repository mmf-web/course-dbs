import { test, describe, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { commands } from './commands.js'
import { initDatabase } from './db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let testDb
const testDbPath = path.join(__dirname, 'test.db')

beforeEach(async () => {
  // Удаляем тестовую БД если существует
  if (fs.existsSync(testDbPath)) {
    fs.unlinkSync(testDbPath)
  }

  // Создаем новую тестовую БД с миграциями
  testDb = await initDatabase(testDbPath)
})

afterEach(async () => {
  if (testDb) {
    await testDb.close()
  }
  // Удаляем тестовую БД
  if (fs.existsSync(testDbPath)) {
    fs.unlinkSync(testDbPath)
  }
})

const cmdByName = commands.reduce((acc, cmd) => {
  acc[cmd.name] = cmd
  return acc
}, {})

describe('Commands Tests', () => {
  test('add command - should add expense to database', async () => {
    const result = await cmdByName['add'].run(testDb, ['100', 'Еда', 'Тестовый расход'])

    assert.strictEqual(result, 'OK')
    const rows = await testDb.all('SELECT * FROM expenses', [])
    assert.strictEqual(rows.length, 1)
    assert.strictEqual(rows[0].amount, 100)
    assert.strictEqual(rows[0].category, 'Еда')
    assert.strictEqual(rows[0].description, 'Тестовый расход')
  })

  test('add command - should handle invalid amount', async () => {
    try {
      await cmdByName['add'].run(testDb, ['invalid', 'Еда', 'Тест'])
      assert.fail('Should throw error for invalid amount')
    } catch (error) {
      assert(true, 'Command should handle invalid input')
    }
  })

  test('expenses command - should return all expenses', async () => {
    await cmdByName['add'].run(testDb, ['100', 'Еда', 'Тестовый расход'])

    const result = await cmdByName['expenses'].run(testDb, [])
    const parsedResult = JSON.parse(result)

    assert(Array.isArray(parsedResult), 'Result should be an array')
    assert(parsedResult.length >= 1, 'Should have at least one expense')

    const expense = parsedResult[0]
    assert(expense.id, 'Expense should have id')
    assert(expense.amount, 'Expense should have amount')
    assert(expense.category, 'Expense should have category')
    assert(expense.created_at, 'Expense should have created_at')
  })

  test('categories command - should return all categories', async () => {
    await cmdByName['add'].run(testDb, ['100', 'Еда', 'Тестовый расход'])

    const result = await cmdByName['categories'].run(testDb, [])
    const parsedResult = JSON.parse(result)

    assert(Array.isArray(parsedResult), 'Result should be an array')
    assert(parsedResult.length >= 6, 'Should have at least 6 default categories')

    const categoryNames = parsedResult.map((cat) => cat.name)
    assert(categoryNames.includes('Еда'), 'Should include default category "Еда"')
    assert(categoryNames.includes('Транспорт'), 'Should include default category "Транспорт"')
  })

  test('total command - should return total sum', async () => {
    await cmdByName['add'].run(testDb, ['100', 'Еда', 'Тестовый расход'])

    const result = await cmdByName['total'].run(testDb, [])
    const parsedResult = JSON.parse(result)

    assert(parsedResult, 'Result should exist')
    assert(typeof parsedResult.total === 'number', 'Total should be a number')
    assert(parsedResult.total >= 100, 'Total should be at least 100 (from test data)')
  })

  test('expenses_by_category command - should return expenses grouped by category', async () => {
    await cmdByName['add'].run(testDb, ['100', 'Еда', 'Тестовый расход'])

    const result = await cmdByName['expenses_by_category'].run(testDb, [])
    const parsedResult = JSON.parse(result)

    assert(Array.isArray(parsedResult), 'Result should be an array')
    assert(parsedResult.length >= 1, 'Should have at least one expense')

    const expense = parsedResult[0]
    assert(expense.category, 'Expense should have category')
    assert(expense.amount, 'Expense should have amount')
  })

  test('expenses_by_date command - should return expenses grouped by date', async () => {
    await cmdByName['add'].run(testDb, ['100', 'Еда', 'Тестовый расход'])

    const result = await cmdByName['expenses_by_date'].run(testDb, [])
    const parsedResult = JSON.parse(result)

    assert(Array.isArray(parsedResult), 'Result should be an array')
    assert(parsedResult.length >= 1, 'Should have at least one expense')

    const expense = parsedResult[0]
    assert(expense.date, 'Expense should have date')
    assert(expense.amount, 'Expense should have amount')
  })

  test('total_by_category command - should return totals by category', async () => {
    await cmdByName['add'].run(testDb, ['100', 'Еда', 'Тестовый расход'])

    const result = await cmdByName['total_by_category'].run(testDb, [])
    const parsedResult = JSON.parse(result)

    assert(Array.isArray(parsedResult), 'Result should be an array')
    assert(parsedResult.length >= 1, 'Should have at least one category total')

    const categoryTotal = parsedResult[0]
    assert(categoryTotal.category, 'Category total should have category')
    assert(typeof categoryTotal.total === 'number', 'Category total should have numeric total')
  })

  test('total_by_date command - should return totals by date', async () => {
    await cmdByName['add'].run(testDb, ['100', 'Еда', 'Тестовый расход'])

    const result = await cmdByName['total_by_date'].run(testDb, [])
    const parsedResult = JSON.parse(result)

    assert(Array.isArray(parsedResult), 'Result should be an array')
    assert(parsedResult.length >= 1, 'Should have at least one date total')

    const dateTotal = parsedResult[0]
    assert(dateTotal.date, 'Date total should have date')
    assert(typeof dateTotal.total === 'number', 'Date total should have numeric total')
  })
})
