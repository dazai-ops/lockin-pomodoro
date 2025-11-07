"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

type FullScreenTriggerProps = {
  theme: string
}

function FullScreenToggle({theme} : FullScreenTriggerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleChange)
    return () => document.removeEventListener('fullscreenchange', handleChange)
  },[])

  return (
    <div>
      <button 
        onClick={toggleFullscreen}
        className='fixed bottom-4 right-4 '
      >
        <Image
          alt='fullscreen'
          src={isFullscreen && theme === 'light' ? "/ms-black.svg" : isFullscreen && theme === 'dark' ? "/ms-white.svg" : !isFullscreen && theme === 'light' ? "/fs-black.svg" : "/fs-white.svg"}
          width={35}
          height={35}
        />
      </button>
    </div>
  )
}

export default FullScreenToggle
