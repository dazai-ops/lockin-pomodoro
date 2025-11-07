import React from 'react';
import { ButtonComponent } from "@/app/components/Button/button";

function TabNavigation({theme} : {theme: string}) {
  return (
    <div className="flex items-center justify-center">
      <div className='flex gap-3 mb-10 sm:gap-8'>
        <ButtonComponent theme={theme}>
          Pomodoro  
        </ButtonComponent>
        <ButtonComponent theme={theme}>
          Short Break  
        </ButtonComponent>
        <ButtonComponent theme={theme}>
          Long Break  
        </ButtonComponent>
      </div>
    </div>
  );
}

export default TabNavigation;
