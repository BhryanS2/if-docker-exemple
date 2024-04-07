import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"

export async function createTask(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/task', {
      schema: {
        summary: 'Create a new task',
        tags: ['task'],
        body: z.object({
          title: z.string().min(1).max(255),
          description: z.string().nullable().optional(),
          status: z.enum(['pendente', 'fanzendo', 'concluída']),
        }),
        response: {
          201: z.object({
            id: z.string(),
            title: z.string(),
            description: z.string().nullable(),
            status: z.string(),
          })
        },
      },
    }, async (request, reply) => {
      const { title, description, status } = request.body

      const task = await prisma.task.create({
        data: {
          title,
          description,
          status,
        }
      })

      reply.code(201).send(task)
    })
}

