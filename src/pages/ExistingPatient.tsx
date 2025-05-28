
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, ArrowLeft, QrCode, FileText, Calendar, Star, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePatient } from "@/hooks/usePatient";
import { toast } from "@/hooks/use-toast";
import QRCodeDisplay from "@/components/QRCodeDisplay";

const ExistingPatient = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { patient, loading } = usePatient();
  const [showQRGeneration, setShowQRGeneration] = useState(false);
  const [visitQRCode, setVisitQRCode] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out."
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Sign Out Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleGenerateQR = () => {
    // Generate a new visit QR code
    const visitId = `VST-${Math.floor(100000 + Math.random() * 900000)}`;
    setVisitQRCode(visitId);
    setShowQRGeneration(true);
    
    toast({
      title: "Visit QR Code Generated",
      description: "Your visit QR code has been generated successfully!"
    });
  };

  const handleBackToDashboard = () => {
    setShowQRGeneration(false);
    setVisitQRCode(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (showQRGeneration && visitQRCode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <header className="bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleBackToDashboard}
                className="text-white hover:bg-green-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="text-center flex-1">
                <h1 className="text-3xl font-bold text-white">
                  VISIT QR CODE GENERATED
                </h1>
                <p className="text-green-100 mt-2">Present this QR code at the hospital</p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <QRCodeDisplay
            value={visitQRCode}
            title="Hospital Visit QR Code"
            subtitle="Valid for today's visit"
            patientName={patient?.full_name}
            size={300}
          />

          <div className="mt-8 text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded p-4">
            <p className="font-semibold mb-2">Visit Information:</p>
            <ul className="text-left space-y-1">
              <li>• This QR code is valid for hospital visits today</li>
              <li>• Present this code at hospital registration</li>
              <li>• Medical staff can access your complete profile using this code</li>
              <li>• Generate a new QR code for future visits</li>
            </ul>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="text-white hover:bg-green-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-white">
                WELCOME BACK, {patient?.full_name?.toUpperCase() || 'PATIENT'}
              </h1>
              <p className="text-green-100 mt-2">Patient Dashboard</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white hover:bg-green-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Patient Summary Card */}
        {patient && (
          <Card className="p-6 mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-gray-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{patient.full_name}</h2>
                <p className="text-gray-600">Patient ID: {patient.patient_id}</p>
                <p className="text-gray-600">DOB: {new Date(patient.date_of_birth).toLocaleDateString()} | Gender: {patient.gender}</p>
                <p className="text-gray-600">Phone: {patient.phone}</p>
              </div>
              <div className="text-center">
                <QrCode className="w-16 h-16 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">Your Patient QR</p>
                <Button size="sm" variant="outline" onClick={handleGenerateQR}>
                  Generate Visit QR
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Dashboard Tabs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <User className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">My Profile</h3>
              <p className="text-gray-600 mb-4">Edit personal and medical information</p>
              <Button className="w-full">
                Manage Profile
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Medical Records</h3>
              <p className="text-gray-600 mb-4">View and upload documents</p>
              <Button className="w-full">
                View Records
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Visit History</h3>
              <p className="text-gray-600 mb-4">Previous hospital visits</p>
              <Button className="w-full">
                View History
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-green-200 bg-green-50">
            <div className="text-center">
              <QrCode className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-semibold mb-2">New Visit</h3>
              <p className="text-gray-600 mb-4">Generate QR for upcoming visit</p>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleGenerateQR}>
                New Visit QR
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <Star className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
              <h3 className="text-xl font-semibold mb-2">Hospital Reviews</h3>
              <p className="text-gray-600 mb-4">Rate your experiences</p>
              <Button className="w-full">
                Write Review
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center">
              <Settings className="w-12 h-12 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-semibold mb-2">Settings</h3>
              <p className="text-gray-600 mb-4">Account preferences</p>
              <Button className="w-full" variant="outline">
                Manage Settings
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 mt-8">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Account Created</p>
                <p className="text-sm text-gray-600">{patient?.created_at ? new Date(patient.created_at).toLocaleDateString() : 'Recently'}</p>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Profile Setup Complete</p>
                <p className="text-sm text-gray-600">{patient?.updated_at ? new Date(patient.updated_at).toLocaleDateString() : 'Recently'}</p>
              </div>
              <Button size="sm" variant="outline">Details</Button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Welcome to SmartMedConnect</p>
                <p className="text-sm text-gray-600">Get started with your medical profile</p>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ExistingPatient;
