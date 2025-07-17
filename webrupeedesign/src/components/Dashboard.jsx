import React from 'react'
import { useSelector } from 'react-redux'
import ProgressBar from './ProgressBar'
import StepCard from './StepCard'
import CheckEligibility from './steps/CheckEligibility'
import EKYCVerification from './steps/EKYCVerification'
import SelfieUpload from './steps/SelfieUpload'
import BankStatement from './steps/BankStatement'
import LoanCalculator from './steps/LoanCalculator'
import UtilityBill from './steps/UtilityBill'
import ReferenceDetails from './steps/ReferenceDetails'
import DisbursalBankDetails from './steps/DisbursalBankDetails'
import CompletionPage from './CompletionPage'

const Dashboard = () => {
  const { currentStep, steps, isCompleted } = useSelector((state) => state.loan)

  const renderCurrentStep = () => {
    if (isCompleted) {
      return <CompletionPage />
    }

    switch (currentStep) {
      case 0:
        return <CheckEligibility />
      case 1:
        return <EKYCVerification />
      case 2:
        return <SelfieUpload />
      case 3:
        return <BankStatement />
      case 4:
        return <LoanCalculator />
      case 5:
        return <UtilityBill />
      case 6:
        return <ReferenceDetails />
      case 7:
        return <DisbursalBankDetails />
      default:
        return <CheckEligibility />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">Loan Application</h1>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <ProgressBar />

        {/* Main Content */}
        <div className="mt-8">
          {!isCompleted && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Step Cards - Left Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Application Steps
                  </h2>
                  <div className="space-y-3">
                    {steps.map((step, index) => (
                      <StepCard
                        key={step.id}
                        step={step}
                        index={index}
                        isActive={currentStep === index}
                        isCompleted={step.completed}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Current Step Content - Main Area */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm">
                  {renderCurrentStep()}
                </div>
              </div>
            </div>
          )}

          {/* Completion Page - Full Width */}
          {isCompleted && (
            <div className="max-w-4xl mx-auto">
              {renderCurrentStep()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard