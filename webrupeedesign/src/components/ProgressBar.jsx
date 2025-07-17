import React from 'react'
import { useSelector } from 'react-redux'

const ProgressBar = () => {
  const { steps, currentStep } = useSelector((state) => state.loan)
  
  const completedSteps = steps.filter(step => step.completed).length
  const progressPercentage = (completedSteps / steps.length) * 100

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Progress</h2>
        <span className="text-sm font-medium text-gray-600">
          {completedSteps} of {steps.length} completed
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div
          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      {/* Step Indicators */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                step.completed
                  ? 'bg-green-500 text-white'
                  : currentStep === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.completed ? '✓' : index + 1}
            </div>
            <div className="mt-2 text-xs text-center max-w-16">
              <span className={`${
                step.completed
                  ? 'text-green-600 font-medium'
                  : currentStep === index
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-500'
              }`}>
                {step.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressBar