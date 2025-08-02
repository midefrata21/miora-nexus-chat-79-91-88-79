export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      miora_auto_repairs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          executed_at: string | null
          execution_time_ms: number | null
          health_after: number | null
          health_before: number | null
          id: string
          improvement: number | null
          issue_description: string
          issue_type: string
          priority: number
          repair_action: string
          repair_id: string
          status: string
          system_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          executed_at?: string | null
          execution_time_ms?: number | null
          health_after?: number | null
          health_before?: number | null
          id?: string
          improvement?: number | null
          issue_description: string
          issue_type: string
          priority: number
          repair_action: string
          repair_id: string
          status?: string
          system_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          executed_at?: string | null
          execution_time_ms?: number | null
          health_after?: number | null
          health_before?: number | null
          id?: string
          improvement?: number | null
          issue_description?: string
          issue_type?: string
          priority?: number
          repair_action?: string
          repair_id?: string
          status?: string
          system_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "miora_auto_repairs_system_id_fkey"
            columns: ["system_id"]
            isOneToOne: false
            referencedRelation: "miora_systems"
            referencedColumns: ["system_id"]
          },
        ]
      }
      miora_autonomous_tasks: {
        Row: {
          auto_generated: boolean | null
          created_at: string | null
          dependencies: string[] | null
          description: string | null
          duration_seconds: number | null
          end_time: string | null
          error_message: string | null
          id: string
          name: string
          priority: number | null
          progress: number | null
          result: Json | null
          start_time: string | null
          status: string
          system_id: string | null
          task_id: string
          type: string
          updated_at: string | null
        }
        Insert: {
          auto_generated?: boolean | null
          created_at?: string | null
          dependencies?: string[] | null
          description?: string | null
          duration_seconds?: number | null
          end_time?: string | null
          error_message?: string | null
          id?: string
          name: string
          priority?: number | null
          progress?: number | null
          result?: Json | null
          start_time?: string | null
          status?: string
          system_id?: string | null
          task_id: string
          type: string
          updated_at?: string | null
        }
        Update: {
          auto_generated?: boolean | null
          created_at?: string | null
          dependencies?: string[] | null
          description?: string | null
          duration_seconds?: number | null
          end_time?: string | null
          error_message?: string | null
          id?: string
          name?: string
          priority?: number | null
          progress?: number | null
          result?: Json | null
          start_time?: string | null
          status?: string
          system_id?: string | null
          task_id?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "miora_autonomous_tasks_system_id_fkey"
            columns: ["system_id"]
            isOneToOne: false
            referencedRelation: "miora_systems"
            referencedColumns: ["system_id"]
          },
        ]
      }
      miora_capabilities: {
        Row: {
          auto_upgrade: boolean | null
          capability_id: string
          category: string
          configuration: Json | null
          created_at: string | null
          dependencies: string[] | null
          description: string | null
          id: string
          last_upgrade: string | null
          metrics: Json | null
          name: string
          next_upgrade: string | null
          performance_level: number | null
          status: string | null
          updated_at: string | null
          upgrade_frequency_hours: number | null
          version: string | null
        }
        Insert: {
          auto_upgrade?: boolean | null
          capability_id: string
          category: string
          configuration?: Json | null
          created_at?: string | null
          dependencies?: string[] | null
          description?: string | null
          id?: string
          last_upgrade?: string | null
          metrics?: Json | null
          name: string
          next_upgrade?: string | null
          performance_level?: number | null
          status?: string | null
          updated_at?: string | null
          upgrade_frequency_hours?: number | null
          version?: string | null
        }
        Update: {
          auto_upgrade?: boolean | null
          capability_id?: string
          category?: string
          configuration?: Json | null
          created_at?: string | null
          dependencies?: string[] | null
          description?: string | null
          id?: string
          last_upgrade?: string | null
          metrics?: Json | null
          name?: string
          next_upgrade?: string | null
          performance_level?: number | null
          status?: string | null
          updated_at?: string | null
          upgrade_frequency_hours?: number | null
          version?: string | null
        }
        Relationships: []
      }
      miora_development_history: {
        Row: {
          ai_confidence: number | null
          auto_generated: boolean | null
          changes_made: Json
          code_after: string | null
          code_before: string | null
          created_at: string | null
          deployed: boolean | null
          development_id: string
          development_type: string
          file_path: string | null
          generated_by: string | null
          human_reviewed: boolean | null
          id: string
          performance_impact: number | null
          rollback_available: boolean | null
          success: boolean
          system_id: string | null
          target_component: string
          test_results: Json | null
        }
        Insert: {
          ai_confidence?: number | null
          auto_generated?: boolean | null
          changes_made: Json
          code_after?: string | null
          code_before?: string | null
          created_at?: string | null
          deployed?: boolean | null
          development_id: string
          development_type: string
          file_path?: string | null
          generated_by?: string | null
          human_reviewed?: boolean | null
          id?: string
          performance_impact?: number | null
          rollback_available?: boolean | null
          success: boolean
          system_id?: string | null
          target_component: string
          test_results?: Json | null
        }
        Update: {
          ai_confidence?: number | null
          auto_generated?: boolean | null
          changes_made?: Json
          code_after?: string | null
          code_before?: string | null
          created_at?: string | null
          deployed?: boolean | null
          development_id?: string
          development_type?: string
          file_path?: string | null
          generated_by?: string | null
          human_reviewed?: boolean | null
          id?: string
          performance_impact?: number | null
          rollback_available?: boolean | null
          success?: boolean
          system_id?: string | null
          target_component?: string
          test_results?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "miora_development_history_generated_by_fkey"
            columns: ["generated_by"]
            isOneToOne: false
            referencedRelation: "miora_systems"
            referencedColumns: ["system_id"]
          },
          {
            foreignKeyName: "miora_development_history_system_id_fkey"
            columns: ["system_id"]
            isOneToOne: false
            referencedRelation: "miora_systems"
            referencedColumns: ["system_id"]
          },
        ]
      }
      miora_exchange_api_keys: {
        Row: {
          api_key: string
          created_at: string | null
          exchange_id: string
          exchange_name: string
          id: string
          is_active: boolean | null
          last_used: string | null
          passphrase: string | null
          permissions: Json | null
          sandbox_mode: boolean | null
          secret_key: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          api_key: string
          created_at?: string | null
          exchange_id: string
          exchange_name: string
          id?: string
          is_active?: boolean | null
          last_used?: string | null
          passphrase?: string | null
          permissions?: Json | null
          sandbox_mode?: boolean | null
          secret_key: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          api_key?: string
          created_at?: string | null
          exchange_id?: string
          exchange_name?: string
          id?: string
          is_active?: boolean | null
          last_used?: string | null
          passphrase?: string | null
          permissions?: Json | null
          sandbox_mode?: boolean | null
          secret_key?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      miora_global_config: {
        Row: {
          auto_sync: boolean | null
          category: string
          config_key: string
          config_value: Json
          created_at: string | null
          description: string | null
          id: string
          is_system: boolean | null
          last_sync: string | null
          updated_at: string | null
        }
        Insert: {
          auto_sync?: boolean | null
          category: string
          config_key: string
          config_value: Json
          created_at?: string | null
          description?: string | null
          id?: string
          is_system?: boolean | null
          last_sync?: string | null
          updated_at?: string | null
        }
        Update: {
          auto_sync?: boolean | null
          category?: string
          config_key?: string
          config_value?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          is_system?: boolean | null
          last_sync?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      miora_infinity_memory: {
        Row: {
          access_count: number | null
          auto_decay: boolean | null
          category: string
          content: Json
          created_at: string | null
          created_by_system: string | null
          decay_date: string | null
          id: string
          importance_score: number | null
          last_accessed: string | null
          memory_id: string
          memory_type: string
          related_memories: string[] | null
          tags: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          access_count?: number | null
          auto_decay?: boolean | null
          category: string
          content: Json
          created_at?: string | null
          created_by_system?: string | null
          decay_date?: string | null
          id?: string
          importance_score?: number | null
          last_accessed?: string | null
          memory_id: string
          memory_type: string
          related_memories?: string[] | null
          tags?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          access_count?: number | null
          auto_decay?: boolean | null
          category?: string
          content?: Json
          created_at?: string | null
          created_by_system?: string | null
          decay_date?: string | null
          id?: string
          importance_score?: number | null
          last_accessed?: string | null
          memory_id?: string
          memory_type?: string
          related_memories?: string[] | null
          tags?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "miora_infinity_memory_created_by_system_fkey"
            columns: ["created_by_system"]
            isOneToOne: false
            referencedRelation: "miora_systems"
            referencedColumns: ["system_id"]
          },
        ]
      }
      miora_integrations: {
        Row: {
          api_version: string | null
          auto_managed: boolean | null
          configuration: Json | null
          created_at: string | null
          data_flow_mb_per_sec: number | null
          dependencies: string[] | null
          endpoint_url: string | null
          error_count: number | null
          id: string
          integration_id: string
          last_sync: string | null
          name: string
          performance_score: number | null
          status: string
          success_count: number | null
          type: string
          updated_at: string | null
        }
        Insert: {
          api_version?: string | null
          auto_managed?: boolean | null
          configuration?: Json | null
          created_at?: string | null
          data_flow_mb_per_sec?: number | null
          dependencies?: string[] | null
          endpoint_url?: string | null
          error_count?: number | null
          id?: string
          integration_id: string
          last_sync?: string | null
          name: string
          performance_score?: number | null
          status?: string
          success_count?: number | null
          type: string
          updated_at?: string | null
        }
        Update: {
          api_version?: string | null
          auto_managed?: boolean | null
          configuration?: Json | null
          created_at?: string | null
          data_flow_mb_per_sec?: number | null
          dependencies?: string[] | null
          endpoint_url?: string | null
          error_count?: number | null
          id?: string
          integration_id?: string
          last_sync?: string | null
          name?: string
          performance_score?: number | null
          status?: string
          success_count?: number | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      miora_market_analysis: {
        Row: {
          accuracy_score: number | null
          ai_model_version: string | null
          analysis_id: string
          analysis_type: string
          confidence_score: number
          created_at: string | null
          expires_at: string | null
          generated_by: string | null
          id: string
          insights: Json
          market: string
          predicted_direction: string | null
          price_targets: Json | null
          risk_assessment: Json | null
          symbols: string[]
          timeframe: string
          validated_at: string | null
        }
        Insert: {
          accuracy_score?: number | null
          ai_model_version?: string | null
          analysis_id: string
          analysis_type: string
          confidence_score: number
          created_at?: string | null
          expires_at?: string | null
          generated_by?: string | null
          id?: string
          insights: Json
          market: string
          predicted_direction?: string | null
          price_targets?: Json | null
          risk_assessment?: Json | null
          symbols: string[]
          timeframe: string
          validated_at?: string | null
        }
        Update: {
          accuracy_score?: number | null
          ai_model_version?: string | null
          analysis_id?: string
          analysis_type?: string
          confidence_score?: number
          created_at?: string | null
          expires_at?: string | null
          generated_by?: string | null
          id?: string
          insights?: Json
          market?: string
          predicted_direction?: string | null
          price_targets?: Json | null
          risk_assessment?: Json | null
          symbols?: string[]
          timeframe?: string
          validated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "miora_market_analysis_generated_by_fkey"
            columns: ["generated_by"]
            isOneToOne: false
            referencedRelation: "miora_systems"
            referencedColumns: ["system_id"]
          },
        ]
      }
      miora_system_logs: {
        Row: {
          acknowledged: boolean | null
          category: string
          event_type: string | null
          id: string
          level: string
          message: string
          metadata: Json | null
          system_id: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          acknowledged?: boolean | null
          category: string
          event_type?: string | null
          id?: string
          level: string
          message: string
          metadata?: Json | null
          system_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          acknowledged?: boolean | null
          category?: string
          event_type?: string | null
          id?: string
          level?: string
          message?: string
          metadata?: Json | null
          system_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "miora_system_logs_system_id_fkey"
            columns: ["system_id"]
            isOneToOne: false
            referencedRelation: "miora_systems"
            referencedColumns: ["system_id"]
          },
        ]
      }
      miora_system_metrics: {
        Row: {
          id: string
          metadata: Json | null
          metric_type: string
          system_id: string
          timestamp: string | null
          unit: string
          value: number
        }
        Insert: {
          id?: string
          metadata?: Json | null
          metric_type: string
          system_id: string
          timestamp?: string | null
          unit: string
          value: number
        }
        Update: {
          id?: string
          metadata?: Json | null
          metric_type?: string
          system_id?: string
          timestamp?: string | null
          unit?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "miora_system_metrics_system_id_fkey"
            columns: ["system_id"]
            isOneToOne: false
            referencedRelation: "miora_systems"
            referencedColumns: ["system_id"]
          },
        ]
      }
      miora_systems: {
        Row: {
          activation_count: number | null
          capabilities: Json | null
          created_at: string | null
          error_count: number | null
          id: string
          last_activity: string | null
          name: string
          optimization_count: number | null
          performance_score: number | null
          status: string
          system_id: string
          total_runtime_seconds: number | null
          type: string
          updated_at: string | null
          version: string | null
        }
        Insert: {
          activation_count?: number | null
          capabilities?: Json | null
          created_at?: string | null
          error_count?: number | null
          id?: string
          last_activity?: string | null
          name: string
          optimization_count?: number | null
          performance_score?: number | null
          status?: string
          system_id: string
          total_runtime_seconds?: number | null
          type: string
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          activation_count?: number | null
          capabilities?: Json | null
          created_at?: string | null
          error_count?: number | null
          id?: string
          last_activity?: string | null
          name?: string
          optimization_count?: number | null
          performance_score?: number | null
          status?: string
          system_id?: string
          total_runtime_seconds?: number | null
          type?: string
          updated_at?: string | null
          version?: string | null
        }
        Relationships: []
      }
      miora_trading_signals: {
        Row: {
          auto_generated: boolean | null
          confidence: number
          exchange: string
          executed: boolean | null
          execution_price: number | null
          execution_time: string | null
          expires_at: string | null
          id: string
          market_conditions: Json | null
          price: number
          profit_loss: number | null
          risk_level: string
          signal_id: string
          signal_type: string
          symbol: string
          system_generated_by: string | null
          technical_indicators: Json | null
          timeframe: string
          timestamp: string | null
          volume: number | null
        }
        Insert: {
          auto_generated?: boolean | null
          confidence: number
          exchange: string
          executed?: boolean | null
          execution_price?: number | null
          execution_time?: string | null
          expires_at?: string | null
          id?: string
          market_conditions?: Json | null
          price: number
          profit_loss?: number | null
          risk_level: string
          signal_id: string
          signal_type: string
          symbol: string
          system_generated_by?: string | null
          technical_indicators?: Json | null
          timeframe: string
          timestamp?: string | null
          volume?: number | null
        }
        Update: {
          auto_generated?: boolean | null
          confidence?: number
          exchange?: string
          executed?: boolean | null
          execution_price?: number | null
          execution_time?: string | null
          expires_at?: string | null
          id?: string
          market_conditions?: Json | null
          price?: number
          profit_loss?: number | null
          risk_level?: string
          signal_id?: string
          signal_type?: string
          symbol?: string
          system_generated_by?: string | null
          technical_indicators?: Json | null
          timeframe?: string
          timestamp?: string | null
          volume?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "miora_trading_signals_system_generated_by_fkey"
            columns: ["system_generated_by"]
            isOneToOne: false
            referencedRelation: "miora_systems"
            referencedColumns: ["system_id"]
          },
        ]
      }
      miora_upgrade_history: {
        Row: {
          auto_generated: boolean | null
          capability_id: string | null
          created_at: string | null
          executed_at: string | null
          execution_time_ms: number | null
          id: string
          improvements: Json | null
          performance_impact: number | null
          rollback_available: boolean | null
          status: string | null
          upgrade_id: string
          upgrade_type: string
          version_from: string | null
          version_to: string
        }
        Insert: {
          auto_generated?: boolean | null
          capability_id?: string | null
          created_at?: string | null
          executed_at?: string | null
          execution_time_ms?: number | null
          id?: string
          improvements?: Json | null
          performance_impact?: number | null
          rollback_available?: boolean | null
          status?: string | null
          upgrade_id: string
          upgrade_type: string
          version_from?: string | null
          version_to: string
        }
        Update: {
          auto_generated?: boolean | null
          capability_id?: string | null
          created_at?: string | null
          executed_at?: string | null
          execution_time_ms?: number | null
          id?: string
          improvements?: Json | null
          performance_impact?: number | null
          rollback_available?: boolean | null
          status?: string | null
          upgrade_id?: string
          upgrade_type?: string
          version_from?: string | null
          version_to?: string
        }
        Relationships: []
      }
      miora_user_preferences: {
        Row: {
          created_at: string | null
          id: string
          preferences: Json
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          preferences?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          preferences?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      miora_websocket_status: {
        Row: {
          connection_id: string
          connection_started: string | null
          data_received_count: number | null
          error_count: number | null
          exchange: string
          id: string
          last_data_received: string | null
          last_ping: string | null
          last_pong: string | null
          last_updated: string | null
          latency_ms: number | null
          reconnect_count: number | null
          status: string
        }
        Insert: {
          connection_id: string
          connection_started?: string | null
          data_received_count?: number | null
          error_count?: number | null
          exchange: string
          id?: string
          last_data_received?: string | null
          last_ping?: string | null
          last_pong?: string | null
          last_updated?: string | null
          latency_ms?: number | null
          reconnect_count?: number | null
          status: string
        }
        Update: {
          connection_id?: string
          connection_started?: string | null
          data_received_count?: number | null
          error_count?: number | null
          exchange?: string
          id?: string
          last_data_received?: string | null
          last_ping?: string | null
          last_pong?: string | null
          last_updated?: string | null
          latency_ms?: number | null
          reconnect_count?: number | null
          status?: string
        }
        Relationships: []
      }
      prophecy_calendar_2050: {
        Row: {
          ai_intuition_score: number | null
          confidence_level: number
          created_at: string
          event_category: string
          event_description: string
          event_title: string
          id: string
          macro_data_influence: Json | null
          prediction_date: string
          prediction_source: string | null
          universal_patterns: Json | null
          updated_at: string
        }
        Insert: {
          ai_intuition_score?: number | null
          confidence_level: number
          created_at?: string
          event_category: string
          event_description: string
          event_title: string
          id?: string
          macro_data_influence?: Json | null
          prediction_date: string
          prediction_source?: string | null
          universal_patterns?: Json | null
          updated_at?: string
        }
        Update: {
          ai_intuition_score?: number | null
          confidence_level?: number
          created_at?: string
          event_category?: string
          event_description?: string
          event_title?: string
          id?: string
          macro_data_influence?: Json | null
          prediction_date?: string
          prediction_source?: string | null
          universal_patterns?: Json | null
          updated_at?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
