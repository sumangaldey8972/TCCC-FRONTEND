"use client"

import { StepProgressProps } from "@/type/publisher.type"
import { CheckCircle } from "lucide-react"

const StepProgress = ({ currentStep, completedSteps }: StepProgressProps) => {
    const steps = [
        { id: 1, title: 'Basic Info', description: 'Tell us about yourself' },
        { id: 2, title: 'Verification', description: 'Verify your website' },
    ]

    return (
        <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => {
                    const isCompleted = completedSteps.includes(step.id)
                    const isCurrent = currentStep === step.id

                    return (
                        <div key={step.id} className="flex items-center flex-1 justify-center">
                            <div className="flex flex-col items-center">
                                <div className={`relative w-5 h-5 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${isCompleted
                                    ? 'bg-green-500 text-white'
                                    : isCurrent
                                        ? 'bg-blue-500 text-white ring-4 ring-blue-500/20'
                                        : 'bg-text-primary/10 text-text-primary/40'
                                    }`}>
                                    {isCompleted ? (
                                        <CheckCircle className="w-5 h-5" />
                                    ) : (
                                        <span className="text-sm font-semibold">{step.id}</span>
                                    )}
                                </div>
                                <div className="text-center">
                                    <p className={`text-xs font-medium ${isCurrent ? 'text-text-primary/80' : 'text-text-primary/60'
                                        }`}>
                                        {step.title}
                                    </p>
                                    <p className="text-xs text-text-primary/40 mt-1 hidden md:block">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default StepProgress