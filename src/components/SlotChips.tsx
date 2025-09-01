'use client'

import { DELIVERY_SLOTS } from '@/lib/plans'

interface SlotChipsProps {
  selectedSlots: string[]
  onChange: (slots: string[]) => void
  disabled?: boolean
  planMeals?: string[]
}

export default function SlotChips({ selectedSlots, onChange, disabled = false, planMeals }: SlotChipsProps) {
  const toggleSlot = (slotId: string) => {
    if (disabled) return
    
    if (selectedSlots.includes(slotId)) {
      onChange(selectedSlots.filter(slot => slot !== slotId))
    } else {
      onChange([...selectedSlots, slotId])
    }
  }

  // Filter slots based on plan meals
  const availableSlots = planMeals?.includes('All Day') 
    ? Object.entries(DELIVERY_SLOTS)
    : planMeals?.includes('Lunch') && planMeals?.includes('Dinner')
    ? Object.entries(DELIVERY_SLOTS)
    : planMeals?.includes('Lunch')
    ? [['lunch', DELIVERY_SLOTS.lunch]]
    : [['dinner', DELIVERY_SLOTS.dinner]]

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Delivery Slots *
      </label>
      <div className="flex flex-wrap gap-2">
        {availableSlots?.map(([slotId, slot]) => {
          const slotData = typeof slot === 'string' ? { name: slot, time: '' } : slot
          return (
            <button
              key={slotId as string}
              type="button"
              onClick={() => toggleSlot(slotId as string)}
              disabled={disabled}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${selectedSlots.includes(slotId as string)
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
              `}
            >
              <div className="text-center">
                <div className="font-semibold">{slotData.name}</div>
                <div className="text-xs opacity-90">{slotData.time}</div>
              </div>
            </button>
          )
        })}
      </div>
      {selectedSlots.length === 0 && (
        <p className="text-sm text-red-600">Please select at least one delivery slot</p>
      )}
    </div>
  )
}
