import React from 'react'

const StepCard = ({ step, index, isActive, isCompleted }) => {
  return (
    <div
      className={`flex items-center p-3 rounded-lg border-2 transition-all duration-300 ${
        isCompleted
          ? 'border-green-200 bg-green-50'
          : isActive
          ? 'border-blue-200 bg-blue-50'
          : 'border-gray-200 bg-gray-50'
      }`}
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
          isCompleted
            ? 'bg-green-500 text-white'
            : isActive
            ? 'bg-blue-500 text-white'
            : 'bg-gray-300 text-gray-600'
        }`}
      >
        {isCompleted ? '✓' : step.icon}
      </div>
      
      <div className="ml-3 flex-1">
        <div
          className={`text-sm font-medium ${
            isCompleted
              ? 'text-green-900'
              : isActive
              ? 'text-blue-900'
              : 'text-gray-900'
          }`}
        >
          {step.name}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {isCompleted ? 'Completed' : isActive ? 'In Progress' : 'Pending'}
        </div>
      </div>
      
      {isCompleted && (
        <div className="flex-shrink-0">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      )}
    </div>
  )
}

export default StepCard