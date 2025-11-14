import React, { useEffect } from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { ButtonComponent } from '@/app/components/ui/Button/button'
import InputCustomTime from '@/app/components/fragments/InputCustomTime/InputCustomTime'

type CustomTimeProps = {
  theme: string
  onSave: ( time: { pomodoro: number, shortBreak: number, longBreak: number }) => void
}

function CustomTime({
  theme,
  onSave
}: CustomTimeProps) {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [customTime, setCustomTime] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15
  })

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleOnChange = (time: number, section: 'Pomodoro' | 'Short Break' | 'Long Break') => {
    switch (section) {
      case'Pomodoro':
        setCustomTime(prev => ({...prev, pomodoro: Number(time)}))
        break;
      case'Short Break':
        setCustomTime(prev =>({...prev, shortBreak: Number(time)}))
        break;
      case'Long Break':
        setCustomTime(prev =>({...prev, longBreak: Number(time)}))
        break;
    }
  }

  const handleOnSubmit = () => {
    localStorage.setItem('customTime', JSON.stringify(customTime))
    onSave(customTime)
    closeModal()
  }

  const handleOnReset = () => {
    localStorage.removeItem('customTime')
    setCustomTime({
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15
    })
    onSave({
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15
    })
    closeModal()
  }

  useEffect(() => {
    const getCustomTime = () => {
      const storedTime = localStorage.getItem('customTime')
      if (storedTime) {
        setCustomTime(JSON.parse(storedTime))
      } else {
        localStorage.setItem('customTime', JSON.stringify(customTime))
      }
    }
    getCustomTime()
  }, [])

  return (
    <div>
      <button 
        className='mt-3' 
        onClick={openModal}
      >
        <Image
          alt='setting'
          src={theme === 'light' ? "/setting-black.svg" : "/setting-white.svg"}
          width={45}
          height={45}
        />
      </button>
      {isModalOpen && (
        <div 
          className={`fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 ${theme === 'light' ? 'bg-black/80' : 'bg-white/30'}`}
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md rounded-2xl p-4 shadow-lg transform transition-all duration-300 mx-2
              ${isModalOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
          >
            <div className='grid grid-cols-3 gap-2 w-full mb-10'>

              {/* Pomodoro */}
              <InputCustomTime 
                theme={theme}
                defaultValue={customTime.pomodoro}
                onChange={handleOnChange}
                title='Pomodoro'
              />

              {/* Short Break */}
              <InputCustomTime 
                theme={theme}
                defaultValue={customTime.shortBreak}
                onChange={handleOnChange}
                title='Short Break'
              />

              {/* Long Break */}
              <InputCustomTime 
                theme={theme}
                defaultValue={customTime.longBreak}
                onChange={handleOnChange}
                title='Long Break'
              />
            </div>
            <div className='flex justify-center items-center gap-3'>
              <ButtonComponent
                theme='light'
                onClick={handleOnReset}
                className="bg-red-500 text-white hover:bg-red-800 rounded-xl border-2 border-red-700"
                borderClassName='after:rounded-xl after:border-red-600 after:border-2 mt-4'
                maxWidth={true}
              >
                Reset
              </ButtonComponent>
              <ButtonComponent
                theme='light'
                onClick={handleOnSubmit}
                className="bg-green-500 text-white hover:bg-green-800 rounded-xl border-2 border-green-600"
                borderClassName='after:rounded-xl after:border-green-600 after:border-2 mt-4'
                maxWidth={true}
              >
                Save
              </ButtonComponent>
              <ButtonComponent
                theme='light'
                onClick={closeModal}
                className="bg-purple-500 text-white hover:bg-purple-800 rounded-xl border-2 border-purple-600"
                borderClassName='after:rounded-xl after:border-purple-600 after:border-2 mt-4'
                maxWidth={true}
              >
                Close
              </ButtonComponent>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomTime