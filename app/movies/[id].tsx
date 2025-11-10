import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import {router, useLocalSearchParams} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovieDetails} from "@/services/api";
import {icons} from "@/constants/icons";
import {useTranslation} from "react-i18next";
import {autoTranslate} from "@/utils/autoTranslate";
import {MaterialIcons} from '@expo/vector-icons';




interface MovieInfoOverviewProps {
    label: string;
    value?: string | number | null;
}
const MovieInfoOverview = ({label, value}: MovieInfoOverviewProps) => {
    const { t } = useTranslation();

    const [displayedValue, setDisplayedValue] = useState<string | number | null>(value ?? null);
    const [originalValue, setOriginalValue] = useState<string | number | null>(value ?? null);
    const [isTranslated, setIsTranslated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // ✅ Tambahan kecil untuk sinkronisasi value prop saat data API masuk
    useEffect(() => {
        if (value && value !== originalValue) {
            setDisplayedValue(value);
            setOriginalValue(value);
        }
    }, [value]);

    const handleTranslate = async () => {
        if (!originalValue || typeof originalValue !== "string") return;

        // toggle kembali ke bahasa Inggris
        if (isTranslated) {
            setDisplayedValue(originalValue);
            setIsTranslated(false);
            return;
        }

        // translate ke Bahasa Indonesia
        setIsLoading(true);
        try {
            const result = await autoTranslate(originalValue, "id");
            setDisplayedValue(result);
            setIsTranslated(true);
        } catch (error) {
            console.error("Translate error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="flex-col items-start justify-center mt-5 w-full">
            <View className="flex-row items-center justify-between w-full">
                <Text className="text-light-200 font-normal text-sm">{t(label)}</Text>

                {label.toLowerCase() === "overview" && (
                    <TouchableOpacity
                        onPress={handleTranslate}
                        disabled={isLoading}
                        className={`px-2 py-1 rounded-md flex-row items-center ${
                            isTranslated ? "bg-blue-600" : "bg-dark-200"
                        }`}
                    >
                        <MaterialIcons
                            name="g-translate"
                            size={14}
                            color={isTranslated ? "#fff" : "#ccc"}
                        />
                        <Text
                            className={`text-xs font-semibold ml-1 ${
                                isTranslated ? "text-white" : "text-light-200"
                            }`}
                        >
                            ID
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <Text className="text-light-100 font-bold text-sm mt-2 leading-5">
                {isLoading ? "Menerjemahkan..." : displayedValue || ""}
            </Text>
        </View>
    );
};


interface MovieInfoProps {
    label: string;
    value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal text-sm">{label}</Text>
        <Text className="text-light-100 font-bold text-sm mt-2">
            {value || "N/A"}
        </Text>
    </View>
);




const MovieDetails = () => {
    const { id } = useLocalSearchParams();

    const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string));

    return (
        <View className="bg-primary flex-1">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 80 }}
            >
                <View>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }} className="w-full h-[550px]" resizeMode="stretch"/>
                </View>
                <View className="flex-col items-start justify-center mt-5 px-5">
                    <Text className="text-white font-bold text-xl">{movie?.title}</Text>
                    <View className="flex-row items-center gap-x-1 mt-2">
                        <Text className="text-light-200 text-sm">{movie?.release_date?.split("_")[0]}</Text>
                        <Text className="text-light-200 text-sm">{movie?.runtime}M</Text>
                    </View>

                    <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                        <Image source={icons.star} className="size-4" />
                        <Text className="text-white font-bold text-sm">{Math.round(movie?.vote_average ?? 0)}/10</Text>
                        <Text className="text-light-200 text-sm">({movie?.vote_count} votes)</Text>
                    </View>

                    <MovieInfoOverview label="Overview" value={movie?.overview} />
                    <MovieInfo label="Genres" value={movie?.genres.map((g) => g.name).join(" • ") || 'N/A'} />

                    <View className="flex flex-row justify-between w-1/2">
                        <MovieInfo label="Anggaran" value={`$${(movie?.budget ?? 0) / 1_000_000} million`} />
                        <MovieInfo label="Pendapatan" value={`$${Math.round(movie?.revenue ?? 0) / 1_000_000} million`} />
                    </View>

                    <MovieInfo label="Production Companies" value={movie?.production_companies.map((c) => c.name).join(" • ") || "N/A"}  />
                </View>
            </ScrollView>

            <TouchableOpacity
                onPress={router.back}
                className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50">
                <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="#fff" />
                <Text className="text-white font-semibold text-base">Go back</Text>
            </TouchableOpacity>
        </View>
    )
}
export default MovieDetails
