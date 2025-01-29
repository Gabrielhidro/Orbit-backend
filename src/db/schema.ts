import { createId } from '@paralleldrive/cuid2'
import { integer, timestamp, text, pgTable } from 'drizzle-orm/pg-core'

// Definindo uma tabela chamada goals usando o Drizzle ORM

export const goals = pgTable('goals', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const goalCompletions = pgTable('goal_completions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  goalId: text('goal_id')
    .references(() => goals.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

// 'npx drizzle-kit generate' comando para gerar as migrations
// (arquivos que contém as instruções para criar ou alterar tabelas no banco de dados)

// 'npx drizzle-kit migrate' comando para executar as migrations geradas
// 'npx drizzle-kit studio' comando para abrir o Drizzle Studio (Banco de dados visual)
