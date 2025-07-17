import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelfieUpload, completeSelfieUpload } from '../../store/slices/loanSlice'

const SelfieUpload = () => {
  const dispatch = useDispatch()
  const { selfieUpload } = useSelector((state) => state.loan)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(selfieUpload.data.selfieUrl || null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size should be less than 5MB')
        return
      }

      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file')
        return
      }

      setError('')
      setSelectedImage(file)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        dispatch(updateSelfieUpload({ 
          selfieImage: file,
          selfieUrl: e.target.result 
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedImage) {
      setError('Please select an image first')
      return
    }

    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      dispatch(completeSelfieUpload())
      setIsUploading(false)
    }, 2000)
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Selfie Upload</h2>
        <p className="text-gray-600">Share your selfie and complete the registration.</p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="text-center">
          <div className="mb-6">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Selfie preview"
                  className="w-48 h-48 object-cover rounded-full mx-auto border-4 border-blue-200 shadow-lg"
                />
                <button
                  onClick={triggerFileSelect}
                  className="absolute bottom-2 right-8 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            ) : (
              <div
                onClick={triggerFileSelect}
                className="w-48 h-48 border-4 border-dashed border-gray-300 rounded-full mx-auto flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
              >
                <div className="text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <p className="text-gray-500 text-sm">Click to upload selfie</p>
                </div>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Selfie Guidelines
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Ensure good lighting and clear face visibility</li>
                    <li>Remove sunglasses and face masks</li>
                    <li>Look directly at the camera</li>
                    <li>Image should be less than 5MB</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={!selectedImage || isUploading}
            className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              'Upload Selfie'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelfieUpload