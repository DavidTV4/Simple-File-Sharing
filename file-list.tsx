'use client'

import { FileItem } from '@/lib/types'
import { formatFileSize, formatTimeAgo } from '@/lib/utils'
import { Download, Share2, UserPlus, FileIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileListProps {
  files: FileItem[]
}

export function FileList({ files }: FileListProps) {
  return (
    <div className="space-y-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="bg-white rounded-lg p-4 flex items-center justify-between dark:bg-gray-800"
        >
          <div className="flex items-center space-x-4">
            <FileIcon className="h-8 w-8 text-gray-400" />
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-500">
                {formatFileSize(file.size)} • {formatTimeAgo(file.uploadedAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open(file.url, '_blank')}
            >
              <Download className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <UserPlus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

