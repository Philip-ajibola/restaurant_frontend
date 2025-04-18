import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';  // For checking logged in status

export default function RootLayout() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkLoginStatus = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                setIsLoggedIn(true);  // Set to true if user exists
            }
        };

        checkLoginStatus();
    }, []);

    return (
        <Stack>
            <Stack.Screen name={"index"} options={{ headerShown: false }} />
            <Stack.Screen name={"landingPage/landingPage"} options={{ headerShown: false }} />
            <Stack.Screen name={"login/login"} options={{ headerShown: false }} />
            <Stack.Screen name={"register/register"} options={{ headerShown: false }} />
            <Stack.Screen
                name={"restaurantDetails/restaurantDetails"}
                options={{
                    headerTitle: "Restaurant Details",
                    headerStyle: { backgroundColor: "#F97316" },
                    headerTintColor: "#2D3748",
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <View className="flex-row items-center">
                                <MaterialIcons name="arrow-back" size={24} color="#2D3748" />
                                <Text className="text-xl text-[#2D3748] ml-2">Back</Text>
                            </View>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name={"(home)"}
                options={{
                    headerShown: false,
                    gestureEnabled: !isLoggedIn,
                }}
            />
        </Stack>
    );
}
