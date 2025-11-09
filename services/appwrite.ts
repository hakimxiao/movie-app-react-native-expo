// Lacak pencarian yang dilakukan oleh pengguna

import { Client, Databases, ID, Query } from "react-native-appwrite";

// Ambil konfigurasi dari file .env (environment variables)
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!; // ID database di Appwrite
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!; // ID koleksi (tabel) di dalam database
const APPWRITE_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT; // URL endpoint server Appwrite

// Buat koneksi ke Appwrite server
const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT!) // Atur alamat endpoint Appwrite
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Atur ID proyek Appwrite yang digunakan

// Buat instance database agar bisa membuat, membaca, dan mengubah data
const database = new Databases(client);

// Fungsi untuk memperbarui jumlah pencarian berdasarkan kata kunci (query)
export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        // Cari apakah kata pencarian (searchTerm) sudah pernah disimpan di database
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("searchTerm", query), // Filter: cari dokumen dengan searchTerm yang sama
        ]);

        // Jika dokumen ditemukan (berarti pencarian ini sudah pernah dilakukan)
        if (result.documents.length > 0) {
            const existingMovie = result.documents[0]; // Ambil dokumen pertama yang ditemukan

            // Perbarui jumlah pencarian (count) dengan menambah 1
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id, // ID dokumen yang akan diperbarui
                {
                    count: existingMovie.count + 1, // Tambah nilai count sebelumnya
                }
            );
        } else {
            // Jika belum ada dokumen untuk kata kunci ini, buat dokumen baru
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(), // Buat ID unik otomatis untuk dokumen baru
                {
                    searchTerm: query, // Simpan kata kunci pencarian
                    movie_id: movie.id, // Simpan ID film dari TMDB
                    title: movie.title, // Simpan judul film
                    count: 1, // Karena ini pencarian pertama, mulai dari 1
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // Simpan URL poster film
                }
            );
        }
    } catch (err) {
        // Jika terjadi error (misalnya koneksi gagal atau ID salah)
        console.log(err); // Tampilkan error di console
        throw err; // Lempar error agar bisa ditangani di tempat lain
    }

    // Logika singkat:
    // 1. Cek apakah kata pencarian sudah ada di database.
    // 2. Jika sudah, tambahkan jumlah pencarian (count).
    // 3. Jika belum, buat dokumen baru dengan count = 1.
};

export const getTrendingMovies = async(): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
        ]);

        return result.documents as unknown as TrendingMovie[];
    } catch (err) {
        console.log(err);
        return undefined;
    }
}