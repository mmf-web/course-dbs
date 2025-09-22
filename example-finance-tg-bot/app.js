import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'
import express from 'express'
import { initDatabase } from './db.js'
import { commands } from './commands.js'

dotenv.config()

const db = await initDatabase('finance.db')
const bot = new Telegraf(process.env.TELEGRAM_TOKEN)
const srv = express()

bot.command(['help', 'start'], (ctx) => {
  const msg = commands.map((command) => `/${command.name} - ${command.description}`).join('\n')
  ctx.reply('Команды: \n' + msg)
})

commands.forEach((command) => {
  bot.command(command.name, (ctx) => {
    command
      .run(db, ctx.args)
      .then((...args) => ctx.reply(...args))
      .catch((error) => {
        console.error('Ошибка выполнения команды', command.name, error)
        ctx.reply(error)
      })
  })
})

bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

srv.get('/', async (_, res) =>
  res.json({
    expenses: await db.all('SELECT * FROM expenses ORDER BY created_at DESC', []),
  })
)
srv.listen(process.env.PORT || 3000, () => {
  console.log(`Посмотреть базу данных можно по адресу: http://localhost:${process.env.PORT || 3000}/`)
})
