import {Tabs, useRouter} from "expo-router";
import {View, Image, TouchableOpacity} from "react-native";
import home from "../../assets/icons/home.png";
import profile from "../../assets/icons/profile.png";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const TabIcon = ({source,focused} ) =>(
    <View className={`flex flex-row items-center justify-center rounded-xl ${focused ? 'bg-[#2D3748]' : ""}`}>
        <View className={`rounded-xl w-12 h-12 items-center justify-center ${focused ? 'bg-[#2D3748]' : ""}` }>
            <Image
                source={source}
                tintColor='white'
                resizeMode="contain"
                className='w-7 h-7'
            />
        </View>
    </View>
)

const handleLogout = () => {
    const  route = useRouter()
    route.push('/login/login')
    return undefined;
}

const Layout = () =>(
    <Tabs initialRouteName='homePage'
          screenOptions={{
              tabBarActiveTintColor: 'white',
              tabBarInactiveTintColor: "white",
              tabBarShowLabel: false,
              tabBarStyle: {
                  backgroundColor: '#F97316',
                  paddingBottom:40,
                  overflow:'hidden',
                  height:78,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems:'center',
                  flexDirection: 'row',
                  position: 'absolute',

              },
          }}
    >
        <Tabs.Screen
            name='homePage'
            options={{
                title: "Home",
                headerShown: true,
                headerTitleStyle: {
                    color: '#2D3748',
                    fontWeight: 'bold',
                    fontSize: 20,
                },
                headerStyle: {
                    backgroundColor: '#F97316',
                },
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => handleLogout()}
                        className="mr-4"
                    >
                        <MaterialIcons name="logout" size={24} color="#fff" />
                    </TouchableOpacity>
                ),
                tabBarIcon:({focused}) => <TabIcon focused={focused} source={home}/>
            }}
        ></Tabs.Screen>

        <Tabs.Screen
            name='profile'
            options={{
                title: "Profile",
                headerShown: true,
                headerTitleStyle: {
                    color: '#2D3748',
                    fontWeight: 'bold',
                    fontSize: 20,
                },
                headerStyle: {
                    backgroundColor: '#F97316',
                },
                tabBarIcon:({focused}) => <TabIcon focused={focused} source={profile}/>
            }}
        ></Tabs.Screen>
    </Tabs>
)

export default Layout