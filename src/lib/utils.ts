import { SupportedLanguage } from "@/lib/locales";
import { DocumentVersion, Tables } from "@/typings/database.types";
import { type ClassValue, clsx } from "clsx";
import * as Application from "expo-application";
import Constants from "expo-constants";
import * as Crypto from "expo-crypto";
import * as Linking from "expo-linking";
import { Platform } from "react-native";
import { PurchasesOffering, PurchasesPackage } from "react-native-purchases";
import { twMerge } from "tailwind-merge";

import { HOOK_LOGS, SERVICES_LOGS } from "@/lib/constants";
import { getCalendars } from "expo-localization";

/**
 * General utility
 */
export const servicesLogsArr: {
  timestamp: string;
  name: string;
  data: any;
}[] = [];

export function serviceLog(name: string, data: any) {
  servicesLogsArr.push({
    timestamp: new Date().toLocaleTimeString(),
    name,
    data,
  });

  if (SERVICES_LOGS) console.log("⚙️", name, JSON.stringify(data, null, 2));
}

export const hookLogsArr: {
  timestamp: string;
  name: string;
  data: any;
}[] = [];

export function hookLog(name: string, data: any) {
  hookLogsArr.push({
    timestamp: new Date().toLocaleTimeString(),
    name,
    data,
  });

  if (HOOK_LOGS) console.log("🪝", name, JSON.stringify(data, null, 2));
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toggleArrayElements(
  currentArray: string[],
  targets: string[],
): string[];

export function toggleArrayElements<T extends { id: string }>(
  currentArray: T[],
  targets: T[],
): T[];

export function toggleArrayElements<T extends string | { id: string }>(
  currentArray: T[],
  targets: T[],
): T[] {
  if (!targets.length) return currentArray;

  // Runtime helper to extract a string ID regardless of the array type
  const getId = (item: T): string =>
    typeof item === "string" ? item : (item as { id: string }).id;

  const currentIds = currentArray.map(getId);
  const targetIds = targets.map(getId);

  // Check if every target item's ID is already present
  const allTargetsPresent = targetIds.every((id) => currentIds.includes(id));

  if (allTargetsPresent) {
    // Toggle Off: Remove matching items
    const targetSet = new Set(targetIds);
    return currentArray.filter((item) => !targetSet.has(getId(item)));
  } else {
    // Toggle On: Merge and deduplicate by ID, preserving the original structure
    const mergeMap = new Map<string, T>();

    currentArray.forEach((item) => mergeMap.set(getId(item), item));
    targets.forEach((item) => mergeMap.set(getId(item), item));

    return Array.from(mergeMap.values());
  }
}

function normalizeValue(value: unknown) {
  return value === undefined || value === null ? "" : String(value);
}

export function areValuesEqual(
  valuesA: Record<string, unknown>,
  valuesB: Record<string, unknown>,
) {
  const keysA = Object.keys(valuesA);
  const keysB = Object.keys(valuesB);

  if (keysA.length !== keysB.length) return false;

  return keysA.every(
    (key) => normalizeValue(valuesA[key]) === normalizeValue(valuesB[key]),
  );
}

export const getAndroidPackageName = () =>
  Constants.expoConfig?.android?.package ??
  (Constants as any).manifest?.android?.package ??
  (Constants as any).manifest2?.extra?.expoClient?.androidPackage;

export function isUUID(str?: string) {
  const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!str) return false;

  return UUID_REGEX.test(str.trim());
}

