import { prisma } from "@/db";
import Link from "next/link";
import TodoItem from "@/components/TodoItem";

async function getTodos() {
  return await prisma.todo.findMany()
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      complete: complete
    }
  })

  const res = await fetch("https://api.jikan.moe/v4/anime?q=haime")
  const result = await res.json()
  const data = result.data[0].mal_id
  return Number(data)
}

export default async function Home() {

  const todos = await getTodos()

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link className="border border-zinc-300 text-border-300 px-2 py-1 rounded  hover:bg-zinc-700 focus-within:bg-zinc-700 outline-none" href="/new">New</Link>
      </header>
      <ul className="pl-4">
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))
        }
      </ul>
    </>
  )
}
