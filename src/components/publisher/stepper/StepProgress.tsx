"use client"

import { CheckCircle } from "lucide-react"

interface StepProgressProps {
    steps: Array<{ id: number; title: string; description: string }>
    currentStep: number
    completedSteps: number[]
}

const StepProgress = ({ steps, currentStep, completedSteps }: StepProgressProps) => {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                {steps.map((stepItem, index) => (
                    <div key={stepItem.id} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                            <div className={`relative w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${currentStep > stepItem.id
                                ? 'bg-green-500 text-white'
                                : currentStep === stepItem.id
                                    ? 'bg-blue-500 text-white ring-4 ring-blue-500/20'
                                    : 'bg-text-primary/10 text-text-primary/40'
                                }`}>
                                {currentStep > stepItem.id ? (
                                    <CheckCircle className="w-5 h-5" />
                                ) : (
                                    <span className="text-sm font-semibold">{stepItem.id}</span>
                                )}
                            </div>
                            <div className="text-center">
                                <p className={`text-xs font-medium ${currentStep >= stepItem.id ? 'text-text-primary/80' : 'text-text-primary/40'
                                    }`}>
                                    {stepItem.title}
                                </p>
                                <p className="text-xs text-text-primary/40 mt-1 hidden md:block">
                                    {stepItem.description}
                                </p>
                            </div>
                        </div>

                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${currentStep > stepItem.id ? 'bg-green-500' : 'bg-text-primary/10'
                                }`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StepProgress