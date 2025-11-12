"use client"

import { useState, useRef, useEffect } from 'react';
import TabNavigation from '@/app/components/TabNavigation';
import Timer from '@/app/components/Timer';
import Action from '@/app/components/Action';
import FullScreenTrigger from '@/app/components/fragments/FullScreenToggle/fullscreenToggle';
import ThemeToggle from '@/app/components/fragments/ThemeToggle/themeToggle';

function PomodoroLayout() {
  const [theme, setTheme] = useState('light')
  const [section, setSection] = useState('pomodoro')
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('/finish.mp3')
  }, [])

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const startTimer = () => {
    if(isRunning) return
    setIsRunning(true)

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if(prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          setIsRunning(false)
          
          if(audioRef.current){
            audioRef.current.currentTime = 0
            audioRef.current.play()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const pauseTimer = () => {
    if(intervalRef.current) {
      clearInterval(intervalRef.current)
      setIsRunning(false)
    }
  }

  const resetTimer = () => {
    if(intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setIsRunning(false)
    switch (section) {
      case 'pomodoro':
        setTimeLeft(25 * 60)
        break;
      case 'shortBreak':
        setTimeLeft(5 * 60)
        break;
      case 'longBreak':
        setTimeLeft(10 * 60)
        break;
    }
  }

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    const id = setTimeout(() => resetTimer(), 0)
    return () => clearTimeout(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section])

  useEffect(() => {
    const formatted = formatTime(timeLeft)
    document.title = `${formatted}`
  }, [timeLeft])

  return (
    <div 
      className={`w-full min-h-screen flex flex-col justify-center items-center 
        ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
    >
      <ThemeToggle 
        onToggle={setTheme}
      />
      <TabNavigation 
        theme={theme}
        onSection={setSection}
      />
      <Timer 
        theme={theme}
        formatTime={formatTime}
        timeLeft={timeLeft}
      />
      <Action 
        theme={theme} 
        isRunning={isRunning}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
      />
      <FullScreenTrigger 
        theme={theme}
      />
    </div>
  )
}

export default PomodoroLayout
