
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { FileText, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import VoiceInput from "@/components/VoiceInput";
import FileUpload from "@/components/FileUpload";

const PreRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [patientId, setPatientId] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1 - Personal Information
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    insuranceProvider: "",
    insuranceNumber: "",
    
    // Step 2 - Medical History
    currentMedications: "",
    allergies: "",
    previousSurgeries: "",
    chronicConditions: "",
    familyHistory: "",
    
    // Step 3 - Documents (store file URLs after upload)
    medicalReports: [],
    bloodTests: [],
    scans: [],
    insuranceCards: [],
    idProof: [],
    
    // Step 4 - Hospital Selection
    selectedHospital: "",
    preferredDate: ""
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      completeRegistration();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeRegistration = () => {
    const id = `PAT-${Math.floor(10000 + Math.random() * 90000)}`;
    setPatientId(id);
    setIsComplete(true);
    toast({
      title: "Registration Complete",
      description: `Your Patient ID is ${id}`,
    });
  };

  const handleVoiceInput = (field: string) => (transcript: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: transcript
    }));
  };

  const handleFileUpload = (category: string) => (fileUrl: string, fileName: string) => {
    console.log(`File uploaded for ${category}:`, fileName, fileUrl);
    setFormData(prev => ({
      ...prev,
      [category]: [...prev[category], { url: fileUrl, name: fileName }]
    }));
    toast({
      title: "File Uploaded",
      description: `${fileName} uploaded successfully to ${category}`,
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <div className="relative">
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="pr-10"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <VoiceInput onTranscript={handleVoiceInput('fullName')} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select onValueChange={(value) => setFormData({...formData, gender: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="pr-10"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <VoiceInput onTranscript={handleVoiceInput('phone')} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-semibold mb-4">Emergency Contact</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Contact Name *</Label>
                  <div className="relative">
                    <Input
                      id="emergencyContactName"
                      placeholder="Emergency contact name"
                      value={formData.emergencyContactName}
                      onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})}
                      className="pr-10"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <VoiceInput onTranscript={handleVoiceInput('emergencyContactName')} />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactPhone">Contact Phone *</Label>
                  <div className="relative">
                    <Input
                      id="emergencyContactPhone"
                      placeholder="Emergency contact phone"
                      value={formData.emergencyContactPhone}
                      onChange={(e) => setFormData({...formData, emergencyContactPhone: e.target.value})}
                      className="pr-10"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <VoiceInput onTranscript={handleVoiceInput('emergencyContactPhone')} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-semibold mb-4">Insurance Information (Optional)</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                  <div className="relative">
                    <Input
                      id="insuranceProvider"
                      placeholder="Insurance company name"
                      value={formData.insuranceProvider}
                      onChange={(e) => setFormData({...formData, insuranceProvider: e.target.value})}
                      className="pr-10"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <VoiceInput onTranscript={handleVoiceInput('insuranceProvider')} />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="insuranceNumber">Policy Number</Label>
                  <div className="relative">
                    <Input
                      id="insuranceNumber"
                      placeholder="Insurance policy number"
                      value={formData.insuranceNumber}
                      onChange={(e) => setFormData({...formData, insuranceNumber: e.target.value})}
                      className="pr-10"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <VoiceInput onTranscript={handleVoiceInput('insuranceNumber')} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Medical History</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentMedications">Current Medications</Label>
                <div className="relative">
                  <Textarea
                    id="currentMedications"
                    placeholder="List all current medications, dosages, and frequency"
                    value={formData.currentMedications}
                    onChange={(e) => setFormData({...formData, currentMedications: e.target.value})}
                    className="min-h-20 pr-10"
                  />
                  <div className="absolute right-2 top-2">
                    <VoiceInput onTranscript={handleVoiceInput('currentMedications')} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="allergies">Known Allergies</Label>
                <div className="relative">
                  <Textarea
                    id="allergies"
                    placeholder="List any allergies to medications, foods, or other substances"
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
                <Label htmlFor="previousSurgeries">Previous Surgeries</Label>
                <div className="relative">
                  <Textarea
                    id="previousSurgeries"
                    placeholder="List any previous surgeries with approximate dates"
                    value={formData.previousSurgeries}
                    onChange={(e) => setFormData({...formData, previousSurgeries: e.target.value})}
                    className="min-h-20 pr-10"
                  />
                  <div className="absolute right-2 top-2">
                    <VoiceInput onTranscript={handleVoiceInput('previousSurgeries')} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="chronicConditions">Chronic Conditions</Label>
                <div className="relative">
                  <Textarea
                    id="chronicConditions"
                    placeholder="List any chronic medical conditions (diabetes, hypertension, etc.)"
                    value={formData.chronicConditions}
                    onChange={(e) => setFormData({...formData, chronicConditions: e.target.value})}
                    className="min-h-20 pr-10"
                  />
                  <div className="absolute right-2 top-2">
                    <VoiceInput onTranscript={handleVoiceInput('chronicConditions')} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="familyHistory">Family Medical History</Label>
                <div className="relative">
                  <Textarea
                    id="familyHistory"
                    placeholder="Relevant family medical history (heart disease, cancer, genetic conditions, etc.)"
                    value={formData.familyHistory}
                    onChange={(e) => setFormData({...formData, familyHistory: e.target.value})}
                    className="min-h-20 pr-10"
                  />
                  <div className="absolute right-2 top-2">
                    <VoiceInput onTranscript={handleVoiceInput('familyHistory')} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Document Upload</h3>
            <p className="text-gray-600 mb-6">
              Upload relevant medical documents. All uploads are optional but help provide better care.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-medium">Previous Medical Reports</Label>
                  <FileUpload
                    onUploadComplete={handleFileUpload('medicalReports')}
                    acceptedFileTypes="image/*,.pdf,.doc,.docx"
                    maxFileSize={10}
                    bucketName="medical-documents"
                  />
                  {formData.medicalReports.length > 0 && (
                    <div className="text-sm text-green-600">
                      {formData.medicalReports.length} file(s) uploaded
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label className="font-medium">Blood Test Results</Label>
                  <FileUpload
                    onUploadComplete={handleFileUpload('bloodTests')}
                    acceptedFileTypes="image/*,.pdf,.doc,.docx"
                    maxFileSize={10}
                    bucketName="medical-documents"
                  />
                  {formData.bloodTests.length > 0 && (
                    <div className="text-sm text-green-600">
                      {formData.bloodTests.length} file(s) uploaded
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label className="font-medium">X-rays/Scans</Label>
                  <FileUpload
                    onUploadComplete={handleFileUpload('scans')}
                    acceptedFileTypes="image/*,.pdf,.doc,.docx"
                    maxFileSize={15}
                    bucketName="medical-documents"
                  />
                  {formData.scans.length > 0 && (
                    <div className="text-sm text-green-600">
                      {formData.scans.length} file(s) uploaded
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-medium">Insurance Cards</Label>
                  <FileUpload
                    onUploadComplete={handleFileUpload('insuranceCards')}
                    acceptedFileTypes="image/*,.pdf"
                    maxFileSize={5}
                    bucketName="medical-documents"
                  />
                  {formData.insuranceCards.length > 0 && (
                    <div className="text-sm text-green-600">
                      {formData.insuranceCards.length} file(s) uploaded
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label className="font-medium">ID Proof</Label>
                  <FileUpload
                    onUploadComplete={handleFileUpload('idProof')}
                    acceptedFileTypes="image/*,.pdf"
                    maxFileSize={5}
                    bucketName="medical-documents"
                  />
                  {formData.idProof.length > 0 && (
                    <div className="text-sm text-green-600">
                      {formData.idProof.length} file(s) uploaded
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Hospital Selection</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="selectedHospital">Select Hospital *</Label>
                <Select onValueChange={(value) => setFormData({...formData, selectedHospital: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your preferred hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general-hospital">City General Hospital (★★★★☆ 4.2)</SelectItem>
                    <SelectItem value="medical-center">Downtown Medical Center (★★★★★ 4.8)</SelectItem>
                    <SelectItem value="regional-hospital">Regional Hospital (★★★☆☆ 3.9)</SelectItem>
                    <SelectItem value="specialty-clinic">Specialty Medical Clinic (★★★★☆ 4.5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Visit Date</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                />
              </div>
            </div>

            {formData.selectedHospital && (
              <Card className="p-4 bg-blue-50 border-blue-200">
                <h4 className="font-semibold mb-2">Hospital Information</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Address:</strong> 123 Medical Drive, Healthcare City</p>
                  <p><strong>Phone:</strong> (555) 123-4567</p>
                  <p><strong>Emergency:</strong> (555) 911-HELP</p>
                  <p><strong>Visiting Hours:</strong> 8:00 AM - 8:00 PM</p>
                </div>
              </Card>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Before You Complete Registration:</h4>
              <ul className="text-sm space-y-1">
                <li>• Review all information for accuracy</li>
                <li>• Ensure emergency contact information is current</li>
                <li>• Confirm your preferred hospital selection</li>
                <li>• Save your Patient ID for future reference</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">Registration Complete</h1>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <QRCodeDisplay
            value={patientId}
            title="Patient ID"
            subtitle="Present this QR code at any partnered hospital"
            patientName={formData.fullName}
            size={280}
          />

          <div className="mt-8 space-y-4">
            <Button 
              onClick={() => navigate('/existing-patient')}
              className="w-full"
            >
              Access Patient Dashboard
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full"
            >
              Return to Home
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white hover:bg-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-white flex items-center justify-center">
                <FileText className="w-8 h-8 mr-3" />
                NEW PATIENT REGISTRATION
              </h1>
              <p className="text-blue-100 mt-2">Complete your registration before your visit</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          <div className="flex justify-between mt-4 text-sm">
            <span className={currentStep >= 1 ? "text-blue-600 font-medium" : "text-gray-400"}>
              Personal Info
            </span>
            <span className={currentStep >= 2 ? "text-blue-600 font-medium" : "text-gray-400"}>
              Medical History
            </span>
            <span className={currentStep >= 3 ? "text-blue-600 font-medium" : "text-gray-400"}>
              Documents
            </span>
            <span className={currentStep >= 4 ? "text-blue-600 font-medium" : "text-gray-400"}>
              Hospital Selection
            </span>
          </div>
        </div>

        <Card className="p-8">
          {renderStep()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentStep === totalSteps ? 'Complete Registration' : 'Next'}
              {currentStep < totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default PreRegistration;
