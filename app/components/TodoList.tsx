import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ButtonComponent } from '@/app/components/ui/Button/button';
import TodoInput from '@/app/components/ui/Input/input';
import CardTodo from './fragments/CardTodo/cardTodo';
import { toast } from 'sonner';

type TodoListProps = {
  theme: string
}

type Task = {
  id: Date
  task: string
  completed: boolean
}

function TodoListSection({
  theme
} : TodoListProps) {

  const [storedTodos, setStoredTodos] = useState<Task[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTask, setNewTask] = useState('')

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleNewtask = (value: string) => {
    setNewTask(value)
  }

  const fetchStoredTasks = async () => {
    const storedTasks = await JSON.parse(localStorage.getItem('tasks') || '[]')
    setStoredTodos(storedTasks)
  }

  const handleSubmitTask = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    const task = {
      id: Date.now(),
      task: newTask,
      completed: false
    }
    const updateTasks = [...storedTasks, task]

    localStorage.setItem('tasks', JSON.stringify(updateTasks))
    setNewTask('')
    toast.success('Task added successfully!', { position: 'bottom-right' })

    fetchStoredTasks()
  }

  const handleToggleCompleted = (id: Date) => {
    const updated = storedTodos.map((task) =>
      task.id === id ? {...task, completed: !task.completed } : task
    )
    localStorage.setItem('tasks', JSON.stringify(updated))
    fetchStoredTasks()
  }

  const handleDeleteTask = (id: Date) => {
    const updated = storedTodos.filter((task) => task.id !== id)
    setStoredTodos(updated)

    localStorage.setItem('tasks', JSON.stringify(updated))
    fetchStoredTasks()
  }

  useEffect(() => {
    const fetchStoredTasks = async () => {
      const storedTasks = await JSON.parse(localStorage.getItem('tasks') || '[]')
      setStoredTodos(storedTasks)
    }
    fetchStoredTasks()
  }, [])

  return (
    <div>
     <button 
        className='mt-3' 
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
            className={`w-full max-w-xl rounded-2xl p-4 shadow-lg transform transition-all duration-300 mx-2
              ${isModalOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} ${theme === 'light' ? 'bg-zinc-200' : 'bg-black'}`}
          >
            {/* To-do list form input */}
            <TodoInput
              theme={theme}
              taskValue={newTask}
              onInputChange={handleNewtask}
              onTaskSubmit={handleSubmitTask}
            />
            {/* End of To-do list form input */}

            {/* To-do list card */}
            <div className="max-h-[500px] overflow-y-auto mt-3 space-y-2 scrollbar-thin scrollbar-thumb-zinc-400 dark:scrollbar-thumb-zinc-600">
              {storedTodos.length !== 0 ? (
                storedTodos
                  .slice()
                  .sort((a, b) => Number(a.completed) - Number(b.completed))
                  .map((todo, index) => (
                    <CardTodo
                      theme={theme}
                      key={index}
                      index={index}
                      taskId={todo.id}
                      taskValue={todo.task}
                      taskCompleted={todo.completed}
                      onToggleCompleted={handleToggleCompleted}
                      onButtonDelete={handleDeleteTask}
                    />
                  ))
              ) : (
                <p className="text-center text-zinc-500 mt-4">No tasks found.</p>
              )}
            </div>
            {/* End of To-do list card */}

            <ButtonComponent
              theme='light'
              onClick={closeModal}
              className="bg-purple-600 text-white hover:bg-purple-800 transition rounded-lg"
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
