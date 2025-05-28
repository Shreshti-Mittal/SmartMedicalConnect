
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  className?: string;
  disabled?: boolean;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: (event: Event) => void;
  onend: (event: Event) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, className = "", disabled = false }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
      setIsProcessing(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setIsProcessing(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      setIsProcessing(true);
      const transcript = event.results[0][0].transcript;
      
      setTimeout(() => {
        onTranscript(transcript);
        setIsProcessing(false);
        toast({
          title: "Voice Input Complete",
          description: "Speech has been converted to text."
        });
      }, 500);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setIsRecording(false);
      setIsProcessing(false);
      
      let errorMessage = "Voice recognition failed. Please try again.";
      
      switch (event.error) {
        case 'no-speech':
          errorMessage = "No speech detected. Please try speaking again.";
          break;
        case 'audio-capture':
          errorMessage = "Microphone not available. Please check your microphone settings.";
          break;
        case 'not-allowed':
          errorMessage = "Microphone access denied. Please allow microphone access and try again.";
          break;
        case 'network':
          errorMessage = "Network error. Please check your internet connection.";
          break;
      }

      toast({
        title: "Voice Input Error",
        description: errorMessage,
        variant: "destructive"
      });
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onTranscript]);

  const startRecording = () => {
    if (!recognitionRef.current || !isSupported || disabled) return;

    try {
      recognitionRef.current.start();
    } catch (error) {
      toast({
        title: "Voice Input Error",
        description: "Failed to start voice recognition. Please try again.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
  };

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  if (!isSupported) {
    return (
      <Button
        size="sm"
        variant="ghost"
        disabled
        className={`p-1 ${className}`}
        title="Voice input not supported in this browser"
      >
        <Mic className="w-4 h-4 text-gray-300" />
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        size="sm"
        variant="ghost"
        type="button"
        onClick={handleClick}
        disabled={disabled || isProcessing}
        className={`p-1 ${className} ${isRecording ? 'text-red-600 bg-red-50' : 'text-gray-600'}`}
        title={isRecording ? "Click to stop recording" : "Click to start voice input"}
      >
        <Mic className={`w-4 h-4 ${isRecording ? 'animate-pulse' : ''}`} />
      </Button>
      
      {isRecording && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
          Recording... Tap to stop
        </div>
      )}
      
      {isProcessing && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
          Processing...
        </div>
      )}
    </div>
  );
};

export default VoiceInput;
