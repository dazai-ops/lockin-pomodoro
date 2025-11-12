'use client'
import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type ThemeToggleProps = {
  onToggle?: (theme: string) => void | string,
  initialTheme?: string
}

export default function ThemeToggle({ 
  onToggle, 
  initialTheme = 'light' 
} : ThemeToggleProps) {
  const [theme, setTheme] = useState(initialTheme)

  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)

    if (onToggle) onToggle(newTheme)
  }

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle theme"
      className={`fixed top-4 right-4 z-50 flex items-center justify-center`}
    >
      {theme === 'light' ? (
        <Moon className="w-6 h-6 text-white dark:text-black transition-colors duration-300" />
      ) : (
        <Sun className="w-6 h-6 text-white dark:text-white transition-colors duration-300" />
      )}
    </button>
  )
}
