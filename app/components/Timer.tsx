import React from 'react'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

function Timer({theme} : {theme: string}) {
  return (
    <div className='flex justify-center items-center'>
      <span className={`${spaceGrotesk.className} text-9xl sm:text-9xl font-bold ${theme === 'light' ? 'text-black' : 'text-white'}`}>
        24:10
      </span>
    </div>
  )
}

export default Timer
