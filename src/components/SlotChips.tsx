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
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        <label className="text-base font-semibold text-gray-800">Delivery Slots</label>
        <span className="text-red-500">*</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {availableSlots?.map(([slotId, slot]) => {
          const slotData = typeof slot === 'string' ? { name: slot, time: '' } : slot
          return (
            <button
              key={slotId as string}
              type="button"
              onClick={() => toggleSlot(slotId as string)}
              disabled={disabled}
              className={`
                relative flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 min-h-[70px]
                ${selectedSlots.includes(slotId as string)
                  ? 'border-green-500 bg-green-50 text-green-700 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center text-lg
                  ${selectedSlots.includes(slotId as string) ? 'bg-green-100' : 'bg-gray-100'}
                `}>
                  {slotId === 'lunch' ? '🌞' : '🌙'}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">{slotData.name}</div>
                  <div className="text-xs text-gray-500">{slotData.time}</div>
                </div>
              </div>
              {selectedSlots.includes(slotId as string) && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          )
        })}
      </div>
      {selectedSlots.length === 0 && (
        <p className="text-sm text-red-600 flex items-center gap-2">
          <span>⚠️</span>
          Please select at least one delivery slot
        </p>
      )}
    </div>
  )
}
