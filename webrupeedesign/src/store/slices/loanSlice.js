import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentStep: 0,
  isCompleted: false,
  eligibility: {
    isCompleted: false,
    data: {
      name: '',
      email: '',
      phone: '',
      income: '',
      employmentType: '',
      creditScore: '',
    },
    isEligible: null,
  },
  kyc: {
    isCompleted: false,
    data: {
      aadharNumber: '',
      panNumber: '',
      address: '',
      dateOfBirth: '',
    },
    isVerified: null,
  },
  selfieUpload: {
    isCompleted: false,
    data: {
      selfieImage: null,
      selfieUrl: '',
    },
  },
  bankStatement: {
    isCompleted: false,
    data: {
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      statementFile: null,
    },
  },
  loanCalculator: {
    isCompleted: false,
    data: {
      loanAmount: 50000,
      tenure: 12,
      interestRate: 12.5,
      emi: 0,
    },
  },
  utilityBill: {
    isCompleted: false,
    data: {
      billType: '',
      billFile: null,
      billNumber: '',
    },
  },
  referenceDetails: {
    isCompleted: false,
    data: {
      reference1Name: '',
      reference1Phone: '',
      reference1Relation: '',
      reference2Name: '',
      reference2Phone: '',
      reference2Relation: '',
    },
  },
  disbursalBankDetails: {
    isCompleted: false,
    data: {
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      accountHolderName: '',
    },
  },
  steps: [
    { id: 0, name: 'Check Eligibility', icon: '🔍', completed: false },
    { id: 1, name: 'eKYC Verification', icon: '👤', completed: false },
    { id: 2, name: 'Selfie Upload', icon: '📱', completed: false },
    { id: 3, name: 'Bank Statement', icon: '📊', completed: false },
    { id: 4, name: 'Loan Calculator', icon: '🧮', completed: false },
    { id: 5, name: 'Utility Bill', icon: '📄', completed: false },
    { id: 6, name: 'Reference Details', icon: '👥', completed: false },
    { id: 7, name: 'Disbursal Bank Details', icon: '🏦', completed: false },
  ],
}

const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload
    },
    completeStep: (state, action) => {
      const stepIndex = action.payload
      state.steps[stepIndex].completed = true
      if (stepIndex < state.steps.length - 1) {
        state.currentStep = stepIndex + 1
      } else {
        state.isCompleted = true
      }
    },
    updateEligibility: (state, action) => {
      state.eligibility.data = { ...state.eligibility.data, ...action.payload }
    },
    completeEligibility: (state, action) => {
      state.eligibility.isCompleted = true
      state.eligibility.isEligible = action.payload.isEligible
      state.steps[0].completed = true
      if (action.payload.isEligible) {
        state.currentStep = 1
      }
    },
    updateKyc: (state, action) => {
      state.kyc.data = { ...state.kyc.data, ...action.payload }
    },
    completeKyc: (state) => {
      state.kyc.isCompleted = true
      state.kyc.isVerified = true
      state.steps[1].completed = true
      state.currentStep = 2
    },
    updateSelfieUpload: (state, action) => {
      state.selfieUpload.data = { ...state.selfieUpload.data, ...action.payload }
    },
    completeSelfieUpload: (state) => {
      state.selfieUpload.isCompleted = true
      state.steps[2].completed = true
      state.currentStep = 3
    },
    updateBankStatement: (state, action) => {
      state.bankStatement.data = { ...state.bankStatement.data, ...action.payload }
    },
    completeBankStatement: (state) => {
      state.bankStatement.isCompleted = true
      state.steps[3].completed = true
      state.currentStep = 4
    },
    updateLoanCalculator: (state, action) => {
      state.loanCalculator.data = { ...state.loanCalculator.data, ...action.payload }
    },
    completeLoanCalculator: (state) => {
      state.loanCalculator.isCompleted = true
      state.steps[4].completed = true
      state.currentStep = 5
    },
    updateUtilityBill: (state, action) => {
      state.utilityBill.data = { ...state.utilityBill.data, ...action.payload }
    },
    completeUtilityBill: (state) => {
      state.utilityBill.isCompleted = true
      state.steps[5].completed = true
      state.currentStep = 6
    },
    updateReferenceDetails: (state, action) => {
      state.referenceDetails.data = { ...state.referenceDetails.data, ...action.payload }
    },
    completeReferenceDetails: (state) => {
      state.referenceDetails.isCompleted = true
      state.steps[6].completed = true
      state.currentStep = 7
    },
    updateDisbursalBankDetails: (state, action) => {
      state.disbursalBankDetails.data = { ...state.disbursalBankDetails.data, ...action.payload }
    },
    completeDisbursalBankDetails: (state) => {
      state.disbursalBankDetails.isCompleted = true
      state.steps[7].completed = true
      state.isCompleted = true
    },
    resetLoanApplication: (state) => {
      return initialState
    },
  },
})

export const {
  setCurrentStep,
  completeStep,
  updateEligibility,
  completeEligibility,
  updateKyc,
  completeKyc,
  updateSelfieUpload,
  completeSelfieUpload,
  updateBankStatement,
  completeBankStatement,
  updateLoanCalculator,
  completeLoanCalculator,
  updateUtilityBill,
  completeUtilityBill,
  updateReferenceDetails,
  completeReferenceDetails,
  updateDisbursalBankDetails,
  completeDisbursalBankDetails,
  resetLoanApplication,
} = loanSlice.actions

export default loanSlice.reducer