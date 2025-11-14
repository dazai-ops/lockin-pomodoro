import React from 'react'
import { Space_Grotesk } from 'next/font/google'

type InputCustomTimeProps = {
  theme: string
  title: string
  defaultValue: number
  onChange: (value: number, section: 'Pomodoro' | 'Short Break' | 'Long Break') => void
}

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

function InputCustomTime({
  theme,
  title,
  defaultValue,
  onChange
}: InputCustomTimeProps) {
  return (
    <div className='flex flex-col items-center'>
      <h1 className={`${spaceGrotesk.className} text-md sm:text-lg font-extrabold ${theme === 'light' ? 'text-black' : 'text-white'}`}>{title}</h1>
      <div className={`w-full ${theme === 'light' ? 'bg-zinc-600' : 'bg-zinc-900'} rounded-xl px-2 py-2 shadow-sm hover:shadow-md transition-all duration-300 border ${theme === 'light' ? 'border-zinc-900 border-2' : 'border-zinc-600 border-2'} z-20`}>
        <input
          type="number"
          required
          defaultValue={defaultValue}
          className={`w-full bg-transparent outline-none text-center text-white placeholder:text-zinc-400 font-semibold text-xl sm:text-3xl ${spaceGrotesk.className}`}
          onChange={(e) => onChange(e.target.value as unknown as number, title as 'Pomodoro' | 'Short Break' | 'Long Break')}
        />
      </div>
      <h1 className={`${spaceGrotesk.className} text-md sm:text-lg font-extrabold ${theme === 'light' ? 'text-black/40' : 'text-white/40'}`}>minutes</h1>
    </div>
  )
}

export default InputCustomTime
