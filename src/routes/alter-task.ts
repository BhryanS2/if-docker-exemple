import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"

export async function alterTask(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .put('/task/:id', {
      schema: {
        summary: 'Alter a task',
        tags: ['task'],
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          title: z.string().min(1).max(255),
          description: z.string().optional(),
          status: z.enum(['pendente', 'fanzendo', 'concluída']),
        }),
        response: {
          200: z.object({
            id: z.string(),
            title: z.string(),
            description: z.string().nullable(),
            status: z.string(),
          })
        },
      },
    }, async (request, reply) => {
      const { id } = request.params
      const { title, description, status } = request.body

      const task = await prisma.task.update({
        where: {
          id,
        },
        data: {
          title,
          description,
          status,
        }
      })

      reply.code(200).send(task)
    }
  )
}
