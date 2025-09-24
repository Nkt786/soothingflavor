'use client'

import { DAYS_OF_WEEK } from '@/lib/plans'

interface DayChipsProps {
  selectedDays: string[]
  onChange: (days: string[]) => void
  disabled?: boolean
}

export default function DayChips({ selectedDays, onChange, disabled = false }: DayChipsProps) {
  const toggleDay = (dayId: string) => {
    if (disabled) return
    
    if (selectedDays.includes(dayId)) {
      onChange(selectedDays.filter(day => day !== dayId))
    } else {
      onChange([...selectedDays, dayId])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        <label className="text-base font-semibold text-gray-800">Days of Week</label>
        <span className="text-red-500">*</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
        {DAYS_OF_WEEK.map((day) => (
          <button
            key={day.id}
            type="button"
            onClick={() => toggleDay(day.id)}
            disabled={disabled}
            className={`
              relative flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 min-h-[60px]
              ${selectedDays.includes(day.id)
                ? 'border-green-500 bg-green-50 text-green-700 shadow-sm'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
            `}
          >
            <div className="text-xs font-medium uppercase tracking-wide">{day.name.slice(0, 3)}</div>
            <div className="text-xs text-gray-500 mt-1">{day.name}</div>
            {selectedDays.includes(day.id) && (
              <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
      {selectedDays.length === 0 && (
        <p className="text-sm text-red-600 flex items-center gap-2">
          <span>⚠️</span>
          Please select at least one day for delivery
        </p>
      )}
    </div>
  )
}
