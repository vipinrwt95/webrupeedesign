import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetLoanApplication } from '../store/slices/loanSlice'

const CompletionPage = () => {
  const dispatch = useDispatch()
  const { loanCalculator } = useSelector((state) => state.loan)

  const handleStartNewApplication = () => {
    dispatch(resetLoanApplication())
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🎉 Congratulations!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your loan application has been submitted successfully!
        </p>

        {/* Application Summary */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex justify-between">
              <span className="text-gray-600">Loan Amount:</span>
              <span className="font-semibold">₹{loanCalculator.data.loanAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tenure:</span>
              <span className="font-semibold">{loanCalculator.data.tenure} months</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Interest Rate:</span>
              <span className="font-semibold">{loanCalculator.data.interestRate}% p.a.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly EMI:</span>
              <span className="font-semibold text-blue-600">₹{loanCalculator.data.emi.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">What happens next?</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                1
              </div>
              <div>
                <p className="text-blue-800 font-medium">Document Verification</p>
                <p className="text-blue-700 text-sm">Our team will verify all submitted documents within 24 hours.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                2
              </div>
              <div>
                <p className="text-blue-800 font-medium">Credit Assessment</p>
                <p className="text-blue-700 text-sm">We'll conduct a final credit check and risk assessment.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                3
              </div>
              <div>
                <p className="text-blue-800 font-medium">Loan Approval</p>
                <p className="text-blue-700 text-sm">You'll receive approval notification within 2-3 business days.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                4
              </div>
              <div>
                <p className="text-green-800 font-medium">Fund Disbursal</p>
                <p className="text-green-700 text-sm">Approved amount will be credited to your bank account instantly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">Call Us</p>
              <p className="text-sm text-gray-600">1800-123-4567</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">Email Us</p>
              <p className="text-sm text-gray-600">support@loanco.com</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">Live Chat</p>
              <p className="text-sm text-gray-600">Available 24/7</p>
            </div>
          </div>
        </div>

        {/* Application Reference */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-yellow-800">
            <span className="font-medium">Application Reference:</span> LA{Date.now().toString().slice(-8)}
            <br />
            Please save this reference number for future communications.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleStartNewApplication}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply for Another Loan
          </button>
          <button
            onClick={() => window.print()}
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Print Application
          </button>
        </div>

        {/* Footer Message */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Thank you for choosing our loan services. We appreciate your trust in us!
          </p>
        </div>
      </div>
    </div>
  )
}

export default CompletionPage