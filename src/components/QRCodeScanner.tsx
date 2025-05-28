
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, Search, Camera } from 'lucide-react';
import { useHospitalStaff } from '@/hooks/useHospitalStaff';
import { toast } from '@/hooks/use-toast';

interface QRCodeScannerProps {
  onPatientFound: (patient: any) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onPatientFound }) => {
  const { scanPatient, lookupPatient, lookupEmergencyPatient } = useHospitalStaff();
  const [manualId, setManualId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleManualLookup = async () => {
    if (!manualId.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter a patient ID or emergency ID",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await scanPatient('manual_search', manualId);
      
      let patient = null;
      
      // Try regular patient lookup first
      if (manualId.startsWith('PAT-')) {
        patient = await lookupPatient(manualId);
      } else if (manualId.startsWith('EM-')) {
        patient = await lookupEmergencyPatient(manualId);
      } else {
        // Try both if format is unclear
        try {
          patient = await lookupPatient(manualId);
        } catch {
          patient = await lookupEmergencyPatient(manualId);
        }
      }

      if (patient) {
        onPatientFound(patient);
        toast({
          title: "Patient Found",
          description: `Successfully retrieved patient information`
        });
      }
    } catch (error) {
      toast({
        title: "Patient Not Found",
        description: "No patient found with the provided ID",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNameSearch = async () => {
    if (!searchName.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter a patient name",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await scanPatient('name_search', searchName);
      
      // This would typically search by name in the database
      // For now, we'll show a placeholder message
      toast({
        title: "Search Initiated",
        description: `Searching for patients named "${searchName}"`
      });
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Unable to search for patients at this time",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const simulateQRScan = () => {
    // Simulate scanning a QR code
    const samplePatientId = 'PAT-1234';
    setManualId(samplePatientId);
    toast({
      title: "QR Code Scanned",
      description: `Scanned patient ID: ${samplePatientId}`
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* QR Scanner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>QR Code Scanner</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-4">Camera preview would appear here</p>
              <Button onClick={simulateQRScan} size="sm">
                Simulate QR Scan
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Point camera at patient's QR code to scan
          </p>
        </CardContent>
      </Card>

      {/* Manual ID Entry */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <QrCode className="w-5 h-5" />
            <span>Manual ID Entry</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="manual-id">Patient ID or Emergency ID</Label>
            <Input
              id="manual-id"
              placeholder="PAT-1234 or EM-5678"
              value={manualId}
              onChange={(e) => setManualId(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleManualLookup} 
            className="w-full"
            disabled={loading}
          >
            <Search className="w-4 h-4 mr-2" />
            {loading ? 'Searching...' : 'Look Up Patient'}
          </Button>
          <p className="text-xs text-gray-500">
            Enter patient ID (PAT-xxxx) or emergency ID (EM-xxxx)
          </p>
        </CardContent>
      </Card>

      {/* Name Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Search by Name</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patient-name">Patient Name</Label>
            <Input
              id="patient-name"
              placeholder="Enter patient full name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleNameSearch} 
            className="w-full"
            disabled={loading}
          >
            <Search className="w-4 h-4 mr-2" />
            {loading ? 'Searching...' : 'Search by Name'}
          </Button>
          <p className="text-xs text-gray-500">
            Search for patients by their full name
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeScanner;
