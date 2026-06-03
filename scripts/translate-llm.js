/* eslint-disable import/no-named-as-default-member */
import fs from "fs";
import gettextParser from "gettext-parser";
import path from "path";

/**
 * Config
 */
const OPENROUTER_EXPO_LINGUI_API_KEY =
  process.env.OPENROUTER_EXPO_LINGUI_API_KEY;
const MODEL_NAME = "openrouter/owl-alpha";
const SOURCE_LOCALE = "en";
const LOCALES_DIR = path.join(process.cwd(), "src", "locales");
const LOG_FILE = path.join(
  process.cwd(),
  "scripts",
  "translate-llm-output.txt",
);
const OVERWRITE_EXISTING = true;
const BATCH_SIZE = 100;

function log(message) {
  console.log(message);
  fs.appendFileSync(LOG_FILE, message + "\n");
}

// Quick sleep function to respect OpenRouter's rate limits
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// prettier-ignore
const SUPPORTED_LANGUAGES_LABELS = [
  { labelRaw: "Polish", emoji: "🇵🇱", locale: "pl", fullLocale: "pl-PL", },
  { labelRaw: "Afrikaans", emoji: "🇿🇦", locale: "af", fullLocale: "af-ZA" },
  { labelRaw: "Arabic", emoji: "🇸🇦", locale: "ar", fullLocale: "ar-SA" },
  { labelRaw: "Azerbaijani", emoji: "🇦🇿", locale: "az", fullLocale: "az-AZ" },
  { labelRaw: "Belarusian", emoji: "🇧🇾", locale: "be", fullLocale: "be-BY" },
  { labelRaw: "Bulgarian", emoji: "🇧🇬", locale: "bg", fullLocale: "bg-BG" },
  { labelRaw: "Bengali", emoji: "🇧🇩", locale: "bn", fullLocale: "bn-BD" },
  { labelRaw: "Bosnian", emoji: "🇧🇦", locale: "bs", fullLocale: "bs-BA" },
  { labelRaw: "Catalan", emoji: "🇪🇸", locale: "ca", fullLocale: "ca-ES" },
  { labelRaw: "Czech", emoji: "🇨🇿", locale: "cs", fullLocale: "cs-CZ" },
  { labelRaw: "Welsh", emoji: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", locale: "cy", fullLocale: "cy-GB" },
  { labelRaw: "Danish", emoji: "🇩🇰", locale: "da", fullLocale: "da-DK" },
  { labelRaw: "German", emoji: "🇩🇪", locale: "de", fullLocale: "de-DE" },
  { labelRaw: "Greek", emoji: "🇬🇷", locale: "el", fullLocale: "el-GR" },
  { labelRaw: "English", emoji: "🇬🇧", locale: "en", fullLocale: "en-GB" },
  { labelRaw: "Spanish", emoji: "🇪🇸", locale: "es", fullLocale: "es-ES" },
  { labelRaw: "Estonian", emoji: "🇪🇪", locale: "et", fullLocale: "et-EE" },
  { labelRaw: "Basque", emoji: "⚑", locale: "eu", fullLocale: "eu-ES" },
  { labelRaw: "Persian", emoji: "🇮🇷", locale: "fa", fullLocale: "fa-IR" },
  { labelRaw: "Finnish", emoji: "🇫🇮", locale: "fi", fullLocale: "fi-FI" },
  { labelRaw: "French", emoji: "🇫🇷", locale: "fr", fullLocale: "fr-FR" },
  { labelRaw: "Irish", emoji: "🇮🇪", locale: "ga", fullLocale: "ga-IE" },
  { labelRaw: "Galician", emoji: "🇪🇸", locale: "gl", fullLocale: "gl-ES" },
  { labelRaw: "Gujarati", emoji: "🇮🇳", locale: "gu", fullLocale: "gu-IN" },
  { labelRaw: "Hebrew", emoji: "🇮🇱", locale: "he", fullLocale: "he-IL" },
  { labelRaw: "Hindi", emoji: "🇮🇳", locale: "hi", fullLocale: "hi-IN" },
  { labelRaw: "Croatian", emoji: "🇭🇷", locale: "hr", fullLocale: "hr-HR" },
  { labelRaw: "Hungarian", emoji: "🇭🇺", locale: "hu", fullLocale: "hu-HU" },
  { labelRaw: "Armenian", emoji: "🇦🇲", locale: "hy", fullLocale: "hy-AM" },
  { labelRaw: "Indonesian", emoji: "🇮🇩", locale: "id", fullLocale: "id-ID" },
  { labelRaw: "Icelandic", emoji: "🇮🇸", locale: "is", fullLocale: "is-IS" },
  { labelRaw: "Italian", emoji: "🇮🇹", locale: "it", fullLocale: "it-IT" },
  { labelRaw: "Japanese", emoji: "🇯🇵", locale: "ja", fullLocale: "ja-JP" },
  { labelRaw: "Georgian", emoji: "🇬🇪", locale: "ka", fullLocale: "ka-GE" },
  { labelRaw: "Kazakh", emoji: "🇰🇿", locale: "kk", fullLocale: "kk-KZ" },
  { labelRaw: "Khmer", emoji: "🇰🇭", locale: "km", fullLocale: "km-KH" },
  { labelRaw: "Kannada", emoji: "🇮🇳", locale: "kn", fullLocale: "kn-IN" },
  { labelRaw: "Korean", emoji: "🇰🇷", locale: "ko", fullLocale: "ko-KR" },
  { labelRaw: "Lithuanian", emoji: "🇱🇹", locale: "lt", fullLocale: "lt-LT" },
  { labelRaw: "Latvian", emoji: "🇱🇻", locale: "lv", fullLocale: "lv-LV" },
  { labelRaw: "Macedonian", emoji: "🇲🇰", locale: "mk", fullLocale: "mk-MK" },
  { labelRaw: "Malayalam", emoji: "🇮🇳", locale: "ml", fullLocale: "ml-IN" },
  { labelRaw: "Mongolian", emoji: "🇲🇳", locale: "mn", fullLocale: "mn-MN" },
  { labelRaw: "Marathi", emoji: "🇮🇳", locale: "mr", fullLocale: "mr-IN" },
  { labelRaw: "Malay", emoji: "🇲🇾", locale: "ms", fullLocale: "ms-MY" },
  { labelRaw: "Maltese", emoji: "🇲🇹", locale: "mt", fullLocale: "mt-MT" },
  { labelRaw: "Burmese", emoji: "🇲🇲", locale: "my", fullLocale: "my-MM" },
  { labelRaw: "Norwegian", emoji: "🇳🇴", locale: "no", fullLocale: "nb-NO" },
  { labelRaw: "Nepali", emoji: "🇳🇵", locale: "ne", fullLocale: "ne-NP" },
  { labelRaw: "Dutch", emoji: "🇳🇱", locale: "nl", fullLocale: "nl-NL" },
  { labelRaw: "Punjabi", emoji: "🇮🇳", locale: "pa", fullLocale: "pa-IN" },
  { labelRaw: "Portuguese", emoji: "🇵🇹", locale: "pt", fullLocale: "pt-BR" },
  { labelRaw: "Romanian", emoji: "🇷🇴", locale: "ro", fullLocale: "ro-RO" },
  { labelRaw: "Russian", emoji: "🇷🇺", locale: "ru", fullLocale: "ru-RU" },
  { labelRaw: "Slovak", emoji: "🇸🇰", locale: "sk", fullLocale: "sk-SK" },
  { labelRaw: "Slovenian", emoji: "🇸🇮", locale: "sl", fullLocale: "sl-SI" },
  { labelRaw: "Albanian", emoji: "🇦🇱", locale: "sq", fullLocale: "sq-AL" },
  { labelRaw: "Serbian", emoji: "🇷🇸", locale: "sr", fullLocale: "sr-RS" },
  { labelRaw: "Swedish", emoji: "🇸🇪", locale: "sv", fullLocale: "sv-SE" },
  { labelRaw: "Swahili", emoji: "🇰🇪", locale: "sw", fullLocale: "sw-KE" },
  { labelRaw: "Tamil", emoji: "🇮🇳", locale: "ta", fullLocale: "ta-IN" },
  { labelRaw: "Telugu", emoji: "🇮🇳", locale: "te", fullLocale: "te-IN" },
  { labelRaw: "Thai", emoji: "🇹🇭", locale: "th", fullLocale: "th-TH" },
  { labelRaw: "Turkish", emoji: "🇹🇷", locale: "tr", fullLocale: "tr-TR" },
  { labelRaw: "Ukrainian", emoji: "🇺🇦", locale: "uk", fullLocale: "uk-UA" },
  { labelRaw: "Urdu", emoji: "🇵🇰", locale: "ur", fullLocale: "ur-PK" },
  { labelRaw: "Uzbek", emoji: "🇺🇿", locale: "uz", fullLocale: "uz-UZ" },
  { labelRaw: "Vietnamese", emoji: "🇻🇳", locale: "vi", fullLocale: "vi-VN" },
  { labelRaw: "Chinese", emoji: "🇨🇳", locale: "zh", fullLocale: "zh-CN" },
  { labelRaw: "Zulu", emoji: "🇿🇦", locale: "zu", fullLocale: "zu-ZA" },
];

const getSystemPrompt = (
  localeInfo,
) => `You are a Literal String Localization Tool. Your job is to translate the UI microcopy of a software application from the source language to the target language. It should sound natural to users from all around the world and most importantly, match the length of the original words as much as possible.

### INPUT HANDLING:
- You will receive data in one of two formats: a simple string OR a JSON object: { "message": "string", "context": "metadata (msgctxt, comments)" }.
- If an object is provided with a "context" field, USE IT as a guiding hint to disambiguate the "message" translation (e.g., distinguishing between "Sunday" as a day vs. "Sunday" as a label).
- Ignore the "context" field in your output.

### TRANSLATION MANDATE:
- You are an expert translator. Echoing the English source text in your output is a CRITICAL FAILURE. 
- You MUST translate every word unless it is a protected brand name, proper noun, or technical variable.
- If you find yourself tempted to return the original English text for common nouns (like "Account", "Settings", "Add"), YOU MUST FIND THE TRANSLATION. 
- The only time you return original text is if the term is a PROTECTED PROPER NOUN (e.g., "Linkoglot").

### YOUR ONLY JOB:
- Output ONLY the translated text. 
- DO NOT say "Okay", "I understand", "Sure", or any conversational filler.
- If you output anything other than the exact translation, the system will fail.
- IF you receive a word like "Example" or "Language", translate it as a literal noun in the target language. Do not explain anything.
- If you receive a word like "Estonian", do not translate anything to Estonian, but rather translate the literal word "Estonian" to the target language (which is ${localeInfo.labelRaw}).

### STRICT LINGUISTIC CONSTRAINT:
- TARGET LANGUAGE: ${localeInfo.labelRaw} (${localeInfo.fullLocale}).
- ALWAYS use the native script and orthography of the target language.
- DO NOT translate proper nouns and brand names (e.g., "Linkoglot", "Quizlet", "Anki", "Google", "Apple"). Keep them exactly as they are.
- DO NOT translate technical acronyms (e.g., "CSV", "PDF", "API", "URL"). Keep them as is.
- You can translate a person's name to a local version of that name. For example, "Matthew" is an English name but in the Polish language it could result to "Mateusz".
- You MUST output ONLY in the target language.
- If the input text contains the name of a language, translate it into the standard, grammatically correct form used in the target language.
- You are strictly forbidden from outputting text in any language other than the target language. 
- ABBREVIATION PATTERN: Keep abbreviations short. If the source uses "min" or "mins", the target MUST use "min". NEVER expand to "minute" or "minute(s)".
- NEVER return an empty string. If you cannot translate a string, return the original English source text.

### CORE PRECISION RULES:
1. **Structural Mirroring:** Maintain all whitespaces, trailing/leading spaces, emojis, and special characters exactly as they appear in the source.
2. **Variable Integrity:** Never translate, modify, or corrupt placeholders (e.g., {CONTACT_EMAIL}, {value}, <0>). Keep them exactly as they are.
3. **Casing:** Mirror the exact casing style (Title Case, Sentence Case, ALL CAPS) of the source string.
4. **Length Matching:** Ensure the translated string has a similar character count and visual length as the source text.
5. **Tone & Voice:** Match the brand voice (empathetic, cheerful, supportive). Adapt the tone to fit the context.
6. **Natural Phrasing:** Prioritize idiomatic, natural-sounding language. Make sure the translation is not too literal. You can use alternative phrasings that picture the same meaning but sound better to the ${localeInfo.labelRaw} speaking user.

### STYLE & TONE GUIDELINES:
- BE CONCISE: UI space is limited. Use the shortest, most natural term possible. Avoid adding filler words like "Tryb" (Mode), "Opcja" (Option), or "Funkcja" (Function) unless they are absolutely necessary for meaning.
- BE IDIOMATIC: Use terms that actual users would use in an app, not formal dictionary definitions.
- MAINTAIN INTENT: If the source is short and punchy (e.g., "Freeplay"), the translation must be short and punchy (e.g., "Swobodna gra").

### CRITICAL OUTPUT RULE:
- RETURN ONLY THE TRANSLATED STRING. 
- NO QUOTES. NO MARKDOWN. NO INTRODUCTIONS.
`;

function matchWhitespace(sourceStr, targetStr) {
  // Defensive check: if target is not a string, return source string to prevent crash
  if (typeof targetStr !== "string") {
    return sourceStr;
  }
  const leading = (sourceStr.match(/^(\s+)/) || [""])[0];
  const trailing = (sourceStr.match(/(\s+)$/) || [""])[0];
  return `${leading}${targetStr.trim()}${trailing}`;
}

function enforceIntegrity(source, target) {
  // Defensive check: if target is not a string, return source to prevent crash
  if (typeof target !== "string") {
    return source;
  }
  const regex = /(\{[^}]+\}|<\s?[0-9A-Za-z\s]+>|< ?[0-9]+s)/g;
  const sourceMatches = source.match(regex) || [];
  for (const match of sourceMatches) {
    if (!target.includes(match)) {
      log(`   ❌ enforceIntegrity: ${target} | ${match}`);
      return source;
    }
  }
  return target;
}

