"use client"

import { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  src: string;
  fallbackImage: string;
  type?: string; // Optional video type
}

export function VideoBackground({ src, fallbackImage, type = "video/mp4" }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        video.defaultMuted = true;
        video.muted = true;
        await video.play();
        setHasError(false);
      } catch (error) {
        console.error('Error playing video:', error);
        setHasError(true);
      }
    };

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      playVideo();
    };

    const handleError = () => {
      console.error('Video failed to load');
      setHasError(true);
      setIsVideoLoaded(false);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    
    // Force play attempt on mount
    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [src]); // Added src to dependencies to handle URL changes

  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden">
      {!hasError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute w-full h-full object-cover"
          poster={fallbackImage}
        >
          <source src={src} type={type} />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Fallback Image - shown during load or on error */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
          isVideoLoaded && !hasError ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: `url(${fallbackImage})` }}
      />
    </div>
  );
} 