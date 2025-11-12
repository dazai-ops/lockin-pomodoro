import React from 'react'
import { CheckboxComponent } from '@/app/components/ui/Checkbox/checkbox'
import { ButtonComponent } from '@/app/components/ui/Button/button'
import { Space_Grotesk } from 'next/font/google'
import Image from 'next/image'

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

type CardTodoProps = {
  taskIndex: number,
  taskValue: string,
  taskCompleted: boolean,
  theme: string,
}

function CardTodo({
  taskIndex,
  taskCompleted,
  taskValue,
  theme
} : CardTodoProps) {
  return (
    <div key={taskIndex}
      className={`relative  after:content-[''] after:absolute after:inset-[4px_-4px_-4px_4px] after:rounded-2xl after:border-2
        ${theme === 'light' ? 'after:border-black' : 'after:border-zinc-600'} mb-2`}
    >
      <div
        className={`relative flex items-center justify-between  ${taskCompleted ? 'bg-zinc-600' : 'bg-zinc-800'} rounded-xl p-3 mb-3 shadow-sm hover:shadow-md transition-all duration-200 z-20`}
      >
        <div className="flex items-center gap-3">
          <CheckboxComponent 
            checked={taskCompleted} 
          />
          <p className={`text-lg font-semibold text-gray-800 dark:text-gray-200 transition-all duration-200 
              ${taskCompleted ? 'line-through text-gray-400' : ''} ${spaceGrotesk.className}`}>
            {taskValue}
          </p>
        </div>

        <ButtonComponent
          theme='dark'
          borderClassName={theme === 'dark' ? 'after:border-zinc-600' : 'after:border-white'}
          className={theme === 'dark' && taskCompleted 
            ? 'bg-zinc-800' 
            : theme === 'dark' && taskCompleted === false 
            ? 'bg-zinc-600' 
            : 'bg-white'
          }
        >
          <Image
            alt="trash"
            src={theme === 'light' ? "/trash-icon.svg" : "/trash-white-icon.svg"}
            width={20}
            height={20}
            className="group-hover:scale-110 transition-transform"
          />
        </ButtonComponent>
      </div>
    </div>
  )
}

export default CardTodo
