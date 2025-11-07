"use client"

import { useState } from 'react';

import TabNavigation from '@/app/components/TabNavigation';
import Timer from '@/app/components/Timer';
import Action from '@/app/components/Action';
import FullScreenTrigger from '@/app/components/FullScreenToggle/FullScreenToggle';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';

function Page() {
  const [theme, setTheme] = useState('light')
  console.log(theme)

  return (
    <div className={`w-full min-h-screen flex flex-col justify-center items-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <ThemeToggle onToggle={setTheme}/>
      <TabNavigation theme={theme}/>
      <Timer theme={theme}/>
      <Action theme={theme}/>
      <FullScreenTrigger theme={theme}/>
    </div>
  )
}

export default Page
