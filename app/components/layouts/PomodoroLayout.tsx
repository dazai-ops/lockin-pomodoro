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
  const [customTime, setCustomTime] = useState({
    pomodoro: 25, 
    shortBreak: 5, 
    longBreak: 15
  })

  const [timeLeft, setTimeLeft] = useState<number>(0 * 60)  
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

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
        setTimeLeft(customTime.pomodoro * 60)
        break;
      case 'shortBreak':
        setTimeLeft(customTime.shortBreak * 60)
        break;
      case 'longBreak':
        setTimeLeft(customTime.longBreak * 60)
        break;
    }
  }

  // save when save button (custom time) is clicked
  const onSave = (time: { pomodoro: number, shortBreak: number, longBreak: number }) => {
    setCustomTime(time)
    setTimeLeft(time[section as keyof typeof time] * 60)
  }

  // clear interval on unmount
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // get then set custom time when page loads
  useEffect(() => {
    const getCustomTime = () => {
      const savedTime = localStorage.getItem('customTime')
      if (savedTime) {
        const parsedTime = JSON.parse(savedTime)
        setCustomTime(parsedTime)
        setTimeLeft(parsedTime.pomodoro * 60)
      }
      setIsLoaded(true)
    }
    getCustomTime()
  },[])

  // reset timer when section changes
  useEffect(() => {
    if(!isLoaded) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    resetTimer()
  }, [section])

  // update document title - showing time left
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
        onSave={onSave}
      />
      <FullScreenTrigger 
        theme={theme}
      />
    </div>
  )
}

export default PomodoroLayout
