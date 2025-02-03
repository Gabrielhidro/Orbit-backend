import dayjs from 'dayjs'
import { client, db } from '.'
import { goalCompletions, goals } from './schema'

// Exemplo de script para preencher o banco de dados com alguns dados iniciais

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      {
        title: 'Learn to code',
        desiredWeeklyFrequency: 3,
      },
      {
        title: 'Exercise',
        desiredWeeklyFrequency: 3,
      },
      {
        title: 'Read',
        desiredWeeklyFrequency: 2,
      },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    {
      goalId: result[0].id,
      createdAt: startOfWeek.add(1, 'day').toDate(),
    },
    {
      goalId: result[1].id,
      createdAt: startOfWeek.toDate(),
    },
    {
      goalId: result[2].id,
      createdAt: startOfWeek.toDate(),
    },
  ])
}

seed().finally(() => {
  client.end()
})
