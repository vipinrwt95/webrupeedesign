import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBankStatement, completeBankStatement } from '../../store/slices/loanSlice'

const BankStatement = () => {
  const dispatch = useDispatch()
  const { bankStatement } = useSelector((state) => state.loan)
  const [formData, setFormData] = useState(bankStatement.data)
  const [selectedFile, setSelectedFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required'
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

    if (!selectedFile && !formData.statementFile) {
      newErrors.file = 'Bank statement file is required'
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

    setFormData({ ...formData, [name]: formattedValue })
    dispatch(updateBankStatement({ [name]: formattedValue }))
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setErrors({ ...errors, file: 'File size should be less than 10MB' })
        return
      }

      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, file: 'Please upload PDF, JPEG, or PNG files only' })
        return
      }

      setSelectedFile(file)
      dispatch(updateBankStatement({ statementFile: file }))
      setErrors({ ...errors, file: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsUploading(true)

    // Simulate file upload and processing
    setTimeout(() => {
      dispatch(completeBankStatement())
      setIsUploading(false)
    }, 3000)
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Fetch Bank Statement</h2>
        <p className="text-gray-600">Fetch your latest bank statement online securely.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <option value="SBI">State Bank of India</option>
              <option value="HDFC">HDFC Bank</option>
              <option value="ICICI">ICICI Bank</option>
              <option value="Axis">Axis Bank</option>
              <option value="Kotak">Kotak Mahindra Bank</option>
              <option value="PNB">Punjab National Bank</option>
              <option value="BOB">Bank of Baroda</option>
              <option value="Canara">Canara Bank</option>
            </select>
            {errors.bankName && <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>}
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
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Bank Statement *
          </label>
          <div
            onClick={triggerFileSelect}
            className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
              errors.file ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400 bg-gray-50'
            }`}
          >
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {selectedFile ? (
                <div>
                  <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">Click to change file</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600">Click to upload bank statement</p>
                  <p className="text-xs text-gray-500">PDF, JPEG, PNG files up to 10MB</p>
                </div>
              )}
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
            className="hidden"
          />
          {errors.file && <p className="mt-1 text-sm text-red-600">{errors.file}</p>}
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
                Statement Requirements
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Upload last 3 months bank statement</li>
                  <li>Statement should show salary credits</li>
                  <li>Ensure all pages are clearly visible</li>
                  <li>File size should be less than 10MB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            disabled={isUploading}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Submit Statement'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BankStatement