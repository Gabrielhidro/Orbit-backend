import z from 'zod'

// Zod é uma biblioteca de validação de esquemas para TypeScript,
// que permite definir e validar estruturas de dados de forma segura e declarativa.

// Esquema Zod que define a estrutura esperada das variáveis de ambiente.
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
})

// Valida o objeto process.env (que contém todas as variáveis de ambiente) com base no esquema definido.
export const env = envSchema.parse(process.env)

// Se algo estiver errado, o aplicativo falhará imediatamente com uma mensagem de erro clara,
// em vez de falhar silenciosamente ou se comportar de maneira imprevisível mais tarde.
