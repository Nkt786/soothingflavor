'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface StepWizardProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onPrevious: () => void
  canProceed: boolean
  isSubmitting?: boolean
}

export default function StepWizard({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrevious, 
  canProceed, 
  isSubmitting = false 
}: StepWizardProps) {
  const steps = ['Preferences', 'Delivery Details', 'Review']

  return (
    <div className="mb-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
              ${index < currentStep 
                ? 'bg-green-600 text-white' 
                : index === currentStep 
                ? 'bg-green-100 text-green-600 border-2 border-green-600'
                : 'bg-gray-200 text-gray-500'
              }
            `}>
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span className={`
              ml-2 text-sm font-medium
              ${index <= currentStep ? 'text-gray-900' : 'text-gray-500'}
            `}>
              {step}
            </span>
            {index < steps.length - 1 && (
              <div className={`
                w-16 h-0.5 mx-4
                ${index < currentStep ? 'bg-green-600' : 'bg-gray-200'}
              `} />
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentStep === 1 || isSubmitting}
          className="px-6 py-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <Button
          onClick={onNext}
          disabled={!canProceed || isSubmitting}
          className="px-6 py-2 bg-green-600 hover:bg-green-700"
        >
          {currentStep === totalSteps ? 'Start Subscription' : 'Next'}
          {currentStep < totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  )
}
