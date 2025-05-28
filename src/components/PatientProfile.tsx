
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Phone, Calendar, AlertTriangle, FileText, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PatientProfileProps {
  patient: any;
  onClose: () => void;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ patient, onClose }) => {
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [visitHistory, setVisitHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (patient) {
      fetchPatientDetails();
    }
  }, [patient]);

  const fetchPatientDetails = async () => {
    try {
      // Fetch medical history
      const { data: history } = await supabase
        .from('medical_history')
        .select('*')
        .eq('patient_id', patient.id)
        .single();

      // Fetch medical records
      const { data: records } = await supabase
        .from('medical_records')
        .select('*')
        .eq('patient_id', patient.id)
        .order('upload_date', { ascending: false });

      // Fetch visit history
      const { data: visits } = await supabase
        .from('patient_visits')
        .select('*, hospitals(name)')
        .eq('patient_id', patient.id)
        .order('visit_date', { ascending: false });

      setMedicalHistory(history);
      setMedicalRecords(records || []);
      setVisitHistory(visits || []);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const isEmergencyPatient = patient.emergency_id;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-6 h-6" />
            <span>{patient.patient_name || patient.full_name}</span>
            {isEmergencyPatient && (
              <Badge variant="destructive">Emergency</Badge>
            )}
          </CardTitle>
          <p className="text-sm text-gray-600">
            {isEmergencyPatient ? patient.emergency_id : patient.patient_id}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading patient details...</p>
          </div>
        ) : (
          <>
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Basic Information</h3>
                <div className="space-y-1 text-sm">
                  {!isEmergencyPatient && (
                    <>
                      <p><span className="font-medium">DOB:</span> {patient.date_of_birth ? formatDate(patient.date_of_birth) : 'N/A'}</p>
                      <p><span className="font-medium">Gender:</span> {patient.gender || 'N/A'}</p>
                      <p><span className="font-medium">Phone:</span> {patient.phone || 'N/A'}</p>
                    </>
                  )}
                  {isEmergencyPatient && (
                    <>
                      <p><span className="font-medium">Estimated Age:</span> {patient.estimated_age || 'N/A'}</p>
                      <p><span className="font-medium">Gender:</span> {patient.gender || 'N/A'}</p>
                      <p><span className="font-medium">Condition:</span> {patient.condition_description || 'N/A'}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Emergency Contact</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Name:</span> {patient.emergency_contact_name || 'N/A'}</p>
                  <p><span className="font-medium">Phone:</span> {patient.emergency_contact_phone || 'N/A'}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Medical Information */}
            {(medicalHistory || isEmergencyPatient) && (
              <>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <span>Medical Information</span>
                  </h3>
                  
                  {isEmergencyPatient ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700">Allergies</h4>
                        <p className="text-sm text-gray-600">{patient.allergies || 'None reported'}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700">Current Medications</h4>
                        <p className="text-sm text-gray-600">{patient.medications || 'None reported'}</p>
                      </div>
                    </div>
                  ) : medicalHistory ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700">Allergies</h4>
                        <p className="text-sm text-gray-600">
                          {medicalHistory.allergies?.join(', ') || 'None reported'}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700">Current Medications</h4>
                        <p className="text-sm text-gray-600">
                          {medicalHistory.current_medications?.join(', ') || 'None reported'}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700">Chronic Conditions</h4>
                        <p className="text-sm text-gray-600">
                          {medicalHistory.chronic_conditions?.join(', ') || 'None reported'}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700">Previous Surgeries</h4>
                        <p className="text-sm text-gray-600">
                          {medicalHistory.previous_surgeries?.join(', ') || 'None reported'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">No medical history available</p>
                  )}
                </div>

                <Separator />
              </>
            )}

            {/* Medical Records */}
            {medicalRecords.length > 0 && (
              <>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Medical Records</span>
                  </h3>
                  <div className="space-y-2">
                    {medicalRecords.map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{record.document_name}</p>
                          <p className="text-sm text-gray-600">
                            {record.document_type} • {formatDate(record.upload_date)}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />
              </>
            )}

            {/* Visit History */}
            {visitHistory.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Visit History</h3>
                <div className="space-y-2">
                  {visitHistory.map((visit) => (
                    <div key={visit.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{visit.hospitals?.name}</p>
                          <p className="text-sm text-gray-600">
                            {formatDate(visit.visit_date)} • {visit.visit_reason}
                          </p>
                        </div>
                        <Badge variant={visit.status === 'completed' ? 'default' : 'secondary'}>
                          {visit.status}
                        </Badge>
                      </div>
                      {visit.doctor_notes && (
                        <p className="text-sm text-gray-600 mt-2">{visit.doctor_notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientProfile;
