import { clsx } from 'clsx'
import { Check } from 'lucide-react'

interface StepIndicatorProps {
  steps: { id: number; label: string }[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep
        const isCurrent = step.id === currentStep

        return (
          <div key={step.id} className="flex items-center">
            <div
              className={clsx(
                "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-semibold transition-colors duration-300",
                isCompleted ? "bg-primary border-primary text-primary-foreground" :
                isCurrent ? "border-primary text-primary" :
                "border-muted-foreground/30 text-muted-foreground"
              )}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : step.id}
            </div>
            {index < steps.length - 1 && (
              <div className={clsx(
                "w-12 h-0.5 mx-2",
                isCompleted ? "bg-primary" : "bg-muted-foreground/30"
              )} />
            )}
          </div>
        )
      })}
    </div>
  )
}
