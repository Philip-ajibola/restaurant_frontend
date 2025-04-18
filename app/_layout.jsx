import {Stack, useRouter} from 'expo-router';
import {TouchableOpacity, View,Text} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



export default function RootLayout ()  {
    const router = useRouter();
    return(
        <Stack>
            <Stack.Screen name={"index"} options={{headerShown: false}} />
            <Stack.Screen name={"landingPage/landingPage"} options={{ headerShown: false }} />
            <Stack.Screen name={"login/login"} options={{ headerShown: false }} />
            <Stack.Screen name={"register/register"} options={{ headerShown: false }} />
            <Stack.Screen name={"restaurantDetails/restaurantDetails"}
                          options={{
                              headerTitle: "Restaurant Details",
                              headerStyle: { backgroundColor: "#F97316" },
                              headerTintColor: "#fff",
                              headerLeft: () => (
                                  <TouchableOpacity onPress={() => router.back()}>
                                      <View className="flex-row items-center">
                                          <MaterialIcons name="arrow-back" size={24} color="#fff" />
                                          <Text className="text-xl text-white ml-2">Back</Text>
                                      </View>
                                  </TouchableOpacity>
                              ),
                          }} />
            <Stack.Screen name={"(home)"} options={{ headerShown: false }} />
        </Stack>
    )
}