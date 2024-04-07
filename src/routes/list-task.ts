import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"

export async function listTask(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/task/:id', {
      schema: {
        summary: 'Get unique task by id',
        tags: ['tasks'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          201: z.object({
              id: z.string(),
              title: z.string(),
              description: z.string().nullable(),
              status: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    }, async (request, reply) => {
      const { id } = request.params
      const task = await prisma.task.findUnique({
        where: {
          id,
        }
      })
      if (!task) {
        return reply.code(404).send({ message: 'Task not found' })
      }
      reply.code(200).send(task)
    })
}

