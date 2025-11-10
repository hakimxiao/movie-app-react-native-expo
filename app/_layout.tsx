import {Stack} from "expo-router";
import "./globals.css"
import {StatusBar} from "react-native";
import "@/i18n/i18n";

export default function RootLayout() {
    return (
        <>
            <StatusBar hidden={true}/>

            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="movies/[id]"
                    options={{headerShown: false}}
                />
            </Stack>
        </>
    )
}
