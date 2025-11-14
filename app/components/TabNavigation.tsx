import { ButtonComponent } from "@/app/components/ui/Button/button";
import { useState } from "react";
import { Space_Grotesk } from "next/font/google";

type TabNavigationProps = {
  theme: string;
  onSection: (section: string) => void;
};

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

function TabNavigationSection({theme, onSection} : TabNavigationProps) {
  const [section, setSection] = useState('pomodoro')

  const handleSection = (selectedSection: 'pomodoro' | 'shortBreak' | 'longBreak') => {
    switch (selectedSection) {
      case 'pomodoro':
        setSection('pomodoro')
        return onSection('pomodoro')
      case 'shortBreak':
        setSection('shortBreak')
        return onSection('shortBreak')
      case 'longBreak':
        setSection('longBreak')
        return onSection('longBreak')
      default:
        setSection('pomodoro')
        return onSection('pomodoro')
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className='flex gap-3 mb-10 sm:gap-8'>
        <ButtonComponent 
          theme={theme}
          className={`${spaceGrotesk.className}`} 
          onClick={() => handleSection('pomodoro')}
          activeMark={section === 'pomodoro' ? true : false}
        >
          Pomodoro  
        </ButtonComponent>
        <ButtonComponent 
          theme={theme}
          className={`${spaceGrotesk.className}`} 
          onClick={() => handleSection('shortBreak')}
          activeMark={section === 'shortBreak' ? true : false}
        >
          Short Break  
        </ButtonComponent>
        <ButtonComponent 
          theme={theme}
          className={`${spaceGrotesk.className}`} 
          onClick={() => handleSection('longBreak')}
          activeMark={section === 'longBreak' ? true : false}
        >
          Long Break  
        </ButtonComponent>
      </div>
    </div>
  );
}

export default TabNavigationSection;