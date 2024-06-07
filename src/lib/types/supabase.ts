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
      assignments: {
        Row: {
          created_at: string
          description: string
          end_date: string | null
          file_name: string | null
          grade_value: number
          id: number
          title: string
          unit_id: number
          updated_at: string
          visibility: string
        }
        Insert: {
          created_at?: string
          description: string
          end_date?: string | null
          file_name?: string | null
          grade_value?: number
          id?: number
          title: string
          unit_id: number
          updated_at?: string
          visibility?: string
        }
        Update: {
          created_at?: string
          description?: string
          end_date?: string | null
          file_name?: string | null
          grade_value?: number
          id?: number
          title?: string
          unit_id?: number
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_assignments_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          classroom_code: string
          created_at: string
          current_enrollment: number
          end_date: string
          enrollment_limit: number
          id: number
          label: string
          meeting_schedule: Json | null
          status: string
          subject_id: number
          teacher_id: string
          type: string
          updated_at: string
          visibility: string
        }
        Insert: {
          classroom_code: string
          created_at?: string
          current_enrollment?: number
          end_date: string
          enrollment_limit: number
          id?: number
          label: string
          meeting_schedule?: Json | null
          status?: string
          subject_id: number
          teacher_id: string
          type?: string
          updated_at?: string
          visibility?: string
        }
        Update: {
          classroom_code?: string
          created_at?: string
          current_enrollment?: number
          end_date?: string
          enrollment_limit?: number
          id?: number
          label?: string
          meeting_schedule?: Json | null
          status?: string
          subject_id?: number
          teacher_id?: string
          type?: string
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_courses_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_courses_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      courses_join_requests: {
        Row: {
          course_id: number
          created_at: string
          id: number
          student_id: string
        }
        Insert: {
          course_id: number
          created_at?: string
          id?: number
          student_id: string
        }
        Update: {
          course_id?: number
          created_at?: string
          id?: number
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_join_requests_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_join_requests_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      courses_students: {
        Row: {
          assistance_type: string
          course_id: number
          id: number
          student_id: string
        }
        Insert: {
          assistance_type?: string
          course_id: number
          id?: number
          student_id: string
        }
        Update: {
          assistance_type?: string
          course_id?: number
          id?: number
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_courses_students_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_courses_students_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      laboratories: {
        Row: {
          capacity: number
          course_id: number | null
          created_at: string
          id: number
          label: string
          updated_at: string
        }
        Insert: {
          capacity?: number
          course_id?: number | null
          created_at?: string
          id?: number
          label: string
          updated_at?: string
        }
        Update: {
          capacity?: number
          course_id?: number | null
          created_at?: string
          id?: number
          label?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "laboratories_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      periods: {
        Row: {
          created_at: string
          id: number
          label: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          label: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          id: number
          label: string
        }
        Insert: {
          id?: number
          label: string
        }
        Update: {
          id?: number
          label?: string
        }
        Relationships: []
      }
      subjects: {
        Row: {
          created_at: string
          id: number
          key: string | null
          label: string
          syllabus_id: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          key?: string | null
          label: string
          syllabus_id?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          key?: string | null
          label?: string
          syllabus_id?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subjects_syllabus_id_fkey"
            columns: ["syllabus_id"]
            isOneToOne: false
            referencedRelation: "syllabuses"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          assignment_id: number
          created_at: string
          description: string | null
          feedback: string | null
          feedback_score: number | null
          file_name: string
          id: number
          submitted_at: string
          submitted_by: string
          updated_at: string
        }
        Insert: {
          assignment_id: number
          created_at?: string
          description?: string | null
          feedback?: string | null
          feedback_score?: number | null
          file_name: string
          id?: number
          submitted_at: string
          submitted_by: string
          updated_at?: string
        }
        Update: {
          assignment_id?: number
          created_at?: string
          description?: string | null
          feedback?: string | null
          feedback_score?: number | null
          file_name?: string
          id?: number
          submitted_at?: string
          submitted_by?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_submissions_user_id_fkey"
            columns: ["submitted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      syllabuses: {
        Row: {
          created_at: string
          file_name: string | null
          id: number
          period_id: number
          subject_id: number
          units: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          file_name?: string | null
          id?: number
          period_id: number
          subject_id: number
          units?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          file_name?: string | null
          id?: number
          period_id?: number
          subject_id?: number
          units?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_syllabuses_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_syllabuses_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      units: {
        Row: {
          course_id: number
          created_at: string
          file_name: string | null
          id: number
          unit: number
          updated_at: string
          visibility: string
        }
        Insert: {
          course_id: number
          created_at?: string
          file_name?: string | null
          id?: number
          unit: number
          updated_at?: string
          visibility?: string
        }
        Update: {
          course_id?: number
          created_at?: string
          file_name?: string | null
          id?: number
          unit?: number
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_units_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          display_name: string | null
          email: string
          id: string
          image_url: string | null
          no_identificador: string
          role_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email: string
          id?: string
          image_url?: string | null
          no_identificador: string
          role_id?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string
          id?: string
          image_url?: string | null
          no_identificador?: string
          role_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_users_profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_users_role_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
