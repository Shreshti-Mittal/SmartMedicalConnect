
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useHospitalStaff } from '@/hooks/useHospitalStaff';
import { toast } from '@/hooks/use-toast';

const EmergencyList = () => {
  const { staff } = useHospitalStaff();
  const [emergencyPatients, setEmergencyPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmergencyPatients();
  }, []);

  const fetchEmergencyPatients = async () => {
    try {
      const { data, error } = await supabase
        .from('emergency_patients')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching emergency patients:', error);
      } else {
        setEmergencyPatients(data || []);
      }
    } catch (error) {
      console.error('Error fetching emergency patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const convertToRegularPatient = async (emergencyPatient: any) => {
    try {
      // This would typically involve creating a regular patient record
      // and updating the emergency patient status
      const { error } = await supabase
        .from('emergency_patients')
        .update({ status: 'converted' })
        .eq('id', emergencyPatient.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Patient Converted",
        description: "Emergency patient has been converted to regular profile"
      });

      fetchEmergencyPatients();
    } catch (error) {
      toast({
        title: "Conversion Failed",
        description: "Unable to convert emergency patient",
        variant: "destructive"
      });
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading emergency patients...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <span>Active Emergency Patients</span>
            <Badge variant="destructive">{emergencyPatients.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {emergencyPatients.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No active emergency patients</p>
            </div>
          ) : (
            <div className="space-y-4">
              {emergencyPatients.map((patient) => (
                <Card key={patient.id} className="border-l-4 border-l-red-500">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">
                            {patient.patient_name || 'Unknown Patient'}
                          </span>
                          <Badge variant="outline">{patient.emergency_id}</Badge>
                        </div>
                        
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><span className="font-medium">Age:</span> {patient.estimated_age || 'Unknown'}</p>
                          <p><span className="font-medium">Gender:</span> {patient.gender || 'Unknown'}</p>
                          <p><span className="font-medium">Condition:</span> {patient.condition_description || 'Not specified'}</p>
                          <p><span className="font-medium">Hospital:</span> {patient.hospital_name || 'Not specified'}</p>
                        </div>

                        {(patient.allergies || patient.medications) && (
                          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                            <p className="text-sm font-medium text-yellow-800">Critical Information:</p>
                            {patient.allergies && (
                              <p className="text-sm text-yellow-700">
                                <span className="font-medium">Allergies:</span> {patient.allergies}
                              </p>
                            )}
                            {patient.medications && (
                              <p className="text-sm text-yellow-700">
                                <span className="font-medium">Medications:</span> {patient.medications}
                              </p>
                            )}
                          </div>
                        )}

                        <div className="flex items-center space-x-1 text-xs text-gray-500 mt-2">
                          <Clock className="w-3 h-3" />
                          <span>Created {formatTimeAgo(patient.created_at)}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button
                          size="sm"
                          onClick={() => convertToRegularPatient(patient)}
                        >
                          Convert to Patient
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyList;
