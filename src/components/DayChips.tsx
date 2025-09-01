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
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Days of Week *
      </label>
      <div className="flex flex-wrap gap-2">
        {DAYS_OF_WEEK.map((day) => (
          <button
            key={day.id}
            type="button"
            onClick={() => toggleDay(day.id)}
            disabled={disabled}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${selectedDays.includes(day.id)
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
            `}
          >
            {day.name}
          </button>
        ))}
      </div>
      {selectedDays.length === 0 && (
        <p className="text-sm text-red-600">Please select at least one day</p>
      )}
    </div>
  )
}
