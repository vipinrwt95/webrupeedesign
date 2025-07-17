# Loan Disbursal Application

A comprehensive loan application system built with React, Redux Toolkit, and Tailwind CSS. This application provides a complete end-to-end loan application flow with validation, progress tracking, and dummy data simulation.

## 🚀 Features

### Complete Loan Application Journey
- **Check Eligibility** - Initial eligibility assessment based on income and credit score
- **eKYC Verification** - Aadhar and PAN verification with age validation
- **Selfie Upload** - Profile image upload with guidelines
- **Bank Statement** - Secure bank statement upload and verification
- **Loan Calculator** - Interactive EMI calculator with real-time updates
- **Utility Bill** - Document upload for address verification
- **Reference Details** - Contact reference collection and validation
- **Disbursal Bank Details** - Final bank account details for loan disbursal

### Key Features
- 📊 **Progress Tracking** - Visual progress bar showing completion status
- ✅ **Form Validation** - Comprehensive client-side validation
- 🔄 **Redux State Management** - Centralized state management with Redux Toolkit
- 📱 **Responsive Design** - Mobile-first responsive design
- 🎨 **Modern UI** - Clean, professional interface with Tailwind CSS
- ⚡ **Dummy Data Simulation** - Complete journey simulation without backend APIs
- 📁 **File Upload** - Support for images and documents with validation
- 🧮 **EMI Calculator** - Real-time loan calculation with interactive sliders

## 🛠️ Technology Stack

- **React 19.1.0** - Frontend framework
- **Redux Toolkit** - State management
- **React Router DOM** - Navigation and routing
- **Tailwind CSS** - Styling and responsive design
- **Vite** - Build tool and development server

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd webrupeedesign
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx          # Main dashboard component
│   ├── ProgressBar.jsx        # Progress tracking component
│   ├── StepCard.jsx          # Individual step display
│   ├── CompletionPage.jsx    # Success page after completion
│   └── steps/                # Individual step components
│       ├── CheckEligibility.jsx
│       ├── EKYCVerification.jsx
│       ├── SelfieUpload.jsx
│       ├── BankStatement.jsx
│       ├── LoanCalculator.jsx
│       ├── UtilityBill.jsx
│       ├── ReferenceDetails.jsx
│       └── DisbursalBankDetails.jsx
├── store/
│   ├── store.js              # Redux store configuration
│   └── slices/
│       └── loanSlice.js      # Loan application state slice
├── App.jsx                   # Main app component
├── main.jsx                  # App entry point
└── index.css                 # Global styles with Tailwind
```

## 🎯 Application Flow

### Step 1: Check Eligibility
- Personal information collection
- Income and employment validation
- Credit score assessment
- Eligibility determination (Income ≥ ₹25,000 & Credit Score ≥ 650)

### Step 2: eKYC Verification
- Aadhar number validation (12 digits)
- PAN number validation (ABCDE1234F format)
- Address collection
- Age verification (≥ 18 years)

### Step 3: Selfie Upload
- Image upload with size validation (≤ 5MB)
- Real-time preview
- Upload guidelines and tips

### Step 4: Bank Statement
- Bank selection from dropdown
- Account number and IFSC validation
- Statement file upload (PDF/JPEG/PNG ≤ 10MB)

### Step 5: Loan Calculator
- Interactive loan amount slider (₹10K - ₹10L)
- Tenure selection (6-60 months)
- Interest rate adjustment (8-24%)
- Real-time EMI calculation
- Payment breakdown visualization

### Step 6: Utility Bill
- Bill type selection (Electricity, Gas, Water, etc.)
- Bill number entry
- Document upload with validation

### Step 7: Reference Details
- Two reference contacts required
- Phone number validation (10 digits)
- Relationship selection
- Duplicate phone number prevention

### Step 8: Disbursal Bank Details
- Account holder name (uppercase formatting)
- Account number validation (9-18 digits)
- IFSC code validation
- Bank name selection

### Completion Page
- Success confirmation
- Application summary display
- Next steps information
- Contact details for support
- Application reference number

## 🔧 Configuration

### Tailwind CSS
The application uses a custom Tailwind configuration with:
- Extended color palette
- Custom animations
- Responsive breakpoints
- Print-specific styles

### Redux Store
State management includes:
- Current step tracking
- Form data persistence
- Validation states
- Progress monitoring

## 🧪 Testing the Application

### Sample Data for Testing

**Eligible User:**
- Income: ₹30,000+
- Credit Score: 650-749 or 750-850
- Valid Aadhar: 123456789012
- Valid PAN: ABCDE1234F

**Non-Eligible User:**
- Income: < ₹25,000
- Credit Score: 300-649

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 UI/UX Features

- **Visual Progress Tracking**: Step completion indicators
- **Form Validation**: Real-time error feedback
- **Loading States**: Smooth loading animations
- **File Upload**: Drag-and-drop interface
- **Interactive Elements**: Hover effects and transitions
- **Accessibility**: Keyboard navigation support

## 🔒 Validation Rules

### Personal Information
- Name: Required, non-empty
- Email: Valid email format
- Phone: 10-digit number
- Income: Minimum ₹15,000

### Documents
- Aadhar: 12-digit number
- PAN: ABCDE1234F format
- Age: Minimum 18 years
- Files: Size limits and format validation

### Bank Details
- Account Number: 9-18 digits
- IFSC Code: Valid bank code format
- Name matching with KYC documents

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@loanco.com
- Phone: 1800-123-4567
- Live Chat: Available 24/7

## 🔄 Future Enhancements

- [ ] Real API integration
- [ ] Document OCR processing
- [ ] SMS/Email notifications
- [ ] Multi-language support
- [ ] Advanced security features
- [ ] Analytics dashboard
- [ ] Loan status tracking

---

**Note**: This application currently uses dummy data simulation. All validations and processes are for demonstration purposes. For production use, integrate with actual backend APIs and payment systems.
