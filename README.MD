## O que é a aplicação?

Essa é uma API CRUD de uma to-do list. Criada com o único objetico de exemplo de uma api que usa banco de dados.

## O que faz?

- Cria uma tarefa

```sh
# POST http://localhost:8080/task
# status: pendente | pendente | concluída
{
    "title": "Tarefa 1",
    "description": "Descrição da tarefa 1",
    "status": "pendente"
}
# return
{
    "id": 1,
    "title": "Tarefa 1",
    "description": "Descrição da tarefa 1",
    "status": "pendente"
}
```

```sh
curl -X POST http://localhost:8080/task -H "Content-Type: application/json" -d '{"title": "Tarefa 1", "description": "Descrição da tarefa 1", "status": "pendente"}'
```

- Lista todas as tarefas

```sh
# GET http://localhost:8080/tasks
```

```sh
curl http://localhost:8080/tasks
```

- Lista uma tarefa

```sh
# GET http://localhost:8080/task/:id
```

```sh
curl http://localhost:8080/task/1
```

- Atualiza uma tarefa

```sh
# PUT http://localhost:8080/task/:id
{
    "title": "Tarefa 1",
    "description": "Descrição da tarefa 1",
    "status": "concluída"
}
```

```sh
curl -X PUT http://localhost:8080/task/1 -H "Content-Type: application/json" -d '{"title": "Tarefa 1", "description": "Descrição da tarefa 1", "status": "concluída"}'
```
- Deleta uma tarefa

```sh
# DELETE http://localhost:8080/task/:id
```

```sh
curl -X DELETE http://localhost:8080/task/1
```

## Como rodar? (Sem docker)

- Instale o [NodeJS](https://nodejs.org/en/)
- Instale o [PostgreSQL](https://www.postgresql.org/download/)
- Crie um banco de dados chamado `todo`
- Clone o repositório
- Instale as dependências

```sh
npm install
```

- Rode as migrations

```sh
npx prisma migrate dev
```

## Tecnologias utilizadas

- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-000?style=for-the-badge&logo=postgresql)
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
