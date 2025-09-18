'use client';
import { useState, useCallback } from 'react';

interface FileUploadProps {
  onUpload: (files: File[]) => Promise<void>;
  acceptedTypes?: string[];
  maxFiles?: number;
  maxSize?: number; // in MB
  title: string;
  description?: string;
}

interface UploadedFile {
  file: File;
  url?: string;
  uploading: boolean;
  error?: string;
}

export default function FileUpload({
  onUpload,
  acceptedTypes = ['image/*', '.pdf', '.doc', '.docx'],
  maxFiles = 5,
  maxSize = 10,
  title,
  description
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  }, []);

  const handleFiles = async (files: File[]) => {
    console.log('FileUpload handleFiles called with:', files.length, 'files');
    console.log('Current uploadedFiles length:', uploadedFiles.length);
    console.log('Max files allowed:', maxFiles);
    
    // Filter and validate files
    const validFiles = files.filter(file => {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`${file.name} is too large. Max size: ${maxSize}MB`);
        return false;
      }
      return true;
    }).slice(0, maxFiles - uploadedFiles.length);

    console.log('Valid files after filtering:', validFiles.length);

    if (validFiles.length === 0) return;

    // Add files to state as uploading
    const newFiles: UploadedFile[] = validFiles.map(file => ({
      file,
      uploading: true
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    try {
      console.log('Calling onUpload with files:', validFiles.map(f => f.name));
      await onUpload(validFiles);
      
      // Mark as uploaded successfully
      setUploadedFiles(prev => 
        prev.map(f => 
          validFiles.includes(f.file) 
            ? { ...f, uploading: false, url: URL.createObjectURL(f.file) }
            : f
        )
      );
    } catch (error) {
      console.error('Upload error:', error);
      // Mark as failed
      setUploadedFiles(prev => 
        prev.map(f => 
          validFiles.includes(f.file) 
            ? { ...f, uploading: false, error: 'Upload failed' }
            : f
        )
      );
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const canUploadMore = uploadedFiles.length < maxFiles;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>

      {canUploadMore && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
        >
          <div className="space-y-2">
            <svg className="w-8 h-8 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <div>
              <label className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-500 font-medium">
                  Cliquer pour sélectionner
                </span>
                <span className="text-gray-600"> ou glisser-déposer</span>
                <input
                  type="file"
                  multiple
                  accept={acceptedTypes.join(',')}
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">
              Max {maxFiles} fichiers, {maxSize}MB chacun
            </p>
          </div>
        </div>
      )}

      {/* Uploaded files list */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          {uploadedFiles.map((uploadedFile, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                {uploadedFile.uploading ? (
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                ) : uploadedFile.error ? (
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {uploadedFile.file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(uploadedFile.file.size / 1024 / 1024).toFixed(1)} MB
                </p>
                {uploadedFile.error && (
                  <p className="text-xs text-red-600">{uploadedFile.error}</p>
                )}
              </div>
              
              <button
                onClick={() => removeFile(index)}
                className="flex-shrink-0 text-gray-400 hover:text-red-500"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
