import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"

export async function deleteTask(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .delete('/task/:id', {
      schema: {
        summary: 'Delete a task',
        tags: ['task'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          204: z.object({
            message: z.string(),
          }),
        },
      },
    }, async (request, reply) => {
      const { id } = request.params
      try {
        await prisma.task.delete({
          where: {
            id,
          }
        })
      } catch (error) {
        return reply.code(404).send({ message: 'Task not found' })
      }

      reply.code(204).send({ message: 'Task deleted'})
    })
}
