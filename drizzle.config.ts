import { defineConfig } from 'drizzle-kit'
import { env } from './src/env'

// Configuração Drizzle Kit, uma ferramenta que auxilia na geração e execução
// de migrações de banco de dados para projetos que utilizam o Drizzle ORM.

export default defineConfig({
  dialect: 'postgresql',
  out: './.migrations',
  schema: './src/db/schema.ts',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})

// O Drizzle Kit facilita a criação e execução de migrações de banco de dados
