// utils/autoTranslate.ts

import {translate} from "@vitalets/google-translate-api";

export async function autoTranslate(text: string, targetLang: string): Promise<string> {
    try {
        const res = await translate(text, { to: targetLang });
        return res.text;
    } catch (error) {
        console.error("Translation error:", error);
        return text; // fallback: tampilkan teks asli
    }
}
