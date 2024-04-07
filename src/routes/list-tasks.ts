import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"

export async function listTasks(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/tasks', {
      schema: {
        summary: 'Get all tasks',
        tags: ['tasks'],
        response: {
          201: z.array(
            z.object({
              id: z.string(),
              title: z.string(),
              description: z.string().nullable(),
              status: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
            })
          )
        },
      },
    }, async (request, reply) => {
      const tasks = await prisma.task.findMany()
      reply.code(200).send(tasks)
    })
}

