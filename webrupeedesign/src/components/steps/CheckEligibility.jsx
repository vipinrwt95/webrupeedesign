import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateEligibility, completeEligibility } from '../../store/slices/loanSlice'

const CheckEligibility = () => {
  const dispatch = useDispatch()
  const { eligibility } = useSelector((state) => state.loan)
  const [formData, setFormData] = useState(eligibility.data)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits'
    }

    if (!formData.income) {
      newErrors.income = 'Monthly income is required'
    } else if (formData.income < 15000) {
      newErrors.income = 'Minimum income should be ₹15,000'
    }

    if (!formData.employmentType) {
      newErrors.employmentType = 'Employment type is required'
    }

    if (!formData.creditScore) {
      newErrors.creditScore = 'Credit score is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    dispatch(updateEligibility({ [name]: value }))
    
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

    // Simulate API call with dummy data
    setTimeout(() => {
      // Check eligibility based on income and credit score
      const incomeEligible = formData.income >= 25000
      const creditEligible = formData.creditScore.includes('650-') || formData.creditScore.includes('750-')
      const isEligible = incomeEligible && creditEligible
      
      dispatch(completeEligibility({ isEligible }))
      setIsSubmitting(false)
    }, 2000)
  }

  if (eligibility.isEligible === false) {
    return (
      <div className="p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">❌</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Not Eligible
          </h3>
          <p className="text-gray-600 mb-6">
            Unfortunately, you don't meet our current eligibility criteria. Please try again later or contact our support team.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Eligibility</h2>
        <p className="text-gray-600">Let's check your eligibility first.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter 10-digit phone number"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Income (₹) *
            </label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.income ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter monthly income"
            />
            {errors.income && <p className="mt-1 text-sm text-red-600">{errors.income}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employment Type *
            </label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.employmentType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select employment type</option>
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self Employed</option>
              <option value="business">Business Owner</option>
              <option value="freelancer">Freelancer</option>
            </select>
            {errors.employmentType && <p className="mt-1 text-sm text-red-600">{errors.employmentType}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Credit Score *
            </label>
            <select
              name="creditScore"
              value={formData.creditScore}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.creditScore ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select credit score range</option>
              <option value="300-549">300-549 (Poor)</option>
              <option value="550-649">550-649 (Fair)</option>
              <option value="650-749">650-749 (Good)</option>
              <option value="750-850">750-850 (Excellent)</option>
            </select>
            {errors.creditScore && <p className="mt-1 text-sm text-red-600">{errors.creditScore}</p>}
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
                Checking Eligibility...
              </>
            ) : (
              'Check Eligibility'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CheckEligibility