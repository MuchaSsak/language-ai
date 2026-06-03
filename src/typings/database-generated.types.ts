export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      achievements_pool: {
        Row: {
          created_at: string
          description: Json | null
          icon_url: string
          id: string
          is_secret: boolean
          name: Json
          rarity: Database["public"]["Enums"]["ACHIEVEMENT_RARITY"]
          type: Database["public"]["Enums"]["ACHIEVEMENT_TYPE"]
          xp_gain: number
        }
        Insert: {
          created_at?: string
          description?: Json | null
          icon_url: string
          id?: string
          is_secret?: boolean
          name: Json
          rarity: Database["public"]["Enums"]["ACHIEVEMENT_RARITY"]
          type: Database["public"]["Enums"]["ACHIEVEMENT_TYPE"]
          xp_gain: number
        }
        Update: {
          created_at?: string
          description?: Json | null
          icon_url?: string
          id?: string
          is_secret?: boolean
          name?: Json
          rarity?: Database["public"]["Enums"]["ACHIEVEMENT_RARITY"]
          type?: Database["public"]["Enums"]["ACHIEVEMENT_TYPE"]
          xp_gain?: number
        }
        Relationships: []
      }
      achievements_users: {
        Row: {
          achievement_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "achievements_users_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements_pool"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "achievements_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      day_streaks: {
        Row: {
          created_at: string
          id: string
          is_completed: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_completed?: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_completed?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "day_streaks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string
          document: Database["public"]["Enums"]["DOCUMENT_TYPE"]
          effective_date: string
          file_url: string
          id: string
          is_latest: boolean
          language: Database["public"]["Enums"]["SUPPORTED_LANGUAGE"]
          last_updated: string
          update_description: string | null
          version: string
        }
        Insert: {
          created_at?: string
          document: Database["public"]["Enums"]["DOCUMENT_TYPE"]
          effective_date: string
          file_url: string
          id?: string
          is_latest: boolean
          language?: Database["public"]["Enums"]["SUPPORTED_LANGUAGE"]
          last_updated: string
          update_description?: string | null
          version: string
        }
        Update: {
          created_at?: string
          document?: Database["public"]["Enums"]["DOCUMENT_TYPE"]
          effective_date?: string
          file_url?: string
          id?: string
          is_latest?: boolean
          language?: Database["public"]["Enums"]["SUPPORTED_LANGUAGE"]
          last_updated?: string
          update_description?: string | null
          version?: string
        }
        Relationships: []
      }
      live_notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          type: Database["public"]["Enums"]["LIVE_NOTIFICATION_TYPE"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          type?: Database["public"]["Enums"]["LIVE_NOTIFICATION_TYPE"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          type?: Database["public"]["Enums"]["LIVE_NOTIFICATION_TYPE"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          data: Json | null
          expo_push_tokens: string[]
          href: string | null
          id: string
          sound: string | null
          title: string
          ttl: number | null
          user_ids: string[]
        }
        Insert: {
          body: string
          created_at?: string
          data?: Json | null
          expo_push_tokens: string[]
          href?: string | null
          id?: string
          sound?: string | null
          title: string
          ttl?: number | null
          user_ids: string[]
        }
        Update: {
          body?: string
          created_at?: string
          data?: Json | null
          expo_push_tokens?: string[]
          href?: string | null
          id?: string
          sound?: string | null
          title?: string
          ttl?: number | null
          user_ids?: string[]
        }
        Relationships: []
      }
      pictures: {
        Row: {
          created_at: string
          id: string
          labels: Json
          picture_height: number
          picture_url: string
          picture_width: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id: string
          labels: Json
          picture_height: number
          picture_url: string
          picture_width: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          labels?: Json
          picture_height?: number
          picture_url?: string
          picture_width?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pictures_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          achievements_ids: string[]
          app_meta_data: Json | null
          avatar_url: string | null
          consent_analytics: Json | null
          consent_marketing: Json | null
          consent_required: Json | null
          created_at: string
          day_streak: number
          day_streak_record: number
          display_language:
            | Database["public"]["Enums"]["SUPPORTED_LANGUAGE"]
            | null
          display_voice: string | null
          email: string | null
          expo_push_token: string | null
          has_finished_onboarding: boolean
          id: string
          is_private_email: boolean
          is_subscribed: boolean
          last_onboarding_slide_id: string | null
          last_onboarding_slide_progress: number | null
          learning_language:
            | Database["public"]["Enums"]["SUPPORTED_LANGUAGE"]
            | null
          learning_voice: string | null
          random_avatar_color: string
          subscription_event:
            | Database["public"]["Enums"]["SUBSCRIPTION_EVENT"]
            | null
          subscription_type:
            | Database["public"]["Enums"]["SUBSCRIPTION_TYPE"]
            | null
          time_zone: string
          total_achievements_completed: number
          total_all_study_sessions_played: number
          total_challenges_beat: number
          total_challenges_played: number
          total_flashcards_played: number
          total_quizes_played: number
          total_study_sets: number
          total_time_spent_learning: number
          total_words_mastered: number
          total_words_saved: number
          user_id: string
          username: string | null
          voice_is_enabled: boolean
          voice_pitch: number | null
          voice_rate: number | null
          voice_volume: number | null
          xp: number
        }
        Insert: {
          achievements_ids?: string[]
          app_meta_data?: Json | null
          avatar_url?: string | null
          consent_analytics?: Json | null
          consent_marketing?: Json | null
          consent_required?: Json | null
          created_at?: string
          day_streak?: number
          day_streak_record?: number
          display_language?:
            | Database["public"]["Enums"]["SUPPORTED_LANGUAGE"]
            | null
          display_voice?: string | null
          email?: string | null
          expo_push_token?: string | null
          has_finished_onboarding?: boolean
          id?: string
          is_private_email: boolean
          is_subscribed?: boolean
          last_onboarding_slide_id?: string | null
          last_onboarding_slide_progress?: number | null
          learning_language?:
            | Database["public"]["Enums"]["SUPPORTED_LANGUAGE"]
            | null
          learning_voice?: string | null
          random_avatar_color: string
          subscription_event?:
            | Database["public"]["Enums"]["SUBSCRIPTION_EVENT"]
            | null
          subscription_type?:
            | Database["public"]["Enums"]["SUBSCRIPTION_TYPE"]
            | null
          time_zone?: string
          total_achievements_completed?: number
          total_all_study_sessions_played?: number
          total_challenges_beat?: number
          total_challenges_played?: number
          total_flashcards_played?: number
          total_quizes_played?: number
          total_study_sets?: number
          total_time_spent_learning?: number
          total_words_mastered?: number
          total_words_saved?: number
          user_id: string
          username?: string | null
          voice_is_enabled?: boolean
          voice_pitch?: number | null
          voice_rate?: number | null
          voice_volume?: number | null
          xp?: number
        }
        Update: {
          achievements_ids?: string[]
          app_meta_data?: Json | null
          avatar_url?: string | null
          consent_analytics?: Json | null
          consent_marketing?: Json | null
          consent_required?: Json | null
          created_at?: string
          day_streak?: number
          day_streak_record?: number
          display_language?:
            | Database["public"]["Enums"]["SUPPORTED_LANGUAGE"]
            | null
          display_voice?: string | null
          email?: string | null
          expo_push_token?: string | null
          has_finished_onboarding?: boolean
          id?: string
          is_private_email?: boolean
          is_subscribed?: boolean
          last_onboarding_slide_id?: string | null
          last_onboarding_slide_progress?: number | null
          learning_language?:
            | Database["public"]["Enums"]["SUPPORTED_LANGUAGE"]
            | null
          learning_voice?: string | null
          random_avatar_color?: string
          subscription_event?:
            | Database["public"]["Enums"]["SUBSCRIPTION_EVENT"]
            | null
          subscription_type?:
            | Database["public"]["Enums"]["SUBSCRIPTION_TYPE"]
            | null
          time_zone?: string
          total_achievements_completed?: number
          total_all_study_sessions_played?: number
          total_challenges_beat?: number
          total_challenges_played?: number
          total_flashcards_played?: number
          total_quizes_played?: number
          total_study_sets?: number
          total_time_spent_learning?: number
          total_words_mastered?: number
          total_words_saved?: number
          user_id?: string
          username?: string | null
          voice_is_enabled?: boolean
          voice_pitch?: number | null
          voice_rate?: number | null
          voice_volume?: number | null
          xp?: number
        }
        Relationships: []
      }
      quests_pool: {
        Row: {
          created_at: string
          cycle: Database["public"]["Enums"]["QUEST_CYCLE"]
          icon: Database["public"]["Enums"]["QUESTS_ICONS"]
          id: string
          required_value: number
          title: Json
          type: Database["public"]["Enums"]["QUEST_TYPE"]
          xp_gain: number
        }
        Insert: {
          created_at?: string
          cycle: Database["public"]["Enums"]["QUEST_CYCLE"]
          icon: Database["public"]["Enums"]["QUESTS_ICONS"]
          id?: string
          required_value?: number
          title: Json
          type: Database["public"]["Enums"]["QUEST_TYPE"]
          xp_gain: number
        }
        Update: {
          created_at?: string
          cycle?: Database["public"]["Enums"]["QUEST_CYCLE"]
          icon?: Database["public"]["Enums"]["QUESTS_ICONS"]
          id?: string
          required_value?: number
          title?: Json
          type?: Database["public"]["Enums"]["QUEST_TYPE"]
          xp_gain?: number
        }
        Relationships: []
      }
      quests_users: {
        Row: {
          created_at: string
          current_value: number
          deadline: string
          id: string
          is_achieved: boolean
          is_active: boolean
          quest_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_value?: number
          deadline: string
          id?: string
          is_achieved?: boolean
          is_active?: boolean
          quest_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_value?: number
          deadline?: string
          id?: string
          is_achieved?: boolean
          is_active?: boolean
          quest_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quests_users_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "quests_pool"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quests_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      quizes: {
        Row: {
          ai_prompt: string | null
          concerns: string[] | null
          created_at: string
          difficulty: Database["public"]["Enums"]["QUIZ_DIFFICULTY"]
          english_ai_prompt_decline: string | null
          estimated_time_seconds: number
          foreign_ai_prompt_decline: string | null
          general_comment: string | null
          has_finished: boolean
          has_passed_challenge: boolean | null
          id: string
          is_challenge: boolean
          is_success: boolean | null
          questions: Json
          questions_count: number
          study_set_id: string | null
          time_limit_seconds: number
          user_id: string
          xp_gain_per_question: number
        }
        Insert: {
          ai_prompt?: string | null
          concerns?: string[] | null
          created_at?: string
          difficulty: Database["public"]["Enums"]["QUIZ_DIFFICULTY"]
          english_ai_prompt_decline?: string | null
          estimated_time_seconds: number
          foreign_ai_prompt_decline?: string | null
          general_comment?: string | null
          has_finished?: boolean
          has_passed_challenge?: boolean | null
          id?: string
          is_challenge?: boolean
          is_success?: boolean | null
          questions: Json
          questions_count: number
          study_set_id?: string | null
          time_limit_seconds: number
          user_id: string
          xp_gain_per_question: number
        }
        Update: {
          ai_prompt?: string | null
          concerns?: string[] | null
          created_at?: string
          difficulty?: Database["public"]["Enums"]["QUIZ_DIFFICULTY"]
          english_ai_prompt_decline?: string | null
          estimated_time_seconds?: number
          foreign_ai_prompt_decline?: string | null
          general_comment?: string | null
          has_finished?: boolean
          has_passed_challenge?: boolean | null
          id?: string
          is_challenge?: boolean
          is_success?: boolean | null
          questions?: Json
          questions_count?: number
          study_set_id?: string | null
          time_limit_seconds?: number
          user_id?: string
          xp_gain_per_question?: number
        }
        Relationships: [
          {
            foreignKeyName: "quizes_study_set_id_fkey"
            columns: ["study_set_id"]
            isOneToOne: false
            referencedRelation: "study_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      reports: {
        Row: {
          category: Database["public"]["Enums"]["REPORT_CATEGORY"]
          created_at: string
          description: string
          element_id: string | null
          id: string
          quiz_id: string | null
          user_id: string
          word_id: string | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["REPORT_CATEGORY"]
          created_at?: string
          description: string
          element_id?: string | null
          id?: string
          quiz_id?: string | null
          user_id: string
          word_id?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["REPORT_CATEGORY"]
          created_at?: string
          description?: string
          element_id?: string | null
          id?: string
          quiz_id?: string | null
          user_id?: string
          word_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      study_sessions: {
        Row: {
          accuracy_percentage: number
          created_at: string
          game_id: string
          game_progress_percentage: number
          game_questions_count: number
          has_finished_game: boolean
          id: string
          mastered_words_ids: string[]
          missed_words_ids: string[]
          remembered_words_ids: string[]
          study_set_id: string | null
          time_spent_seconds: number
          type: Database["public"]["Enums"]["STUDY_SESSION_TYPE"]
          user_id: string
          xp_gain: number
        }
        Insert: {
          accuracy_percentage: number
          created_at?: string
          game_id: string
          game_progress_percentage: number
          game_questions_count: number
          has_finished_game: boolean
          id?: string
          mastered_words_ids?: string[]
          missed_words_ids?: string[]
          remembered_words_ids?: string[]
          study_set_id?: string | null
          time_spent_seconds: number
          type: Database["public"]["Enums"]["STUDY_SESSION_TYPE"]
          user_id: string
          xp_gain: number
        }
        Update: {
          accuracy_percentage?: number
          created_at?: string
          game_id?: string
          game_progress_percentage?: number
          game_questions_count?: number
          has_finished_game?: boolean
          id?: string
          mastered_words_ids?: string[]
          missed_words_ids?: string[]
          remembered_words_ids?: string[]
          study_set_id?: string | null
          time_spent_seconds?: number
          type?: Database["public"]["Enums"]["STUDY_SESSION_TYPE"]
          user_id?: string
          xp_gain?: number
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_study_set_id_fkey"
            columns: ["study_set_id"]
            isOneToOne: false
            referencedRelation: "study_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      study_sets: {
        Row: {
          ai_modified_words_ids: string[]
          ai_prompts: string[] | null
          created_at: string
          id: string
          mastered_words_ids: string[]
          missed_words_ids: string[]
          remembered_words_ids: string[]
          saved_words_ids: string[]
          title: string
          user_id: string
          words: Json
        }
        Insert: {
          ai_modified_words_ids?: string[]
          ai_prompts?: string[] | null
          created_at?: string
          id?: string
          mastered_words_ids?: string[]
          missed_words_ids?: string[]
          remembered_words_ids?: string[]
          saved_words_ids?: string[]
          title: string
          user_id: string
          words: Json
        }
        Update: {
          ai_modified_words_ids?: string[]
          ai_prompts?: string[] | null
          created_at?: string
          id?: string
          mastered_words_ids?: string[]
          missed_words_ids?: string[]
          remembered_words_ids?: string[]
          saved_words_ids?: string[]
          title?: string
          user_id?: string
          words?: Json
        }
        Relationships: [
          {
            foreignKeyName: "study_sets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      complete_achievement: {
        Args: {
          p_achievement_type: Database["public"]["Enums"]["ACHIEVEMENT_TYPE"]
        }
        Returns: undefined
      }
      get_achievements: { Args: never; Returns: Json[] }
      profiles_delete_own: { Args: never; Returns: undefined }
      profiles_export_data: { Args: never; Returns: Json }
      profiles_get_own: {
        Args: never
        Returns: {
          achievements_ids: string[]
          app_meta_data: Json | null
          avatar_url: string | null
          consent_analytics: Json | null
          consent_marketing: Json | null
          consent_required: Json | null
          created_at: string
          day_streak: number
          day_streak_record: number
          display_language:
            | Database["public"]["Enums"]["SUPPORTED_LANGUAGE"]
            | null
          display_voice: string | null
          email: string | null
          expo_push_token: string | null
          has_finished_onboarding: boolean
          id: string
          is_private_email: boolean
          is_subscribed: boolean
          last_onboarding_slide_id: string | null
          last_onboarding_slide_progress: number | null
          learning_language:
            | Database["public"]["Enums"]["SUPPORTED_LANGUAGE"]
            | null
          learning_voice: string | null
          random_avatar_color: string
          subscription_event:
            | Database["public"]["Enums"]["SUBSCRIPTION_EVENT"]
            | null
          subscription_type:
            | Database["public"]["Enums"]["SUBSCRIPTION_TYPE"]
            | null
          time_zone: string
          total_achievements_completed: number
          total_all_study_sessions_played: number
          total_challenges_beat: number
          total_challenges_played: number
          total_flashcards_played: number
          total_quizes_played: number
          total_study_sets: number
          total_time_spent_learning: number
          total_words_mastered: number
          total_words_saved: number
          user_id: string
          username: string | null
          voice_is_enabled: boolean
          voice_pitch: number | null
          voice_rate: number | null
          voice_volume: number | null
          xp: number
        }[]
        SetofOptions: {
          from: "*"
          to: "profiles"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      search_library: {
        Args: {
          p_filters?: Database["public"]["Enums"]["LIBRARY_SEARCH_FILTER_CATEGORY"][]
          p_is_sort_ascending?: boolean
          p_page: number
          p_search_query?: string
          p_sort_method?: string
        }
        Returns: Json[]
      }
    }
    Enums: {
      ACHIEVEMENT_RARITY: "Bronze" | "Silver" | "Gold" | "Platinum"
      ACHIEVEMENT_TYPE:
        | "play-quiz-first-time"
        | "beat-a-challenge"
        | "enable-text-to-speech"
        | "perfect-accuracy"
        | "create-study-sets"
        | "complete-linkoglot-onboarding"
        | "find-a-secret"
        | "week-long-day-streak"
        | "month-long-day-streak"
        | "early-bird"
        | "night-owl"
        | "quiz-speedrun"
        | "generate-study-set-ai"
        | "looped-flashcards"
        | "remember-word-although-full-hint"
      DOCUMENT_TYPE: "Terms and Conditions" | "Privacy Policy"
      LIBRARY_SEARCH_FILTER_CATEGORY: "study-sets" | "quizes" | "challenges"
      LIVE_NOTIFICATION_TYPE: "admin-message"
      LOG_EVENT:
        | "profiles.insert"
        | "profiles.update"
        | "profiles.delete"
        | "quests_users.insert"
        | "quests_users.update"
        | "quests_users.delete"
        | "pictures.insert"
        | "pictures.update"
        | "pictures.delete"
        | "study_sets.insert"
        | "study_sets.update"
        | "study_sets.delete"
        | "study_sessions.insert"
        | "study_sessions.update"
        | "study_sessions.delete"
        | "quizes.insert"
        | "quizes.update"
        | "quizes.delete"
      QUEST_CYCLE: "daily" | "weekly"
      QUEST_TYPE:
        | "earn-xp"
        | "spend-time"
        | "play-quizes"
        | "play-flashcards"
        | "beat-challenges"
        | "play-anything"
        | "master-words"
      QUESTS_ICONS: "flash" | "stopwatch" | "game-controller"
      QUIZ_ANSWERING_MODE: "multi-choice" | "writing"
      QUIZ_DIFFICULTY: "easy" | "normal" | "hard"
      REPORT_CATEGORY:
        | "Technical issues"
        | "Suggestions"
        | "Other"
        | "Unspecified"
        | "Misinformation"
        | "Inappriopriate AI content"
      STUDY_SESSION_TYPE: "flashcard" | "quiz" | "challenge"
      SUBSCRIPTION_EVENT:
        | "INITIAL_PURCHASE"
        | "RENEWAL"
        | "TRANSFER"
        | "UNCANCELLATION"
        | "SUBSCRIPTION_EXTENDED"
        | "CANCELLATION"
        | "EXPIRATION"
        | "BILLING_ISSUE"
      SUBSCRIPTION_TYPE: "MONTHLY" | "ANNUAL"
      SUPPORTED_LANGUAGE:
        | "en"
        | "pl"
        | "af"
        | "ar"
        | "az"
        | "be"
        | "bg"
        | "bn"
        | "bs"
        | "ca"
        | "cs"
        | "cy"
        | "da"
        | "de"
        | "el"
        | "es"
        | "et"
        | "eu"
        | "fa"
        | "fi"
        | "fr"
        | "ga"
        | "gl"
        | "gu"
        | "he"
        | "hi"
        | "hr"
        | "hu"
        | "hy"
        | "id"
        | "is"
        | "it"
        | "ja"
        | "ka"
        | "kk"
        | "km"
        | "kn"
        | "ko"
        | "lt"
        | "lv"
        | "mk"
        | "ml"
        | "mn"
        | "mr"
        | "ms"
        | "mt"
        | "my"
        | "no"
        | "ne"
        | "nl"
        | "pa"
        | "pt"
        | "ro"
        | "ru"
        | "sk"
        | "sl"
        | "sq"
        | "sr"
        | "sv"
        | "sw"
        | "ta"
        | "te"
        | "th"
        | "tr"
        | "uk"
        | "ur"
        | "uz"
        | "vi"
        | "zh"
        | "zu"
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
    Enums: {
      ACHIEVEMENT_RARITY: ["Bronze", "Silver", "Gold", "Platinum"],
      ACHIEVEMENT_TYPE: [
        "play-quiz-first-time",
        "beat-a-challenge",
        "enable-text-to-speech",
        "perfect-accuracy",
        "create-study-sets",
        "complete-linkoglot-onboarding",
        "find-a-secret",
        "week-long-day-streak",
        "month-long-day-streak",
        "early-bird",
        "night-owl",
        "quiz-speedrun",
        "generate-study-set-ai",
        "looped-flashcards",
        "remember-word-although-full-hint",
      ],
      DOCUMENT_TYPE: ["Terms and Conditions", "Privacy Policy"],
      LIBRARY_SEARCH_FILTER_CATEGORY: ["study-sets", "quizes", "challenges"],
      LIVE_NOTIFICATION_TYPE: ["admin-message"],
      LOG_EVENT: [
        "profiles.insert",
        "profiles.update",
        "profiles.delete",
        "quests_users.insert",
        "quests_users.update",
        "quests_users.delete",
        "pictures.insert",
        "pictures.update",
        "pictures.delete",
        "study_sets.insert",
        "study_sets.update",
        "study_sets.delete",
        "study_sessions.insert",
        "study_sessions.update",
        "study_sessions.delete",
        "quizes.insert",
        "quizes.update",
        "quizes.delete",
      ],
      QUEST_CYCLE: ["daily", "weekly"],
      QUEST_TYPE: [
        "earn-xp",
        "spend-time",
        "play-quizes",
        "play-flashcards",
        "beat-challenges",
        "play-anything",
        "master-words",
      ],
      QUESTS_ICONS: ["flash", "stopwatch", "game-controller"],
      QUIZ_ANSWERING_MODE: ["multi-choice", "writing"],
      QUIZ_DIFFICULTY: ["easy", "normal", "hard"],
      REPORT_CATEGORY: [
        "Technical issues",
        "Suggestions",
        "Other",
        "Unspecified",
        "Misinformation",
        "Inappriopriate AI content",
      ],
      STUDY_SESSION_TYPE: ["flashcard", "quiz", "challenge"],
      SUBSCRIPTION_EVENT: [
        "INITIAL_PURCHASE",
        "RENEWAL",
        "TRANSFER",
        "UNCANCELLATION",
        "SUBSCRIPTION_EXTENDED",
        "CANCELLATION",
        "EXPIRATION",
        "BILLING_ISSUE",
      ],
      SUBSCRIPTION_TYPE: ["MONTHLY", "ANNUAL"],
      SUPPORTED_LANGUAGE: [
        "en",
        "pl",
        "af",
        "ar",
        "az",
        "be",
        "bg",
        "bn",
        "bs",
        "ca",
        "cs",
        "cy",
        "da",
        "de",
        "el",
        "es",
        "et",
        "eu",
        "fa",
        "fi",
        "fr",
        "ga",
        "gl",
        "gu",
        "he",
        "hi",
        "hr",
        "hu",
        "hy",
        "id",
        "is",
        "it",
        "ja",
        "ka",
        "kk",
        "km",
        "kn",
        "ko",
        "lt",
        "lv",
        "mk",
        "ml",
        "mn",
        "mr",
        "ms",
        "mt",
        "my",
        "no",
        "ne",
        "nl",
        "pa",
        "pt",
        "ro",
        "ru",
        "sk",
        "sl",
        "sq",
        "sr",
        "sv",
        "sw",
        "ta",
        "te",
        "th",
        "tr",
        "uk",
        "ur",
        "uz",
        "vi",
        "zh",
        "zu",
      ],
    },
  },
} as const
