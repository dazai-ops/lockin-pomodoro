import Image from 'next/image';
import { ButtonComponent } from '@/app/components/ui/Button/button';
import { Space_Grotesk } from 'next/font/google';
import { toast } from 'sonner';

type TodoInputProps = {
  theme : string
  taskValue?: string
  onInputChange: (value: string) => void
  onTaskSubmit: () => void
}

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

function TodoInput({
  theme,
  taskValue,
  onInputChange,
  onTaskSubmit
} : TodoInputProps) {
  
  const handleSubmit = () => {
    if (taskValue === '') {
      toast.info('Fill the task first!', { position: 'bottom-right' })
      return
    }
    onTaskSubmit()
  }

  return (
    <div className=" relative flex items-center gap-3 bg-white/70 dark:bg-zinc-800 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 border border-zinc-200 dark:border-zinc-700 z-20">
      <input
        type="text"
        maxLength={30}
        required
        placeholder="What needs to be done..."
        className={`flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder:text-zinc-400 font-semibold text-sm sm:text-lg ${spaceGrotesk.className} `}
        value={taskValue}
        onChange={(e) => onInputChange(e.target.value)}
      />
      <ButtonComponent
        theme='dark'
        borderClassName={`mr-[-8px] ${theme === 'dark' ? 'after:border-zinc-600' : 'after:border-white'}`}
        className={`${theme === 'light' ? 'bg-white' : 'bg-zinc-600'}`}
        onClick={handleSubmit}
      > 
        <Image
          alt='plus'
          src={theme === 'light' ? "/add-icon.svg" : "/add-white-icon.svg"}
          width={20}
          height={20}
        />
      </ButtonComponent>
    </div>
  )
}

export default TodoInput
