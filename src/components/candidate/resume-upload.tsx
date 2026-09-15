'use client';

import { ChangeEvent, useRef, useState, useEffect } from 'react';
import { FileText, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ResumeUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resume, setResume] = useState<{
    fileName: string;
    fileUrl: string;
    fileSize: number;
  } | null>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch('/api/resume');

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch resume.');
        }

        setResume(data.resume);
      } catch (error) {
        console.error('Resume fetch error:', error);
      }
    };

    fetchResume();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setError('');
    setSuccess('');
    setSelectedFile(null);

    if (!file) {
      return;
    }

    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('Resume must be 5 MB or smaller.');
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a resume first.');
      return;
    }

    try {
      setIsUploading(true);
      setError('');
      setSuccess('');

      // 1. Get Cloudinary signature
      const signatureResponse = await fetch('/api/cloudinary/signature', {
        method: 'POST',
      });

      const signatureData = await signatureResponse.json();

      if (!signatureResponse.ok) {
        throw new Error(
          signatureData.message || 'Failed to prepare resume upload.'
        );
      }

      // 2. Upload PDF to Cloudinary
      const formData = new FormData();

      formData.append('file', selectedFile);
      formData.append('api_key', signatureData.apiKey);
      formData.append('timestamp', String(signatureData.timestamp));
      formData.append('signature', signatureData.signature);
      formData.append('upload_preset', signatureData.uploadPreset);

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const cloudinaryData = await cloudinaryResponse.json();

      if (!cloudinaryResponse.ok) {
        throw new Error(
          cloudinaryData.error?.message || 'Resume upload failed.'
        );
      }

      // 3. Save resume information in Prisma
      const resumeResponse = await fetch('/api/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: selectedFile.name,
          fileUrl: cloudinaryData.secure_url,
          publicId: cloudinaryData.public_id,
          fileSize: cloudinaryData.bytes,
          mimeType: selectedFile.type,
        }),
      });

      const resumeData = await resumeResponse.json();

      if (!resumeResponse.ok) {
        throw new Error(resumeData.message || 'Failed to save resume.');
      }

      setSuccess('Resume uploaded successfully.');
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Resume upload error:', error);

      setError(
        error instanceof Error
          ? error.message
          : 'Something went wrong while uploading your resume.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <FileText className="size-5 text-primary" />
        </div>

        <div className="min-w-0">
          <h2 className="font-semibold">Resume</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Upload your latest resume to apply for jobs quickly.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload className="mr-2 size-4" />
            Select Resume
          </Button>

          {selectedFile && (
            <Button
              type="button"
              className="rounded-xl"
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Resume'}
            </Button>
          )}
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          PDF only · Maximum 5 MB
        </p>

        {selectedFile && (
          <div className="mt-4 rounded-xl border border-border/60 bg-muted/40 p-3">
            <p className="truncate text-sm font-medium">{selectedFile.name}</p>

            <p className="mt-1 text-xs text-muted-foreground">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        {resume && (
          <div className="mt-4 rounded-xl border border-border/60 bg-muted/40 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium">Your current resume</p>

                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {resume.fileName}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {(resume.fileSize / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <a
                href={resume.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm font-medium text-primary hover:underline"
              >
                View Resume
              </a>
            </div>
          </div>
        )}

        {success && <p className="mt-3 text-sm text-green-600">{success}</p>}

        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}
