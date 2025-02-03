import dayjs from 'dayjs'
import { db } from '../db'
import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { goalCompletions, goals } from '../db/schema'

export async function getWeekPendingGoals() {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalsCreratedUpToWeek = db.$with('goals_created_uo_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  )

  const goalsCompletionCounts = db.$with('goals_completion_counts').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCounts'),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const pendingGoals = await db
    .with(goalsCreratedUpToWeek, goalsCompletionCounts)
    .select({
      id: goalsCreratedUpToWeek.id,
      title: goalsCreratedUpToWeek.title,
      desiredWeeklyFrequency: goalsCreratedUpToWeek.desiredWeeklyFrequency,
      completionCount: sql`
        coalesce(${goalsCompletionCounts.completionCount}, 0)
      `.mapWith(Number),
    })
    .from(goalsCreratedUpToWeek)
    .leftJoin(
      goalsCompletionCounts,
      eq(goalsCompletionCounts.goalId, goalsCreratedUpToWeek.id)
    )

  return { pendingGoals }
}
