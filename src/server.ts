import fastify from "fastify";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";

import { serializerCompiler, validatorCompiler, jsonSchemaTransform, ZodTypeProvider } from 'fastify-type-provider-zod'
import { errorHandler } from "./error-handler";

import { createTask } from "./routes/create-task";
import { alterTask } from "./routes/alter-task";
import { deleteTask } from "./routes/delete-task";
import { listTasks } from "./routes/list-tasks";
import { listTask } from "./routes/list-task";

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'If-exemple',
      description: 'Especifica valores de entrada e saída para as rotas',
      version: '1.0.0'
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTask)
app.register(alterTask)
app.register(deleteTask)
app.register(listTasks)
app.register(listTask)

app.setErrorHandler(errorHandler)

app.listen({ port: 8080, host: '0.0.0.0' })
.then(() => {
  console.log('HTTP server running!')
  console.log('Swagger UI available at http://localhost:8080/docs')
})
