import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateDisbursalBankDetails, completeDisbursalBankDetails } from '../../store/slices/loanSlice'

const DisbursalBankDetails = () => {
  const dispatch = useDispatch()
  const { disbursalBankDetails } = useSelector((state) => state.loan)
  const [formData, setFormData] = useState(disbursalBankDetails.data)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = 'Account holder name is required'
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required'
    } else if (formData.accountNumber.length < 9 || formData.accountNumber.length > 18) {
      newErrors.accountNumber = 'Account number should be 9-18 digits'
    }

    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = 'IFSC code is required'
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = 'Invalid IFSC code format'
    }

    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === 'ifscCode') {
      formattedValue = value.toUpperCase()
    }

    if (name === 'accountHolderName') {
      formattedValue = value.toUpperCase()
    }

    setFormData({ ...formData, [name]: formattedValue })
    dispatch(updateDisbursalBankDetails({ [name]: formattedValue }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      dispatch(completeDisbursalBankDetails())
      setIsSubmitting(false)
    }, 3000)
  }

  const bankOptions = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Union Bank of India',
    'IDFC FIRST Bank',
    'IndusInd Bank',
    'YES Bank',
    'Federal Bank',
    'South Indian Bank',
    'Other'
  ]

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Disbursal Bank Details</h2>
        <p className="text-gray-600">Share bank details for verification</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Holder Name *
            </label>
            <input
              type="text"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.accountHolderName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter account holder name"
            />
            {errors.accountHolderName && <p className="mt-1 text-sm text-red-600">{errors.accountHolderName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Number *
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.accountNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter account number"
            />
            {errors.accountNumber && <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IFSC Code *
            </label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleInputChange}
              maxLength="11"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.ifscCode ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter IFSC code"
            />
            {errors.ifscCode && <p className="mt-1 text-sm text-red-600">{errors.ifscCode}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bank Name *
            </label>
            <select
              name="bankName"
              value={formData.bankName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.bankName ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select your bank</option>
              {bankOptions.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
            {errors.bankName && <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>}
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Secure Processing
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Your bank details are encrypted and secure</li>
                  <li>Loan will be disbursed directly to this account</li>
                  <li>Ensure account details are accurate to avoid delays</li>
                  <li>Account should be active and operational</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Important Note
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Please ensure that the account holder name matches exactly with your KYC documents. 
                  Any mismatch may cause delays in loan disbursal.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Complete Application'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default DisbursalBankDetails