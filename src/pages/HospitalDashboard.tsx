
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { QrCode, Search, FileText, Users, Bell, Hospital } from 'lucide-react';
import { useHospitalStaff } from '@/hooks/useHospitalStaff';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import QRCodeScanner from '@/components/QRCodeScanner';
import PatientProfile from '@/components/PatientProfile';
import EmergencyList from '@/components/EmergencyList';
import HospitalAnalytics from '@/components/HospitalAnalytics';

const HospitalDashboard = () => {
  const { staff, loading } = useHospitalStaff();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('scanner');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">You are not registered as hospital staff.</p>
            <Button onClick={() => navigate('/')} variant="outline">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Hospital className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Hospital Dashboard</h1>
                <p className="text-sm text-gray-600">SmartMedConnect Staff Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{staff.full_name}</p>
                <p className="text-xs text-gray-600">{staff.role} • {staff.staff_id}</p>
              </div>
              <Button onClick={handleSignOut} variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="scanner" className="flex items-center space-x-2">
              <QrCode className="w-4 h-4" />
              <span>QR Scanner</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Patient Search</span>
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Notes</span>
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Emergency</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scanner" className="space-y-6">
            <QRCodeScanner onPatientFound={setSelectedPatient} />
            {selectedPatient && (
              <PatientProfile patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
            )}
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Search</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search by Patient ID, Name, or Emergency ID</Label>
                  <Input
                    id="search"
                    placeholder="Enter patient ID, name, or emergency ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Search Patient
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Notes Interface</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-id">Patient ID</Label>
                  <Input id="patient-id" placeholder="Enter patient ID..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="treatment-notes">Treatment Notes</Label>
                  <Textarea
                    id="treatment-notes"
                    placeholder="Enter treatment notes, diagnosis, and recommendations..."
                    rows={6}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button>Save Notes</Button>
                  <Button variant="outline">Mark Visit Complete</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emergency" className="space-y-6">
            <EmergencyList />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <HospitalAnalytics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default HospitalDashboard;
