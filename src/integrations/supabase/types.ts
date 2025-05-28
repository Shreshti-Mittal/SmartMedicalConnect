export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      emergency_patients: {
        Row: {
          allergies: string | null
          condition_description: string | null
          created_at: string
          emergency_contact_phone: string | null
          emergency_id: string
          estimated_age: number | null
          gender: string | null
          hospital_name: string | null
          id: string
          medications: string | null
          patient_name: string | null
          status: string | null
        }
        Insert: {
          allergies?: string | null
          condition_description?: string | null
          created_at?: string
          emergency_contact_phone?: string | null
          emergency_id: string
          estimated_age?: number | null
          gender?: string | null
          hospital_name?: string | null
          id?: string
          medications?: string | null
          patient_name?: string | null
          status?: string | null
        }
        Update: {
          allergies?: string | null
          condition_description?: string | null
          created_at?: string
          emergency_contact_phone?: string | null
          emergency_id?: string
          estimated_age?: number | null
          gender?: string | null
          hospital_name?: string | null
          id?: string
          medications?: string | null
          patient_name?: string | null
          status?: string | null
        }
        Relationships: []
      }
      hospital_reviews: {
        Row: {
          created_at: string
          hospital_id: string
          id: string
          patient_id: string
          rating: number
          review_text: string | null
          visit_date: string | null
        }
        Insert: {
          created_at?: string
          hospital_id: string
          id?: string
          patient_id: string
          rating: number
          review_text?: string | null
          visit_date?: string | null
        }
        Update: {
          created_at?: string
          hospital_id?: string
          id?: string
          patient_id?: string
          rating?: number
          review_text?: string | null
          visit_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hospital_reviews_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hospital_reviews_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      hospital_staff: {
        Row: {
          created_at: string
          department: string | null
          email: string | null
          full_name: string
          hospital_id: string
          id: string
          is_active: boolean | null
          phone: string | null
          role: string
          staff_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          email?: string | null
          full_name: string
          hospital_id: string
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role?: string
          staff_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string | null
          email?: string | null
          full_name?: string
          hospital_id?: string
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role?: string
          staff_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hospital_staff_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      hospitals: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          rating: number | null
          total_reviews: number | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          rating?: number | null
          total_reviews?: number | null
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          rating?: number | null
          total_reviews?: number | null
        }
        Relationships: []
      }
      medical_history: {
        Row: {
          allergies: string[] | null
          chronic_conditions: string[] | null
          current_medications: string[] | null
          family_history: string | null
          id: string
          patient_id: string
          previous_surgeries: string[] | null
          updated_at: string
        }
        Insert: {
          allergies?: string[] | null
          chronic_conditions?: string[] | null
          current_medications?: string[] | null
          family_history?: string | null
          id?: string
          patient_id: string
          previous_surgeries?: string[] | null
          updated_at?: string
        }
        Update: {
          allergies?: string[] | null
          chronic_conditions?: string[] | null
          current_medications?: string[] | null
          family_history?: string | null
          id?: string
          patient_id?: string
          previous_surgeries?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "medical_history_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_records: {
        Row: {
          document_name: string
          document_type: string
          file_url: string | null
          hospital_name: string | null
          id: string
          notes: string | null
          patient_id: string
          upload_date: string
        }
        Insert: {
          document_name: string
          document_type: string
          file_url?: string | null
          hospital_name?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          upload_date?: string
        }
        Update: {
          document_name?: string
          document_type?: string
          file_url?: string | null
          hospital_name?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          upload_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "medical_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_scans: {
        Row: {
          emergency_id: string | null
          id: string
          patient_id: string | null
          scan_data: string | null
          scan_type: string
          scanned_at: string
          staff_id: string
        }
        Insert: {
          emergency_id?: string | null
          id?: string
          patient_id?: string | null
          scan_data?: string | null
          scan_type: string
          scanned_at?: string
          staff_id: string
        }
        Update: {
          emergency_id?: string | null
          id?: string
          patient_id?: string | null
          scan_data?: string | null
          scan_type?: string
          scanned_at?: string
          staff_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_scans_emergency_id_fkey"
            columns: ["emergency_id"]
            isOneToOne: false
            referencedRelation: "emergency_patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_scans_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_scans_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "hospital_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_visits: {
        Row: {
          doctor_notes: string | null
          hospital_id: string
          id: string
          patient_id: string
          qr_code: string
          staff_id: string | null
          status: string | null
          visit_date: string
          visit_reason: string | null
        }
        Insert: {
          doctor_notes?: string | null
          hospital_id: string
          id?: string
          patient_id: string
          qr_code: string
          staff_id?: string | null
          status?: string | null
          visit_date?: string
          visit_reason?: string | null
        }
        Update: {
          doctor_notes?: string | null
          hospital_id?: string
          id?: string
          patient_id?: string
          qr_code?: string
          staff_id?: string | null
          status?: string | null
          visit_date?: string
          visit_reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_visits_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_visits_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_visits_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "hospital_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          created_at: string
          date_of_birth: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          full_name: string
          gender: string | null
          id: string
          insurance_info: Json | null
          patient_id: string
          phone: string | null
          profile_photo_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name: string
          gender?: string | null
          id?: string
          insurance_info?: Json | null
          patient_id: string
          phone?: string | null
          profile_photo_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          insurance_info?: Json | null
          patient_id?: string
          phone?: string | null
          profile_photo_url?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_emergency_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_patient_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_staff_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_visit_qr: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
