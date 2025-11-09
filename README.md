# MOVIE APP 
https://jsmastery.com/video-kit/e3732532-7d7f-4637-87d6-bb9a11c53596

### Gunakan Emulator Android Studio : 
    1. Lihat daftar AVD	      emulator -list-avds
    2. Jalankan emulator          emulator -avd Pixel_9_Pro_XL

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

- dev package :
  - npm install --save @react-native-masked-view/masked-view

### Koponen Penting :
- FlatList : untuk menampilkan banyak data
  -   Sederhana nya flatlist seperti Map selain untuk menampilkan data banyak props luar biasa di flatlist salah satunya :
    - ListHeaderComponent : untuk menampilkan komponen diatas list. Ini cocok untuk pencarian danlain lainya yang sifatnya terkait dengan list.
    - ListEmptyComponent : untuk menampilkan komponen ketika list kosong
    - ListFooterComponent : untuk menampilkan komponen di bawah list. Ini cocok untuk halaman loading dan lainnya.
    - numColumns : untuk menampilkan banyak kolom
    - columnWrapperStyle : untuk menampilkan style untuk kolom
    - contentContainerStyle : untuk menampilkan style untuk content
    - keyExtractor : untuk menampilkan key untuk item
    - renderItem : untuk menampilkan item
    - onRefresh : untuk menampilkan tombol refresh
    - refreshing : untuk menampilkan tombol refresh
    - onEndReached : untuk menampilkan tombol load more
- Image : untuk menampilkan gambar
- Text : untuk menampilkan teks
- View : untuk menampilkan komponen
- ScrollView : untuk menampilkan komponen
- ActivityIndicator : untuk menampilkan loading
- Button : untuk menampilkan tombol
- TouchableOpacity : untuk menampilkan tombol
- TouchableHighlight : untuk menampilkan tombol
- TouchableWithoutFeedback : untuk menampilkan tombol

### APPWRITE PACKAGE
- npx expo install react-native-appwrite react-native-url-polyfill