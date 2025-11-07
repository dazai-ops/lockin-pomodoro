import React from "react"

type ButtonProps = {
  children: React.ReactNode
  theme: string
  className? : string
  activeMark?: boolean
  onClick?: () => void
}

export const ButtonComponent = ({
  children = 'Button', 
  className,
  theme, 
  onClick, 
  activeMark
}: ButtonProps) => {
  return (
    <div 
      className={`relative inline-block after:content-[''] after:absolute after:inset-[4px_-4px_-4px_4px] after:rounded-lg after:border 
        ${theme === 'light' ? 'after:border-black' : 'after:border-white'} after:z-0`}
    >
      <button 
        onClick={onClick}
        className={` relative z-10 font-semibold px-5 py-2 sm:px-6 sm:py-2 text-md sm:text-xl rounded-lg 
          transition-all duration-150 hover:-translate-y-px hover:brightness-110 active:translate-y-1 active:translate-x-1 active:shadow-none
          ${className} ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'}`}
      >
        <div 
          className={`w-2 h-2 absolute top-1.5 left-1.5 z-20  rounded-full 
            ${activeMark ? 'visible' : 'invisible'} ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
        />
        {children}
      </button>
    </div>
  )
}