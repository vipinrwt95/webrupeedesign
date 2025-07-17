import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateReferenceDetails, completeReferenceDetails } from '../../store/slices/loanSlice'

const ReferenceDetails = () => {
  const dispatch = useDispatch()
  const { referenceDetails } = useSelector((state) => state.loan)
  const [formData, setFormData] = useState(referenceDetails.data)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    // Reference 1 validation
    if (!formData.reference1Name.trim()) {
      newErrors.reference1Name = 'Reference 1 name is required'
    }

    if (!formData.reference1Phone.trim()) {
      newErrors.reference1Phone = 'Reference 1 phone is required'
    } else if (!/^\d{10}$/.test(formData.reference1Phone)) {
      newErrors.reference1Phone = 'Phone number must be 10 digits'
    }

    if (!formData.reference1Relation) {
      newErrors.reference1Relation = 'Reference 1 relation is required'
    }

    // Reference 2 validation
    if (!formData.reference2Name.trim()) {
      newErrors.reference2Name = 'Reference 2 name is required'
    }

    if (!formData.reference2Phone.trim()) {
      newErrors.reference2Phone = 'Reference 2 phone is required'
    } else if (!/^\d{10}$/.test(formData.reference2Phone)) {
      newErrors.reference2Phone = 'Phone number must be 10 digits'
    }

    if (!formData.reference2Relation) {
      newErrors.reference2Relation = 'Reference 2 relation is required'
    }

    // Check if phone numbers are different
    if (formData.reference1Phone === formData.reference2Phone && formData.reference1Phone) {
      newErrors.reference2Phone = 'Reference phone numbers must be different'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    dispatch(updateReferenceDetails({ [name]: value }))
    
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
      dispatch(completeReferenceDetails())
      setIsSubmitting(false)
    }, 2000)
  }

  const relationOptions = [
    { value: 'friend', label: 'Friend' },
    { value: 'colleague', label: 'Colleague' },
    { value: 'neighbor', label: 'Neighbor' },
    { value: 'relative', label: 'Relative' },
    { value: 'business_partner', label: 'Business Partner' },
  ]

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reference Details</h2>
        <p className="text-gray-600">Share your references.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Reference 1 */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Reference 1</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="reference1Name"
                value={formData.reference1Name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.reference1Name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter reference name"
              />
              {errors.reference1Name && <p className="mt-1 text-sm text-red-600">{errors.reference1Name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="reference1Phone"
                value={formData.reference1Phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.reference1Phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter 10-digit phone number"
              />
              {errors.reference1Phone && <p className="mt-1 text-sm text-red-600">{errors.reference1Phone}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relation *
              </label>
              <select
                name="reference1Relation"
                value={formData.reference1Relation}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.reference1Relation ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select relation</option>
                {relationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.reference1Relation && <p className="mt-1 text-sm text-red-600">{errors.reference1Relation}</p>}
            </div>
          </div>
        </div>

        {/* Reference 2 */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Reference 2</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="reference2Name"
                value={formData.reference2Name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.reference2Name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter reference name"
              />
              {errors.reference2Name && <p className="mt-1 text-sm text-red-600">{errors.reference2Name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="reference2Phone"
                value={formData.reference2Phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.reference2Phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter 10-digit phone number"
              />
              {errors.reference2Phone && <p className="mt-1 text-sm text-red-600">{errors.reference2Phone}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relation *
              </label>
              <select
                name="reference2Relation"
                value={formData.reference2Relation}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.reference2Relation ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select relation</option>
                {relationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.reference2Relation && <p className="mt-1 text-sm text-red-600">{errors.reference2Relation}</p>}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Important Information
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Please provide references who know you personally</li>
                  <li>References should be available to verify your details</li>
                  <li>Do not provide family members as references</li>
                  <li>Ensure phone numbers are active and reachable</li>
                </ul>
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
                Submitting...
              </>
            ) : (
              'Submit References'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReferenceDetails