
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QrCode, Shield, AlertTriangle, Hospital, FileText, Users, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LearnMoreModal from '@/components/LearnMoreModal';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-blue-600">
              SmartMedConnect
            </a>
            <nav className="space-x-4">
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Patient Portal
              </Button>
              <Button variant="ghost" onClick={() => navigate('/emergency')}>
                Emergency
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Smart Medical <span className="text-blue-600">Connect</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Bridging healthcare with technology for seamless patient care and emergency response
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/auth')}>
              <User className="w-5 h-5 mr-2" />
              Patient Portal
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/hospital-dashboard')}>
              <Hospital className="w-5 h-5 mr-2" />
              Hospital Staff
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/emergency')}>
              <AlertTriangle className="w-5 h-5 mr-2" />
              Emergency Portal
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <QrCode className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">QR Code Access</h3>
            </div>
            <p className="text-gray-600">
              Instant access to patient medical information through secure QR codes. 
              Perfect for emergency situations and quick hospital check-ins.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Secure Medical Records</h3>
            </div>
            <p className="text-gray-600">
              Your medical history, allergies, and emergency contacts stored securely 
              and accessible when you need them most.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Emergency Response</h3>
            </div>
            <p className="text-gray-600">
              Quick emergency patient registration and instant access to critical 
              medical information for first responders.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Hospital className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Hospital Integration</h3>
            </div>
            <p className="text-gray-600">
              Seamless integration with hospital systems for efficient patient care 
              and streamlined medical workflows.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FileText className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Digital Records</h3>
            </div>
            <p className="text-gray-600">
              Digitize and organize medical documents, prescriptions, and test results 
              for easy access and sharing.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Family Access</h3>
            </div>
            <p className="text-gray-600">
              Allow family members and caregivers to access important medical 
              information during emergencies.
            </p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Connect Your Healthcare?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of patients and healthcare providers using SmartMedConnect
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/pre-registration')}>
              Get Started Today
            </Button>
            <LearnMoreModal>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </LearnMoreModal>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} SmartMedConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