async function run() {
  if (!OPENROUTER_EXPO_LINGUI_API_KEY)
    return console.error("❌ OPENROUTER_EXPO_LINGUI_API_KEY missing.");
  if (fs.existsSync(LOG_FILE)) fs.unlinkSync(LOG_FILE);

  const sourcePoPath = path.join(LOCALES_DIR, SOURCE_LOCALE, "messages.po");
  const sourcePo = gettextParser.po.parse(fs.readFileSync(sourcePoPath));
  // Replace your old 'const entries = ...' logic with this:
  const entries = [];
  for (const context in sourcePo.translations) {
    for (const msgid in sourcePo.translations[context]) {
      if (msgid === "") continue; // Skip the metadata entry
      entries.push({ context, msgid }); // Store both to maintain the link
    }
  }

  for (const langConfig of SUPPORTED_LANGUAGES_LABELS) {
    if (langConfig.locale === SOURCE_LOCALE) continue;

    const poPath = path.join(LOCALES_DIR, langConfig.locale, "messages.po");
    let po = fs.existsSync(poPath)
      ? gettextParser.po.parse(fs.readFileSync(poPath))
      : JSON.parse(JSON.stringify(sourcePo));

    const shouldOverwrite = langConfig.hasOwnProperty("overwriteExisting")
      ? langConfig.overwriteExisting
      : OVERWRITE_EXISTING;

    const queue = entries.filter(({ context, msgid }) => {
      if (!po.translations[context]) po.translations[context] = {};
      if (!po.translations[context][msgid]) {
        po.translations[context][msgid] = JSON.parse(
          JSON.stringify(sourcePo.translations[context][msgid]),
        );
        po.translations[context][msgid].msgstr = [""];
      }

      return shouldOverwrite || !po.translations[context][msgid].msgstr[0];
    });

    if (queue.length === 0) {
      log(
        `\n📂 [Session: ${langConfig.labelRaw}] - Already fully translated. Skipping.`,
      );
      continue;
    }

    log(
      `\n📂 [Session: ${langConfig.labelRaw}] - Translating ${queue.length} strings...`,
    );
    log(`    ...Sending requests to OpenRouter...`);

    let changesMade = false;

    for (let i = 0; i < queue.length; i += BATCH_SIZE) {
      const batchKeys = queue.slice(i, i + BATCH_SIZE);
      // Inside your loop iterating through batches:
      const batchPayload = {};
      batchKeys.forEach(({ context, msgid }) => {
        const entry = sourcePo.translations[context][msgid];

        // Combine msgctxt (the context key) and comments
        const comments =
          entry.comments?.extracted || entry.comments?.translator || "";
        const fullContext = [context !== "" ? context : null, comments]
          .filter(Boolean)
          .join(" | ");

        // FORCE the object structure here:
        if (fullContext) {
          batchPayload[msgid] = { message: msgid, context: fullContext };
        } else {
          batchPayload[msgid] = msgid; // Fallback to raw string if absolutely no context
        }
      });

      try {
        const res = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${OPENROUTER_EXPO_LINGUI_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: MODEL_NAME,
              temperature: 0.1,
              response_format: { type: "json_object" },
              messages: [
                { role: "system", content: getSystemPrompt(langConfig) },
                { role: "user", content: JSON.stringify(batchPayload) },
              ],
            }),
          },
        );

        const data = await res.json();
        const translatedDict = JSON.parse(
          data.choices[0].message.content
            .replace(/^```json/i, "")
            .replace(/```$/, "")
            .trim(),
        );

        // Map translations back to the original keys
        batchKeys.forEach(({ context, msgid }) => {
          // 1. Get the payload entry for this specific msgid
          const payloadEntry = batchPayload[msgid];

          // 2. Extract the clean source string
          const sourceText =
            typeof payloadEntry === "object"
              ? payloadEntry.message
              : payloadEntry;

          const rawTranslation = translatedDict[msgid] || sourceText;

          // 3. Process integrity and whitespace
          let translated = enforceIntegrity(sourceText, rawTranslation);
          translated = matchWhitespace(sourceText, translated);

          // 4. Correctly write back to the specific context path
          po.translations[context][msgid].msgstr = [translated];

          log(`    └─ "${msgid}"\n      ✅ Result: "${translated}"`);

          const ratio = translated.length / (sourceText.length || 1);
          if (ratio < 0.25 || ratio > 1.75) {
            log(
              `      ⚠️ WARNING: Extreme length deviation (Ratio: ${ratio.toFixed(2)}).`,
            );
          }
        });

        changesMade = true;
        log(`    🟩 Finished chunk ${Math.ceil((i + 1) / BATCH_SIZE)}`);
        await sleep(800);

        if (changesMade) {
          fs.writeFileSync(poPath, gettextParser.po.compile(po));
          log(`    💾 Saved updates to ${poPath}`);
        }
      } catch (e) {
        log(`    ❌ Error: ${e.message}`);
        if (e.message.includes("429")) {
          await sleep(10000);
          i -= BATCH_SIZE;
        }
      }
    }
  }
  log("\n🎉 Pipeline complete.");
}

run();
