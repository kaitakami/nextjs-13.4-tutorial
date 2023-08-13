"use client"

import React from 'react'
import { useState } from 'react'

type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => Promise<number>
}

const TodoItem = ({ id, title, complete, toggleTodo }: TodoItemProps) => {
  const [animeId, setAnimeId] = useState<number>(1)
  return (
    <li className='flex gap-1 items-center'>
      {animeId}
      <input id={id} type='checkbox' className='cursor-pointer peer' defaultChecked={complete} onChange={e => {
        const res = toggleTodo(id, e.target.checked)
        res.then(animeId => setAnimeId(animeId))
      }} />
      <label htmlFor={id} className='cursor-pointer peer-checked:line-through peer-checked:text-zinc-500'>
        {title}
      </label>
    </li>
  )
}

export default TodoItem
