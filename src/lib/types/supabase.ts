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
      equipment: {
        Row: {
          createdAt: string
          createdBy: number | null
          id: number
          label: string | null
        }
        Insert: {
          createdAt?: string
          createdBy?: number | null
          id?: number
          label?: string | null
        }
        Update: {
          createdAt?: string
          createdBy?: number | null
          id?: number
          label?: string | null
        }
        Relationships: []
      }
      inventory_equipment: {
        Row: {
          createdAt: string
          createdBy: number | null
          equipmentId: number | null
          id: number
          info: string
          updatedAt: string
          updatedBy: number | null
        }
        Insert: {
          createdAt?: string
          createdBy?: number | null
          equipmentId?: number | null
          id?: number
          info?: string
          updatedAt?: string
          updatedBy?: number | null
        }
        Update: {
          createdAt?: string
          createdBy?: number | null
          equipmentId?: number | null
          id?: number
          info?: string
          updatedAt?: string
          updatedBy?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_inventory_equipment_equipmentId_fkey"
            columns: ["equipmentId"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
        ]
      }
      laboratories: {
        Row: {
          busyBy: string | null
          capacity: number | null
          id: number
          label: string
          subjectId: number | null
        }
        Insert: {
          busyBy?: string | null
          capacity?: number | null
          id?: number
          label: string
          subjectId?: number | null
        }
        Update: {
          busyBy?: string | null
          capacity?: number | null
          id?: number
          label?: string
          subjectId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_laboratories_busyBy_fkey"
            columns: ["busyBy"]
            isOneToOne: false
            referencedRelation: "users_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_laboratories_subjectId_fkey"
            columns: ["subjectId"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      laboratory_equipment: {
        Row: {
          createdAt: string
          createdBy: number | null
          equipmentId: number | null
          id: number
          info: string
          laboratoryId: number | null
          updatedAt: string
          updatedBy: number | null
        }
        Insert: {
          createdAt?: string
          createdBy?: number | null
          equipmentId?: number | null
          id?: number
          info?: string
          laboratoryId?: number | null
          updatedAt?: string
          updatedBy?: number | null
        }
        Update: {
          createdAt?: string
          createdBy?: number | null
          equipmentId?: number | null
          id?: number
          info?: string
          laboratoryId?: number | null
          updatedAt?: string
          updatedBy?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_laboratory_equipment_equipmentId_fkey"
            columns: ["equipmentId"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_laboratory_equipment_laboratoryId_fkey"
            columns: ["laboratoryId"]
            isOneToOne: false
            referencedRelation: "laboratories"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
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
      user_roles: {
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
      users_profile: {
        Row: {
          created_at: string
          display_name: string | null
          email: string
          id: string
          image_url: string | null
          lab_at: number | null
          noIdentificador: string | null
          role_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email: string
          id?: string
          image_url?: string | null
          lab_at?: number | null
          noIdentificador?: string | null
          role_id?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string
          id?: string
          image_url?: string | null
          lab_at?: number | null
          noIdentificador?: string | null
          role_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_profiles_labAt_fkey"
            columns: ["lab_at"]
            isOneToOne: false
            referencedRelation: "laboratories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_users_role_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
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
