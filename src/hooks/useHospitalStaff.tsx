
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface HospitalStaff {
  id: string;
  user_id: string;
  hospital_id: string;
  staff_id: string;
  full_name: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PatientScan {
  id: string;
  staff_id: string;
  patient_id?: string;
  emergency_id?: string;
  scan_type: string;
  scan_data?: string;
  scanned_at: string;
}

export const useHospitalStaff = () => {
  const { user } = useAuth();
  const [staff, setStaff] = useState<HospitalStaff | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStaffProfile();
    } else {
      setStaff(null);
      setLoading(false);
    }
  }, [user]);

  const fetchStaffProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('hospital_staff')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching staff profile:', error);
      } else {
        setStaff(data);
      }
    } catch (error) {
      console.error('Error fetching staff profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const scanPatient = async (scanType: string, scanData: string) => {
    if (!staff) return null;

    try {
      const { data, error } = await supabase
        .from('patient_scans')
        .insert({
          staff_id: staff.id,
          scan_type: scanType,
          scan_data: scanData
        })
        .select()
        .single();

      if (error) {
        console.error('Error recording scan:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error recording scan:', error);
      throw error;
    }
  };

  const lookupPatient = async (patientId: string) => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('patient_id', patientId)
        .single();

      if (error) {
        console.error('Error looking up patient:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error looking up patient:', error);
      throw error;
    }
  };

  const lookupEmergencyPatient = async (emergencyId: string) => {
    try {
      const { data, error } = await supabase
        .from('emergency_patients')
        .select('*')
        .eq('emergency_id', emergencyId)
        .single();

      if (error) {
        console.error('Error looking up emergency patient:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error looking up emergency patient:', error);
      throw error;
    }
  };

  const addDoctorNote = async (patientId: string, visitId: string, notes: string) => {
    if (!staff) return null;

    try {
      const { data, error } = await supabase
        .from('patient_visits')
        .update({
          doctor_notes: notes,
          staff_id: staff.id,
          status: 'completed'
        })
        .eq('id', visitId)
        .select()
        .single();

      if (error) {
        console.error('Error adding doctor note:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error adding doctor note:', error);
      throw error;
    }
  };

  return {
    staff,
    loading,
    scanPatient,
    lookupPatient,
    lookupEmergencyPatient,
    addDoctorNote,
    refetch: fetchStaffProfile
  };
};
