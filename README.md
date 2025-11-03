# MOVIE APP 
https://jsmastery.com/video-kit/e3732532-7d7f-4637-87d6-bb9a11c53596

### Gunakan Emulator Android Studio : 
    1. Lihat daftar AVD	      emulator -list-avds
    2. Jalankan emulator          emulator -avd <nama_emulator>

### Package :
##### Yang digunakan untuk mempermudah styling :
- npm i nativewind tailwindcss react-native-reanimated react-native-safe-area-context
  - step instalasi : 
    - download package : npm i nativewind tailwindcss react-native-reanimated react-native-safe-area-context
    - jalankan : npx tailwindcss init
    - silahkan lanjutkan disini : https://www.nativewind.dev/docs/getting-started/installation
    - khusus untuk bagian 4 yaitu : create or modify your metro.config. : kita melakukkan nya di terminal. -- npx expo customize metro.config.js || diakan membuat file dan silahkan di override isinya dari native wind
    - seteleah semua selesai anda tinggal restart terminal, dan untuk metro config file globals.css nya harus sesaui path nya
    - sekarang menjalankan nya cukup dengan ini :  npx expo start --clear