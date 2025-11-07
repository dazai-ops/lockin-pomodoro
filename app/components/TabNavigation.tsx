import { ButtonComponent } from "@/app/components/Button/Button";
import { useState } from "react";

type TabNavigationProps = {
  theme: string;
  onSection: (section: string) => void;
};

function TabNavigation({theme, onSection} : TabNavigationProps) {
  const [section, setSection] = useState('pomodoro')

  const handleSection = (selectedSection: 'pomodoro' | 'shortBreak' | 'longBreak') => {
    if(selectedSection === 'pomodoro') {
      setSection('pomodoro')
      return onSection('pomodoro')
    } else if(selectedSection === 'shortBreak') {
      setSection('shortBreak')
      return onSection('shortBreak')
    } else if(selectedSection === 'longBreak') {
      setSection('longBreak')
      return onSection('longBreak')
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className='flex gap-3 mb-10 sm:gap-8'>
        <ButtonComponent 
          theme={theme} 
          onClick={() => handleSection('pomodoro')}
          activeMark={section === 'pomodoro' ? true : false}
        >
          Pomodoro  
        </ButtonComponent>
        <ButtonComponent 
          theme={theme}
          onClick={() => handleSection('shortBreak')}
          activeMark={section === 'shortBreak' ? true : false}
        >
          Short Break  
        </ButtonComponent>
        <ButtonComponent 
          theme={theme}
          onClick={() => handleSection('longBreak')}
          activeMark={section === 'longBreak' ? true : false}
        >
          Long Break  
        </ButtonComponent>
      </div>
    </div>
  );
}

export default TabNavigation;
