"use client"

import Image from 'next/image';
import { useState } from 'react';
import { ButtonComponent } from '@/app/components/Button/button';

function ActionButton({theme} : {theme: string}) {
  const [rotating, setRotating] = useState(false);

  const handleRotate = () => {
    setRotating(true);
    setTimeout(() => {
      setRotating(false);
    }, 500)
  }
  
  return (
    <div className='flex justify-center items-center mt-10 gap-3'>
      <ButtonComponent className='text-xl px-7' theme={theme}>
        Start
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
    </div>
  )
}

export default ActionButton
