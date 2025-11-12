import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

type TimerProps = {
  theme: string
  formatTime: (seconds: number) => string
  timeLeft: number
}

function TimerSection({
  theme, 
  timeLeft, 
  formatTime
} : TimerProps) {
  return (
    <div className='flex justify-center items-center'>
      <span className={`${spaceGrotesk.className} text-9xl sm:text-9xl font-bold ${theme === 'light' ? 'text-black' : 'text-white'}`}>
        {formatTime(timeLeft)}
      </span>
    </div>
  )
}

export default TimerSection