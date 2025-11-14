"use client"

import Image from 'next/image';
import { useState } from 'react';
import { ButtonComponent } from '@/app/components/ui/Button/button';
import TodoList from '@/app/components/TodoList';
import CustomTime from '@/app/components/CustomTime';
import { Space_Grotesk } from 'next/font/google';

type ActionProps = {
  theme: string
  isRunning: boolean
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  onSave: (time: { pomodoro: number, shortBreak: number, longBreak: number }) => void
}

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

function ActionSection({
  theme, 
  isRunning, 
  startTimer,
  pauseTimer, 
  resetTimer,
  onSave
} : ActionProps) {
  const [rotating, setRotating] = useState(false);

  const handleRotate = () => {
    setRotating(true);
    setTimeout(() => {
      setRotating(false);
    }, 500)
    resetTimer()
  }
  
  return (
    <div className='flex justify-center items-center mt-10 gap-3'>
      <ButtonComponent 
        className={`text-xl px-7 w-35 ${spaceGrotesk.className}`}
        theme={theme}
        onClick={isRunning ? pauseTimer : startTimer}
      >
        {isRunning ? 'Pause' : 'Start'}
      </ButtonComponent>
      <button 
        className='mt-2' 
        onClick={handleRotate}
      >
        <Image
          alt='counterclockwise'
          src={theme === 'light' ? "/cw-black.svg" : "/cw-white.svg"}
          width={50}
          height={50}
          className={`transition-transform duration-500
            ${rotating ? 'rotate-360' : 'rotate-0'}
          `}
        />
      </button>
      <CustomTime 
        onSave={onSave}
        theme={theme}
      />
      <TodoList 
        theme={theme} 
      />
    </div>
  )
}

export default ActionSection