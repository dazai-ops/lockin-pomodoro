import React from "react"

type ButtonProps = {
  children: React.ReactNode
  className? : string
  theme: string
}

export const ButtonComponent = ({children = 'Button', className, theme}: ButtonProps) => {
  return (
    <div className={`relative inline-block after:content-[''] after:absolute after:inset-[4px_-4px_-4px_4px] after:rounded-lg after:border ${theme === 'light' ? 'after:border-black' : 'after:border-white'} after:z-0`}>
      <button className={`${className} relative z-10 ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'} font-semibold px-5 py-2 sm:px-6 sm:py-2 text-md sm:text-xl rounded-lg transition-all duration-150 
                hover:-translate-y-px hover:brightness-110 
                active:translate-y-1 active:translate-x-1 active:shadow-none`}
      >
        {children}
      </button>
    </div>
  )
}