
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useEmergency } from "@/hooks/useEmergency";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import VoiceInput from "@/components/VoiceInput";

const Emergency = () => {
  const navigate = useNavigate();
  const { createEmergencyPatient, loading } = useEmergency();
  const [emergencyRecord, setEmergencyRecord] = useState(null);
  const [formData, setFormData] = useState({
    patient_name: "",
    estimated_age: "",
    gender: "",
    emergency_contact_phone: "",
    condition_description: "",
    allergies: "",
    medications: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const emergencyData = {
        patient_name: formData.patient_name || null,
        estimated_age: formData.estimated_age ? parseInt(formData.estimated_age) : null,
        gender: formData.gender || null,
        condition_description: formData.condition_description || null,
        allergies: formData.allergies || null,
        medications: formData.medications || null,
        emergency_contact_phone: formData.emergency_contact_phone || null,
        hospital_name: "Emergency Department"
      };

      const result = await createEmergencyPatient(emergencyData);
      setEmergencyRecord(result);
      
      toast({
        title: "Emergency ID Generated",
        description: `Your Emergency ID is ${result.emergency_id}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create emergency record",
        variant: "destructive"
      });
    }
  };

  const handleVoiceInput = (field: string) => (transcript: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: transcript
    }));
  };

  if (emergencyRecord) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
        {/* Header */}
        <header className="bg-gradient-to-r from-red-600 to-red-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-white hover:bg-red-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="text-center flex-1">
                <h1 className="text-3xl font-bold text-white flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 mr-3" />
                  EMERGENCY ID GENERATED
                </h1>
                <p className="text-red-100 mt-2">Present this QR code to medical staff</p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <QRCodeDisplay
            value={emergencyRecord.emergency_id}
            title="Emergency ID"
            subtitle="Show this QR code to hospital staff immediately"
            patientName={emergencyRecord.patient_name}
            size={300}
          />

          <div className="mt-8 text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded p-4">
            <p className="font-semibold mb-2">Important:</p>
            <ul className="text-left space-y-1">
              <li>• Present this Emergency ID to the hospital reception desk</li>
              <li>• Keep this QR code with you throughout your hospital visit</li>
              <li>• Medical staff can access your emergency information using this ID</li>
              <li>• In case of emergency, call 911 immediately</li>
            </ul>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white hover:bg-red-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-white flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 mr-3" />
                EMERGENCY PATIENT REGISTRATION
              </h1>
              <p className="text-red-100 mt-2">Quick registration for urgent medical care</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Emergency Information
              </h2>
              <p className="text-gray-600">
                Please fill out as much information as possible. All fields are optional but helpful for medical staff.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name (if known)</Label>
                <div className="relative">
                  <Input
                    id="patientName"
                    placeholder="Enter patient name"
                    value={formData.patient_name}
                    onChange={(e) => setFormData({...formData, patient_name: e.target.value})}
                    className="pr-10"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <VoiceInput onTranscript={handleVoiceInput('patient_name')} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedAge">Estimated Age</Label>
                <div className="relative">
                  <Input
                    id="estimatedAge"
                    type="number"
                    placeholder="Age in years"
                    value={formData.estimated_age}
                    onChange={(e) => setFormData({...formData, estimated_age: e.target.value})}
                    className="pr-10"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <VoiceInput onTranscript={handleVoiceInput('estimated_age')} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => setFormData({...formData, gender: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact Phone</Label>
                <div className="relative">
                  <Input
                    id="emergencyContact"
                    type="tel"
                    placeholder="Phone number"
                    value={formData.emergency_contact_phone}
                    onChange={(e) => setFormData({...formData, emergency_contact_phone: e.target.value})}
                    className="pr-10"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <VoiceInput onTranscript={handleVoiceInput('emergency_contact_phone')} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Brief Condition Description</Label>
              <div className="relative">
                <Textarea
                  id="condition"
                  placeholder="Describe the emergency condition or symptoms"
                  value={formData.condition_description}
                  onChange={(e) => setFormData({...formData, condition_description: e.target.value})}
                  className="min-h-24 pr-10"
                />
                <div className="absolute right-2 top-2">
                  <VoiceInput onTranscript={handleVoiceInput('condition_description')} />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="allergies">Known Allergies</Label>
                <div className="relative">
                  <Textarea
                    id="allergies"
                    placeholder="List any known allergies"
                    value={formData.allergies}
                    onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                    className="min-h-20 pr-10"
                  />
                  <div className="absolute right-2 top-2">
                    <VoiceInput onTranscript={handleVoiceInput('allergies')} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <div className="relative">
                  <Textarea
                    id="medications"
                    placeholder="List current medications"
                    value={formData.medications}
                    onChange={(e) => setFormData({...formData, medications: e.target.value})}
                    className="min-h-20 pr-10"
                  />
                  <div className="absolute right-2 top-2">
                    <VoiceInput onTranscript={handleVoiceInput('medications')} />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-6">
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 text-xl font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating Emergency ID...
                  </>
                ) : (
                  'CREATE EMERGENCY ID'
                )}
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default Emergency;
