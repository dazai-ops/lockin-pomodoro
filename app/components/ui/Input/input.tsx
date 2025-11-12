import {useState } from 'react'
import { ButtonComponent } from '@/app/components/ui/Button/button';
import Image from 'next/image';
import { Space_Grotesk } from 'next/font/google';
import { toast } from 'sonner';

type TodoInputProps = {
  theme : string
}

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

function TodoInput({
  theme
} : TodoInputProps) {

  const [taskValue, setTaskValue] = useState('')

  const handleSubmit = () => {
    if (taskValue === '') {
      toast.info('Fill the task first!', {
        position: 'bottom-right',
        
      })
      return
    }
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    const newTask = {
      task: taskValue,
      completed: false
    }
    const updateTasks = [...storedTasks, newTask]

    localStorage.setItem('tasks', JSON.stringify(updateTasks))
    setTaskValue('')

    toast.success('Task added successfully!', {
      position: 'bottom-right',
    })
  }

  const handleInput = (value : string) => {
    setTaskValue(value)
  }

  return (
    <div className={`relative after:content-[''] after:absolute after:inset-[4px_-4px_-4px_4px] after:rounded-2xl after:border-2 mb-3
          ${theme === 'light' ? 'after:border-black' : 'after:border-zinc-600'}`}
    > 
      <div className=" relative flex items-center gap-3 bg-white/70 dark:bg-zinc-800 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 border border-zinc-200 dark:border-zinc-700 z-20">
        <input
          type="text"
          required
          placeholder="Tulis to-do baru..."
          className={`flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder:text-zinc-400 font-semibold text-lg ${spaceGrotesk.className} `}
          value={taskValue}
          onChange={(e) => handleInput(e.target.value)}
        />
        <ButtonComponent
          theme='dark'
          borderClassName={`mr-[-4px] ${theme === 'dark' ? 'after:border-zinc-600' : 'after:border-white'}`}
          className={`${theme === 'light' ? 'bg-white' : 'bg-zinc-600'}`}
          onClick={() => handleSubmit()}
        > 
          <Image
            alt='plus'
            src={theme === 'light' ? "/add-icon.svg" : "/add-white-icon.svg"}
            width={20}
            height={20}
          />
        </ButtonComponent>
      </div>
    </div>
  )
}

export default TodoInput
