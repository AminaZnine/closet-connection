
import React, { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { Button } from './button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './sheet';
import { AspectRatio } from './aspect-ratio';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface ImageCaptureProps {
  onImageCapture: (file: File) => void;
  onClose?: () => void;
  className?: string;
}

const ImageCapture: React.FC<ImageCaptureProps> = ({
  onImageCapture,
  onClose,
  className,
}) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCapturedImage(imageUrl);
      onImageCapture(file);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsCapturing(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please make sure you have given permission to use the camera.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCapturing(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the current video frame to the canvas
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL and create a file
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
          const imageUrl = URL.createObjectURL(blob);
          setCapturedImage(imageUrl);
          onImageCapture(file);
          stopCamera();
        }
      }, 'image/jpeg', 0.9);
    }
  };

  const clearImage = () => {
    setCapturedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleCloseSheet = () => {
    stopCamera();
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Sheet 
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          stopCamera();
          handleCloseSheet();
        }
      }}
    >
      <SheetTrigger asChild>
        <Button variant="outline" className={cn("gap-2", className)}>
          <Upload size={16} />
          Add Clothing Item
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Add new item</SheetTitle>
          <SheetDescription>
            Upload or take a photo of your clothing item
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-4 py-4">
          {capturedImage ? (
            <div className="relative">
              <AspectRatio ratio={1}>
                <img 
                  src={capturedImage} 
                  alt="Captured clothing" 
                  className="w-full h-full object-cover rounded-md"
                />
              </AspectRatio>
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute top-2 right-2" 
                onClick={clearImage}
              >
                <X size={16} />
              </Button>
            </div>
          ) : isCapturing ? (
            <div className="space-y-2">
              <AspectRatio ratio={1}>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline
                  className="w-full h-full rounded-md bg-muted"
                />
              </AspectRatio>
              <Button onClick={capturePhoto} className="w-full">Capture Photo</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={startCamera} variant="outline" className="h-24 flex flex-col gap-2">
                <Camera size={24} />
                <span>Take Photo</span>
              </Button>
              <Button onClick={triggerFileUpload} variant="outline" className="h-24 flex flex-col gap-2">
                <Upload size={24} />
                <span>Upload Photo</span>
              </Button>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}
        </div>
        
        <canvas ref={canvasRef} className="hidden" />
        
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" disabled={!capturedImage} onClick={handleCloseSheet}>
              Add to Wardrobe
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ImageCapture;
