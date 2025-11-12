import { useState } from 'react'
import Image from 'next/image'
import { ButtonComponent } from '@/app/components/ui/Button/button';
import TodoInput from '@/app/components/ui/Input/input';
import CardTodo from './fragments/CardTodo/cardTodo';

type TodoListProps = {
  theme: string
}

type Task = {
  task: string
  completed: boolean
}

// const toDoList = [
//   {
//     id: 1,
//     title: 'Task 1',
//     description: 'lorem100 ipsum dolor sit amet consectetur adipiscing elit',
//     completed: false,
//   },
//   {
//     id: 2,
//     title: 'Task 2',
//     description: 'Description for Task 2',
//     completed: true,
//   },
//   {
//     id: 3,
//     title: 'Task 3',
//     description: 'Description for Task 3',
//     completed: false,
//   },
//   {
//     id: 3,
//     title: 'Task 3',
//     description: 'Description for Task 3',
//     completed: true,
//   },
//   {
//     id: 3,
//     title: 'Task 3',
//     description: 'Description for Task 3',
//     completed: false,
//   },
// ]

function TodoListSection({theme} : TodoListProps) {

  const [storedTodos, setStoredTodos] = useState<Task[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className=''>
     <button 
        className='mt-2' 
        onClick={openModal}
      >
        <Image
          alt='counterclockwise'
          src={theme === 'light' ? "/note-black.svg" : "/note-white.svg"}
          width={45}
          height={45}
        />
      </button>
      
      {isModalOpen && (
        <div 
          className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 ${theme === 'light' ? 'bg-black/80' : 'bg-white/30'}`}
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-xl rounded-xl p-6 shadow-lg transform transition-all duration-300 
              ${isModalOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} ${theme === 'light' ? 'bg-zinc-200' : 'bg-black'}`}
          >
            <TodoInput
              theme={theme}
            />

            {storedTodos.length === 0 ? (
              <>
              {storedTodos.slice().sort((a, b) => Number(a.completed) - Number(b.completed)).map((todo, index) => (
                <CardTodo
                  taskCompleted={todo.completed}
                  taskValue={todo.task}
                  taskIndex={index}
                  theme={theme}
                  key={index}
                />
                ))}
              </>
            ) : (
              null
            )}
            
            <ButtonComponent
              theme='light'
              onClick={closeModal}
              className="bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition"
              borderClassName='after:rounded-xl after:border-zinc-600 after:border-2 mt-4'
              maxWidth={true}
            >
              Close
            </ButtonComponent>
          </div>
        </div>
      )}
    </div>
  )
}

export default TodoListSection
