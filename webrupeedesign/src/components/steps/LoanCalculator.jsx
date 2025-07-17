import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateLoanCalculator, completeLoanCalculator } from '../../store/slices/loanSlice'

const LoanCalculator = () => {
  const dispatch = useDispatch()
  const { loanCalculator } = useSelector((state) => state.loan)
  const [formData, setFormData] = useState(loanCalculator.data)

  // Calculate EMI whenever loan amount, tenure, or interest rate changes
  useEffect(() => {
    const calculateEMI = () => {
      const principal = formData.loanAmount
      const rate = formData.interestRate / 100 / 12
      const tenure = formData.tenure

      if (principal && rate && tenure) {
        const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1)
        return Math.round(emi)
      }
      return 0
    }

    const emi = calculateEMI()
    setFormData(prev => ({ ...prev, emi }))
    dispatch(updateLoanCalculator({ ...formData, emi }))
  }, [formData.loanAmount, formData.tenure, formData.interestRate, dispatch])

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
    dispatch(updateLoanCalculator({ [name]: value }))
  }

  const handleSubmit = () => {
    dispatch(completeLoanCalculator())
  }

  const totalPayment = formData.emi * formData.tenure
  const totalInterest = totalPayment - formData.loanAmount

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Loan Calculator</h2>
        <p className="text-gray-600">Choose the loan amount and tenure as per your requirements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Loan Amount: ₹{formData.loanAmount.toLocaleString()}
            </label>
            <input
              type="range"
              min="10000"
              max="1000000"
              step="5000"
              value={formData.loanAmount}
              onChange={(e) => handleInputChange('loanAmount', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹10,000</span>
              <span>₹10,00,000</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tenure: {formData.tenure} months
            </label>
            <input
              type="range"
              min="6"
              max="60"
              step="6"
              value={formData.tenure}
              onChange={(e) => handleInputChange('tenure', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>6 months</span>
              <span>60 months</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Interest Rate: {formData.interestRate}% per annum
            </label>
            <input
              type="range"
              min="8"
              max="24"
              step="0.5"
              value={formData.interestRate}
              onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>8%</span>
              <span>24%</span>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Note
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  Interest rates may vary based on your credit score and income. Final rates will be confirmed after application approval.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Results */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Loan Summary</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
              <span className="text-gray-600">Principal Amount</span>
              <span className="font-semibold text-gray-900">₹{formData.loanAmount.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
              <span className="text-gray-600">Interest Rate</span>
              <span className="font-semibold text-gray-900">{formData.interestRate}% p.a.</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
              <span className="text-gray-600">Tenure</span>
              <span className="font-semibold text-gray-900">{formData.tenure} months</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-blue-700 font-medium">Monthly EMI</span>
              <span className="font-bold text-blue-900 text-xl">₹{formData.emi.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
              <span className="text-gray-600">Total Interest</span>
              <span className="font-semibold text-gray-900">₹{totalInterest.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
              <span className="text-gray-600">Total Payment</span>
              <span className="font-semibold text-gray-900">₹{totalPayment.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Breakdown Chart */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Payment Breakdown</h4>
            <div className="flex h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="bg-blue-500"
                style={{ width: `${(formData.loanAmount / totalPayment) * 100}%` }}
              ></div>
              <div 
                className="bg-red-400"
                style={{ width: `${(totalInterest / totalPayment) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                <span>Principal ({((formData.loanAmount / totalPayment) * 100).toFixed(1)}%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-400 rounded mr-1"></div>
                <span>Interest ({((totalInterest / totalPayment) * 100).toFixed(1)}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-8">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue with this Loan
        </button>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}

export default LoanCalculator