export async function delayedPromise(ms = 5_000) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function areStringArraysEqual(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

export function openURL(url: string, openInNewTab = true) {
  if (openInNewTab && Platform.OS === "web")
    return window.open(url, "_blank", "noopener,noreferrer");
  else Linking.openURL(url);
}

export function getURLSearchParam(
  params: Record<string, string>,
  paramToGet: string,
) {
  return (
    params?.["#"]?.toString()?.split(`${paramToGet}=`)?.[1]?.split("&")?.[0] ||
    params?.[""]?.toString()?.split(`${paramToGet}=`)?.[1]?.split("&")?.[0] ||
    params?.[paramToGet]?.toString()
  );
}

export function getUserTimeZone() {
  return getCalendars()[0]?.timeZone || "UTC";
}

/**
 * Colors
 */
/**
 * Darkens a hex color by a given percentage.
 * @param hex - The input hex color (e.g., "#FFFFFF", "fff", #ff0000)
 * @param percent - Percentage to darken (0 to 100). 50 means 50% darker.
 */
export function darkenColor(hex: string, percent: number) {
  let cleanedHex = hex.replace(/^#/, "");

  if (cleanedHex.length === 3) {
    cleanedHex = cleanedHex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const num = parseInt(cleanedHex, 16);
  let r = (num >> 16) & 255;
  let g = (num >> 8) & 255;
  let b = num & 255;

  const factor = 1 - percent / 100;

  r = Math.max(0, Math.floor(r * factor));
  g = Math.max(0, Math.floor(g * factor));
  b = Math.max(0, Math.floor(b * factor));

  const toHex = (channel: number) => channel.toString(16).padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Tanstack Query
 */
export type DebounceOptions = {
  maxWait?: number;
  fireImmediately?: boolean;
  trailing?: boolean;
  isProtective?: boolean;
  onStateChange?: (isDebouncing: boolean) => void;
};

export function debounce<TArgs extends any[]>(
  func: (...args: TArgs) => void,
  wait: number,
  options?: DebounceOptions,
) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let maxTimeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: TArgs | undefined;
  let protectedArgs: TArgs | undefined; // Persists across executions
  let lastCallTime = 0;
  let hasFiredLeading = false;

  const {
    maxWait,
    fireImmediately = false,
    trailing = true,
    isProtective = false,
    onStateChange,
  } = options || {};

  const invokeFunc = () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (maxTimeoutId) clearTimeout(maxTimeoutId);
    timeoutId = undefined;
    maxTimeoutId = undefined;

    if (lastArgs) {
      const argsToUse = lastArgs;
      lastArgs = undefined;
      // Note: We DO NOT clear protectedArgs here, allowing state to accumulate infinitely
      func(...argsToUse);
    }
    hasFiredLeading = false;
    if (onStateChange) onStateChange(false);
  };

  const maxTimerExpired = () => {
    const timeSinceLastCall = Date.now() - lastCallTime;
    if (trailing && timeSinceLastCall < wait) {
      if (maxWait !== undefined)
        maxTimeoutId = setTimeout(maxTimerExpired, maxWait);
      return;
    }
    invokeFunc();
  };

  function debouncedFn(...args: TArgs): TArgs {
    if (
      isProtective &&
      args.length > 0 &&
      typeof args[0] === "object" &&
      args[0] !== null &&
      !Array.isArray(args[0]) // Ensure we don't accidentally object-merge an array
    ) {
      const incoming = args[0] as Record<string, any>;
      let merged: Record<string, any>;

      if (
        protectedArgs &&
        protectedArgs.length > 0 &&
        typeof protectedArgs[0] === "object"
      ) {
        const current = protectedArgs[0] as Record<string, any>;
        merged = { ...current };

        for (const key in incoming) {
          const val = incoming[key];

          // Strict check: if undefined or null, retain the previously protected state
          if (val === undefined || val === null) continue;

          merged[key] = val; // Overwrite or add the new property
        }
      } else {
        merged = {};
        for (const key in incoming) {
          if (incoming[key] !== undefined && incoming[key] !== null) {
            merged[key] = incoming[key];
          }
        }
      }

      const newArgs = [merged, ...args.slice(1)] as TArgs;
      protectedArgs = newArgs;
      lastArgs = newArgs;
    } else {
      lastArgs = args;
    }

    lastCallTime = Date.now();
    if (onStateChange && !timeoutId && !maxTimeoutId) onStateChange(true);

    if (fireImmediately && !hasFiredLeading) {
      hasFiredLeading = true;
      const argsToUse = lastArgs;
      lastArgs = undefined;
      func(...argsToUse);
    }

    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(invokeFunc, wait);
    if (maxWait !== undefined && !maxTimeoutId)
      maxTimeoutId = setTimeout(maxTimerExpired, maxWait);

    // Return the accumulated state so the React hook can use it synchronously
    return lastArgs || args;
  }

  debouncedFn.cancel = () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (maxTimeoutId) clearTimeout(maxTimeoutId);
    timeoutId = undefined;
    maxTimeoutId = undefined;
    lastArgs = undefined;
    protectedArgs = undefined; // Hard wipe of the protective state on unmount/cancel
    hasFiredLeading = false;
    if (onStateChange) onStateChange(false);
  };

  // NEW: Expose flush to immediately fire pending invocations
  debouncedFn.flush = () => {
    invokeFunc();
  };

  return debouncedFn;
}

/**
 * Profiles
 */
export function emailToProfileName(email: string) {
  return email.split("@")[0].split(".")[0];
}

export function nameToInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export function calculateLevel(xp: number) {
  const XP_PER_LEVEL = 2_225;
  const level = Math.floor(xp / XP_PER_LEVEL);
  return level;
}

/**
 * Achievements
 */
export function getAchievementBadgeColors(
  rarity: Tables<"rpc_achievements">["rarity"],
) {
  let badgeBgColor;
  let badgeTextColor;

  switch (rarity) {
    case "Bronze": {
      badgeBgColor = "#BF8080";
      badgeTextColor = "#FFE0E0";
      break;
    }
    case "Silver": {
      badgeBgColor = "#A1A1A1";
      badgeTextColor = "#F2F2F2";
      break;
    }
    case "Gold": {
      badgeBgColor = "#D9A129";
      badgeTextColor = "#FFEAA3";
      break;
    }
    case "Platinum": {
      badgeBgColor = "#5fa29e";
      badgeTextColor = "#cafffc";
      break;
    }
  }

  return { badgeBgColor, badgeTextColor };
}

/**
 * Quests
 */
export function getQuestsTimeRemaining(deadline?: string | Date): {
  value: number;
  type: "days" | "hours" | "minutes" | null;
} {
  if (!deadline) return { value: 0, type: null };

  const diffMs = new Date(deadline).getTime() - Date.now();
  if (diffMs <= 0) return { value: 0, type: "minutes" };

  const minsRemaining = Math.ceil(diffMs / (1000 * 60));

  if (minsRemaining >= 24 * 60) {
    return {
      value: Math.ceil(minsRemaining / (24 * 60)),
      type: "days",
    };
  }

  if (minsRemaining >= 60) {
    return {
      value: Math.ceil(minsRemaining / 60),
      type: "hours",
    };
  }

  return {
    value: minsRemaining,
    type: "minutes",
  };
}

/**
 * Horizontal Carousel Flow
 */
export function calculateCarouselProgress(
  slideIndex: number,
  slidesLength: number,
) {
  const progress = Math.round((slideIndex / (slidesLength - 1)) * 100) / 100;

  return progress;
}

/**
 * Consent
 */
export function getConsentObject(
  type:
    | "required"
    | "marketing-opt-in"
    | "marketing-opt-out"
    | "analytics-opt-in"
    | "analytics-opt-out",
  language: SupportedLanguage,
  terms_and_conditions_version: DocumentVersion,
  privacy_policy_version: DocumentVersion,
) {
  return {
    consent_id: Crypto.randomUUID(),
    consent_action:
      type === "required"
        ? "Checked the required checkbox and confirmed by clicking the confirm button"
        : type === "marketing-opt-in" || type === "analytics-opt-in"
          ? "Checked the optional checkbox and confirmed by clicking the confirm button"
          : "Unchecked the optional checkbox and confirmed by clicking the confirm button",

    accepted_terms_and_conditions: type === "required" || undefined,
    accepted_privacy_policy: type === "required" || undefined,

    accepted_optional_marketing:
      type === "marketing-opt-in" || type === "marketing-opt-out"
        ? type === "marketing-opt-in"
        : undefined,
    accepted_optional_analytics:
      type === "analytics-opt-in" || type === "analytics-opt-out"
        ? type === "analytics-opt-in"
        : undefined,

    language_used_during_accepting: language,
    timestamp: new Date().toISOString(),
    terms_and_conditions_version,
    privacy_policy_version,

    platform: Platform.OS,
    app_version: Application.nativeApplicationVersion ?? null,
    build_version: Application.nativeBuildVersion ?? null,
    user_agent: Platform.OS === "web" ? navigator.userAgent : null,
  } as
    | Tables<"profiles">["consent_required"]
    | Tables<"profiles">["consent_marketing"]
    | Tables<"profiles">["consent_analytics"];
}

export function checkIsOutdatedDocumentsConsent(
  versionConsented: DocumentVersion,
  latestVersion: DocumentVersion,
) {
  // Semantic versioning (e.g. `v2.1.14`)
  // You don't need to reconsent if the update was only a fix (the last octet)
  const versionConsentedMajor = Number(versionConsented.slice(1).split(".")[0]);
  const latestVersionMajor = Number(latestVersion.slice(1).split(".")[0]);
  const versionConsentedMinor = Number(versionConsented.slice(1).split(".")[1]);
  const latestVersionMinor = Number(latestVersion.slice(1).split(".")[1]);

  if (versionConsentedMajor < latestVersionMajor) return true;
  if (versionConsentedMinor < latestVersionMinor) return true;
  else return false;
}

/**
 * Formatting
 */
export function isoStringToDate(dateString: string) {
  const trimmed = dateString.trim();

  // Handle PostgreSQL DATE (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [year, month, day] = trimmed.split("-").map(Number);
    return new Date(year, month - 1, day); // local date, avoids timezone shift
  }

  // Handle PostgreSQL timestamptz
  const normalizedDateString = trimmed
    .replace(" ", "T")
    .replace(/\.(\d{3})\d+/, ".$1") // trim microseconds → milliseconds
    .replace(/([+-]\d{2})$/, "$1:00") // +02 → +02:00
    .replace(/\+00:00$/, "Z"); // normalize UTC

  return new Date(normalizedDateString);
}

