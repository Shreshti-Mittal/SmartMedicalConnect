
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, X, File, Image } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onUploadComplete?: (fileUrl: string, fileName: string) => void;
  acceptedFileTypes?: string;
  maxFileSize?: number; // in MB
  bucketName?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUploadComplete,
  acceptedFileTypes = "image/*,.pdf,.doc,.docx",
  maxFileSize = 10,
  bucketName = "medical-documents"
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('File selected:', file.name, file.size, file.type);

    // Reset previous state
    setError(null);
    setPreview(null);

    // Validate file size
    if (file.size > maxFileSize * 1024 * 1024) {
      setError(`File size must be less than ${maxFileSize}MB`);
      return;
    }

    setSelectedFile(file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Generate unique filename
      const fileExtension = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
      const filePath = `uploads/${fileName}`;

      console.log('Starting upload:', { fileName, filePath, fileSize: selectedFile.size });

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      // Upload file to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      clearInterval(progressInterval);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      console.log('Upload successful:', data);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      setUploadProgress(100);
      
      toast({
        title: "Upload Successful",
        description: `${selectedFile.name} has been uploaded successfully.`,
      });

      // Call callback with file URL
      if (onUploadComplete) {
        onUploadComplete(urlData.publicUrl, selectedFile.name);
      }

      // Reset form
      setSelectedFile(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error: any) {
      console.error('Upload failed:', error);
      setError(error.message || 'Upload failed. Please try again.');
      toast({
        title: "Upload Failed",
        description: error.message || 'Please try again.',
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const triggerFileInput = () => {
    console.log('Triggering file input...');
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* File Input */}
          <div>
            <Input
              ref={fileInputRef}
              type="file"
              accept={acceptedFileTypes}
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Choose file to upload"
            />
            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer"
              disabled={uploading}
              onClick={triggerFileInput}
              aria-label="Choose file"
            >
              <div className="flex items-center justify-center space-x-2 py-8">
                <Upload className="w-6 h-6" />
                <span>Choose File</span>
              </div>
            </Button>
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* File Preview */}
          {selectedFile && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Selected File</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSelection}
                    disabled={uploading}
                    aria-label="Remove selected file"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                {preview ? (
                  <div className="mb-3">
                    <img
                      src={preview}
                      alt="File preview"
                      className="w-full h-32 object-cover rounded border"
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 mb-3">
                    {selectedFile.type.includes('pdf') ? (
                      <File className="w-8 h-8 text-red-500" />
                    ) : (
                      <File className="w-8 h-8 text-gray-500" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Upload Progress */}
                {uploading && (
                  <div className="mb-3">
                    <Progress value={uploadProgress} className="w-full" />
                    <p className="text-xs text-gray-500 mt-1">
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                )}

                {/* Upload Button */}
                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full"
                >
                  {uploading ? 'Uploading...' : 'Upload File'}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* File Guidelines */}
          <div className="text-xs text-gray-500 text-center">
            <p>Maximum file size: {maxFileSize}MB</p>
            <p>Supported formats: Images, PDF, DOC, DOCX</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
