'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'
import { uploadFile } from '@/app/actions'

interface UploadZoneProps {
  onUploadComplete: (file: any) => void
}

export function UploadZone({ onUploadComplete }: UploadZoneProps) {
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setIsUploading(true)
      for (const file of acceptedFiles) {
        const formData = new FormData()
        formData.append('file', file)
        const uploadedFile = await uploadFile(formData)
        onUploadComplete(uploadedFile)
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }, [onUploadComplete])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true
  })

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-12
        flex flex-col items-center justify-center
        transition-colors
        ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-700'}
        ${isUploading ? 'opacity-50 cursor-wait' : 'cursor-pointer hover:border-primary/50'}
      `}
    >
      <input {...getInputProps()} />
      <Upload className="h-12 w-12 text-gray-400 mb-4" />
      <p className="text-xl text-gray-400 text-center">
        {isDragActive
          ? "Drop your files here"
          : "Drag and drop your files here"}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        or click to browse
      </p>
    </div>
  )
}

