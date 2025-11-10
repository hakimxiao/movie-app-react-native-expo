import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Resource (kamus bahasa)
const resources = {
    en: {
        translation: {
            "Overview": "Overview",
            "Release Date": "Release Date",
            "Runtime": "Runtime",
            "Votes": "Votes"
        }
    },
    id: {
        translation: {
            "Overview": "Ringkasan",
            "Release Date": "Tanggal Rilis",
            "Runtime": "Durasi",
            "Votes": "Jumlah Suara"
        }
    }
};

// Inisialisasi i18next
i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v4',
        resources,
        lng: 'id',              // 👉 bahasa utama: Indonesia
        fallbackLng: 'en',      // jika tidak ada terjemahan, pakai Inggris
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
