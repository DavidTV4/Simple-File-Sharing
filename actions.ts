'use server'

import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { FileItem } from '@/lib/types'

export async function uploadFile(formData: FormData): Promise<FileItem> {
  const file = formData.get('file') as File
  const blob = await put(file.name, file, {
    access: 'public',
  })

  const fileItem: FileItem = {
    id: Math.random().toString(36).substring(7),
    name: file.name,
    size: file.size,
    uploadedAt: new Date(),
    url: blob.url,
  }

  revalidatePath('/')
  return fileItem
}

