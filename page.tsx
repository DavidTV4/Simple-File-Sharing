'use client'

import { useState } from 'react'
import { UploadZone } from '@/components/upload-zone'
import { FileList } from '@/components/file-list'
import { FileItem } from '@/lib/types'

export default function Home() {
  const [files, setFiles] = useState<FileItem[]>([])

  const handleUploadComplete = (file: FileItem) => {
    setFiles(prev => [file, ...prev])
  }

  return (
    <main className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            Simple File Sharing
          </h1>
          <p className="text-gray-400 text-lg">
            Share your files securely with anyone. Just drag and drop your files to get started.
          </p>
        </div>

        <UploadZone onUploadComplete={handleUploadComplete} />

        {files.length > 0 && (
          <div className="mt-8">
            <FileList files={files} />
          </div>
        )}
      </div>
    </main>
  )
}

