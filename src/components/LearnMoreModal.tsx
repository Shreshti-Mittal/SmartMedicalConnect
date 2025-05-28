
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QrCode, Shield, AlertTriangle, Hospital, FileText, Users } from 'lucide-react';

interface LearnMoreModalProps {
  children: React.ReactNode;
}

const LearnMoreModal: React.FC<LearnMoreModalProps> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            About SmartMedConnect
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-6">
              SmartMedConnect is a revolutionary healthcare platform that bridges the gap between 
              patients, healthcare providers, and emergency responders through cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <QrCode className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">QR Code Technology</h3>
              </div>
              <p className="text-sm text-gray-600">
                Instant access to critical medical information through secure QR codes. 
                Perfect for emergency situations where every second counts.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-gray-900">Secure & Private</h3>
              </div>
              <p className="text-sm text-gray-600">
                Bank-level encryption protects your medical data with advanced security measures 
                and compliance with healthcare privacy regulations.
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="font-semibold text-gray-900">Emergency Ready</h3>
              </div>
              <p className="text-sm text-gray-600">
                Quick emergency registration and instant access to life-saving medical 
                information for first responders and medical professionals.
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Hospital className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Hospital Integration</h3>
              </div>
              <p className="text-sm text-gray-600">
                Seamless integration with hospital systems for efficient patient care 
                and streamlined medical workflows across healthcare networks.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <FileText className="w-6 h-6 text-yellow-600" />
                <h3 className="font-semibold text-gray-900">Digital Records</h3>
              </div>
              <p className="text-sm text-gray-600">
                Digitize and organize medical documents, prescriptions, test results, 
                and treatment history for easy access and secure sharing.
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="w-6 h-6 text-indigo-600" />
                <h3 className="font-semibold text-gray-900">Family & Caregiver Access</h3>
              </div>
              <p className="text-sm text-gray-600">
                Controlled access for family members and caregivers to view important 
                medical information during emergencies and routine care.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">How It Works</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>1. Register:</strong> Create your secure medical profile with essential health information</p>
              <p><strong>2. Upload:</strong> Add medical documents, prescriptions, and emergency contacts</p>
              <p><strong>3. Generate:</strong> Get your personalized QR code for instant access</p>
              <p><strong>4. Connect:</strong> Share with healthcare providers and emergency contacts</p>
              <p><strong>5. Access:</strong> Medical professionals can quickly access your information when needed</p>
            </div>
          </div>

          <div className="text-center bg-blue-600 text-white p-4 rounded-lg">
            <p className="font-medium">
              Join thousands of patients and healthcare providers using SmartMedConnect 
              to improve healthcare outcomes and save lives.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LearnMoreModal;