export function formatNumber(n: number) {
  const intl = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return intl.format(n);
}

export function formatDuration(seconds: number) {
  if (isNaN(seconds) || seconds < 0) return "00:00";

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const formattedMins = mins.toString().padStart(2, "0");
  const formattedSecs = secs.toString().padStart(2, "0");

  if (hrs > 0) return `${hrs}:${formattedMins}:${formattedSecs}`;

  return `${formattedMins}:${formattedSecs}`;
}

export function capitalize(str?: string | null) {
  if (!str) return null;

  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Subscription
 */
export function sortSubscriptionPackages(offerings?: PurchasesOffering | null) {
  return offerings?.availablePackages.sort((a, b) => {
    if (a.packageType === "ANNUAL") return -1;
    if (b.packageType === "ANNUAL") return 1;
    return 0;
  });
}

export function calculateAnnualSubscriptionSavingPercentage(
  subscriptionPackages: PurchasesPackage[],
) {
  const monthlyProduct = subscriptionPackages.find(
    (p) => p.packageType === "MONTHLY",
  )?.product;
  const monthlyPrice = monthlyProduct?.pricePerMonth;
  const annuallyPrice = subscriptionPackages.find(
    (p) => p.packageType === "ANNUAL",
  )?.product.pricePerYear;

  if (!monthlyPrice || !annuallyPrice)
    return {
      annuallySavingPercentage: null,
      crossedOffPrice: null,
    };

  const annuallySavingPercentage = 1 - annuallyPrice / (monthlyPrice * 12);

  return {
    annuallySavingPercentage: annuallySavingPercentage,
    crossedOffPrice: monthlyProduct?.pricePerYearString,
  };
}

/**
 * Hints
 */
export function generateNextHint(
  correctAnswer: string,
  currentRevealed: number[],
) {
  const currentRevealedSet = new Set(currentRevealed);
  const availableIndices: number[] = [];

  // 1. Gather all non-space indices that haven't been revealed yet
  for (let i = 0; i < correctAnswer.length; i++) {
    if (correctAnswer[i] !== " " && !currentRevealedSet.has(i)) {
      availableIndices.push(i);
    }
  }

  const totalLetters = correctAnswer.replace(/\s/g, "").length;

  // 2. Determine batch size based on 10% of total letters (rounded)
  // Ensures it defaults to at least 1 letter per press
  const baseBatchSize = Math.max(1, Math.round(totalLetters * 0.1));

  // 3. Prevent stragglers: If the remaining letters would leave behind fewer
  // than or equal to 1 extra character over a normal batch, just absorb them all now.
  const remainingCount = availableIndices.length;
  const batchSize =
    remainingCount <= baseBatchSize + 1 ? remainingCount : baseBatchSize;

  // 4. Randomly pick the batch of indices
  const newlyRevealed: number[] = [];
  const mutableAvailable = [...availableIndices];

  for (let i = 0; i < batchSize; i++) {
    if (mutableAvailable.length === 0) break;
    const randomIndex = Math.floor(Math.random() * mutableAvailable.length);
    const [chosenIndex] = mutableAvailable.splice(randomIndex, 1);
    newlyRevealed.push(chosenIndex);
  }

  const nextRevealedIndices = [...currentRevealed, ...newlyRevealed];
  const nextRevealedSet = new Set(nextRevealedIndices);

  // 5. Construct the final underscore string
  const newHintString = correctAnswer
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      return nextRevealedSet.has(i) ? char : "_";
    })
    .join("");

  return {
    hintString: newHintString,
    revealedHintIndices: nextRevealedIndices,
    isFullyRevealed: nextRevealedIndices.length === totalLetters,
  };
}

/**
 * Study sessions
 */
export function calculateStudySessionAccuracy(
  correctAnswersCount: number,
  questionsAnsweredCount: number,
) {
  return Math.round((correctAnswersCount / questionsAnsweredCount) * 100) || 0;
}

/**
 * Study sets
 */
type GetNextWordsIdsUtilProps = {
  wordIds: string[];
  isCorrect: boolean;
  rememberedIds: string[];
  missedIds: string[];
  masteredIds?: string[];
};

export function getNextWordsIds({
  wordIds,
  isCorrect,
  rememberedIds,
  missedIds,
  masteredIds,
}: GetNextWordsIdsUtilProps) {
  const idsSet = new Set(wordIds);

  if (isCorrect) {
    return {
      nextRememberedIds: [...new Set([...rememberedIds, ...wordIds])],
      nextMissedIds: missedIds.filter((id) => !idsSet.has(id)),
      nextMasteredIds: masteredIds ? [...masteredIds] : undefined,
    };
  } else {
    return {
      nextRememberedIds: rememberedIds.filter((id) => !idsSet.has(id)),
      nextMissedIds: [...new Set([...missedIds, ...wordIds])],
      nextMasteredIds: masteredIds?.filter((id) => !idsSet.has(id)),
    };
  }
}
