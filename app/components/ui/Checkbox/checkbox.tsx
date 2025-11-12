type Task = {
  task: string
  completed: boolean
}

type CheckboxProps = {
  checked: boolean
  onToggle: () => void
}

export const CheckboxComponent = ({
  checked,
  onToggle
} : CheckboxProps) => {

  return (
    <div className="flex items-center">
      <label className="inline-flex items-center cursor-pointer select-none">
        <input 
          type="checkbox" 
          className="sr-only"
          checked={checked}
          onChange={onToggle}
        />
        <span
          className={`w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-150
            ${checked ? 'bg-zinc-800' : 'bg-zinc-600'}`}
        >
          <svg 
            className="w-3 h-3 opacity-0 scale-75 peer-checked:opacity-100 peer-checked:scale-100 transition-transform duration-150"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      </label>
    </div>
  )
}