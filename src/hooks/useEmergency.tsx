import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface EmergencyPatient {
  id: string;
  emergency_id: string;
  patient_name: string;
  estimated_age: number;
  gender: string;
  condition_description: string;
  allergies: string;
  medications: string;
  emergency_contact_phone: string;
  hospital_name: string;
  created_at: string;
  status: string;
}

export const useEmergency = () => {
  const [loading, setLoading] = useState(false);

  const createEmergencyPatient = async (emergencyData: {
    patient_name?: string;
    estimated_age?: number;
    gender?: string;
    condition_description?: string;
    allergies?: string;
    medications?: string;
    emergency_contact_phone?: string;
    hospital_name?: string;
  }) => {
    setLoading(true);

    try {
      const payload = {
        ...emergencyData,
        emergency_id: crypto.randomUUID(),
      };

      const { data, error } = await supabase
        .from('emergency_patients')
        .insert([payload])
        .select();

      console.log('Inserted emergency record:', data);

      if (error) {
        console.error('Error creating emergency patient:', error);
        throw error;
      }

      // Supabase returns an array of inserted rows; return the first row
      return Array.isArray(data) ? data[0] : data;
    } catch (err) {
      console.error('Error creating emergency patient:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getEmergencyPatient = async (emergencyId: string) => {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('emergency_patients')
        .select('*')
        .eq('emergency_id', emergencyId)
        .single();

      if (error) {
        console.error('Error fetching emergency patient:', error);
        throw error;
      }

      return data;
    } catch (err) {
      console.error('Error fetching emergency patient:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createEmergencyPatient,
    getEmergencyPatient,
  };
};
