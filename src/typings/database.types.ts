import { StudySetFlashcard } from "@/contexts/StudySetContext";
import { SupportedLanguage } from "@/lib/locales";
import { Database as DatabaseGenerated } from "@/typings/database-generated.types";
import { PlatformOSType } from "react-native";
import { MergeDeep } from "type-fest";

/**
 * Documents
 */
export type DocumentVersion = `v${number}.${number}.${number}`;

/**
 * Profiles
 */
type ProfileConsentBase = {
  consent_id: string;

  language_used_during_accepting: SupportedLanguage;

  timestamp: string;
  terms_and_conditions_version: DocumentVersion;
  privacy_policy_version: DocumentVersion;

  platform: PlatformOSType;
  app_version: string | null;
  build_version: string | null;
  user_agent: string | null;
};

type ProfileConsentRequiredAction =
  "Checked the required checkbox and confirmed by clicking the confirm button";
type ProfileConsentMarketingAction =
  | "Checked the optional checkbox and confirmed by clicking the confirm button"
  | "Unchecked the optional checkbox and confirmed by clicking the confirm button";
type ProfileConsentAnalyticsAction = ProfileConsentMarketingAction;

type ProfileConsentRequired = ProfileConsentBase & {
  consent_action: ProfileConsentRequiredAction;

  accepted_terms_and_conditions: boolean;
  accepted_privacy_policy: boolean;
};

type ProfileConsentMarketing = ProfileConsentBase & {
  consent_action: ProfileConsentMarketingAction;

  accepted_optional_marketing: boolean;
};

type ProfileConsentAnalytics = ProfileConsentBase & {
  consent_action: ProfileConsentAnalyticsAction;

  accepted_optional_analytics: boolean;
};

/**
 * Quizes
 */
export type QuizQuestionAnswer = {
  word_id: string;
  is_correct: boolean;
  answer_foreign_msg: string;
};

export type QuizQuestion = {
  id: string;
  question_native_msg: string;
  question_foreign_msg: string;
  answering_mode?: Enums<"QUIZ_ANSWERING_MODE">;
  is_extra_difficult: boolean;
  answers: QuizQuestionAnswer[];
};

/**
 * Overwrite Database
 * All overrides happen in this one block.
 */
export type Database = Omit<DatabaseGenerated, "public"> & {
  public: Omit<DatabaseGenerated["public"], "Tables"> & {
    Tables: Omit<
      DatabaseGenerated["public"]["Tables"],
      "achievements_pool" | "quizes" | "study_sessions"
    > & {
      // Profiles
      profiles: {
        Row: MergeDeep<
          DatabaseGenerated["public"]["Tables"]["profiles"]["Row"],
          {
            consent_required: ProfileConsentRequired | null;
            consent_marketing: ProfileConsentMarketing | null;
            consent_analytics: ProfileConsentAnalytics | null;
          }
        >;
        Update: {
          username?: string;
          consent_required?: ProfileConsentRequired | null;
          consent_marketing?: ProfileConsentMarketing | null;
          consent_analytics?: ProfileConsentAnalytics | null;
          expo_push_token?: string | null;
          slide_id?: string;
          slide_progress?: number;
          display_language?: SupportedLanguage;
          learning_language?: SupportedLanguage;
          has_finished_onboarding?: boolean;
        };
      } & Omit<
        DatabaseGenerated["public"]["Tables"]["profiles"],
        "Row" | "Update"
      >;

      // Study sets
      study_sets: {
        Row: MergeDeep<
          DatabaseGenerated["public"]["Tables"]["study_sets"]["Row"],
          {
            words: StudySetFlashcard[];
          }
        >;
        Insert: MergeDeep<
          DatabaseGenerated["public"]["Tables"]["study_sets"]["Insert"],
          {
            user_id: string;
            words: StudySetFlashcard[];
          }
        >;
      } & Omit<
        DatabaseGenerated["public"]["Tables"]["study_sets"],
        "Row" | "Insert"
      >;

      // Study sessions
      study_sessions: {
        Insert: MergeDeep<
          Omit<
            DatabaseGenerated["public"]["Tables"]["study_sessions"]["Insert"],
            "user_id"
          >,
          {
            id: string;
          }
        >;
        Update: MergeDeep<
          DatabaseGenerated["public"]["Tables"]["study_sessions"]["Update"],
          {
            id: string;
          }
        >;
      } & Omit<
        DatabaseGenerated["public"]["Tables"]["study_sessions"],
        "Insert" | "Update"
      >;

      // Quizes
      quizes: {
        Row: MergeDeep<
          DatabaseGenerated["public"]["Tables"]["quizes"]["Row"],
          {
            questions: QuizQuestion[];
          }
        >;
        Insert: Omit<
          DatabaseGenerated["public"]["Tables"]["quizes"]["Insert"],
          "id" | "questions"
        > & {
          id: string;
        };
        Update: {
          has_finished?: boolean;
          has_passed_challenge?: boolean;
        };
      } & Omit<
        DatabaseGenerated["public"]["Tables"]["quizes"],
        "Row" | "Insert" | "Update"
      >;

      // Reports
      reports: {
        Insert: Omit<
          DatabaseGenerated["public"]["Tables"]["reports"]["Insert"],
          "id" | "created_at"
        >;
      } & Omit<DatabaseGenerated["public"]["Tables"]["reports"], "Insert">;

      // Documents
      documents: { Row: { version: DocumentVersion } };

      // Quests
      quests_pool: {
        Row: {
          title: Record<SupportedLanguage, string>;
        };
      };

      // Achievements
      rpc_achievements: {
        Row: {
          name: Record<SupportedLanguage, string>;
          description: Record<SupportedLanguage, string>;
          is_completed: boolean;
        } & DatabaseGenerated["public"]["Tables"]["achievements_pool"]["Row"];
      };
    };
  };
};

/**
 * Re-export
 */
type PublicSchema = Database["public"];

export type Tables<
  T extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]),
> = (PublicSchema["Tables"] & PublicSchema["Views"])[T] extends { Row: infer R }
  ? R
  : never;

export type TablesJoined<
  TPrimary extends keyof Database["public"]["Tables"],
  TRelated extends keyof Database["public"]["Tables"],
> = Database["public"]["Tables"][TPrimary]["Row"] & {
  [K in TRelated]: Database["public"]["Tables"][TRelated]["Row"];
};

export type TablesInsert<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T] extends { Insert: infer I } ? I : never;

export type TablesUpdate<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T] extends { Update: infer U } ? U : never;

export type Enums<T extends keyof PublicSchema["Enums"]> =
  PublicSchema["Enums"][T];

export * from "@/typings/database-generated.types";
