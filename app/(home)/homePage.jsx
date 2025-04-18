import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    Image,
    View,
    TouchableOpacity,
    Text,
    SafeAreaView,
    ActivityIndicator,
    Modal,
} from 'react-native';
import RestaurantCard from '../../components/restaurantCard/restaurantCard';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import * as Location from 'expo-location';

export default function HomePage() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState([]);
    const restaurant2 = require('../../assets/images/restaurant2.jpeg');

    // Fetch all restaurants on component mount
    const fetchRestaurants = async () => {
        try {
            const response = await axios.get('http://172.20.10.2:5000/api/restaurants/');
            setRestaurants(response.data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            alert('Failed to fetch restaurants. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            alert('Please enter a cuisine type.');
            return;
        }
        console.log(searchQuery)
        try {
            setLoading(true);
            const response = await axios.get('http://172.20.10.2:5000/api/restaurants/filter', {
                params:{
                    cuisine: searchQuery
                }
            });

            setModalData(response.data);
            setModalVisible(true);
            setSearchQuery('');
        } catch (error) {
            console.error('Error filtering restaurants:', error);
            alert('Failed to filter restaurants. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getNearbyRestaurants = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
        }

        try {
            setLoading(true);
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            const response = await axios.get('http://172.20.10.2:5000/api/restaurants/nearby', {
                params: { lat: latitude, lng: longitude },
            });

            setModalData(response.data);
            setModalVisible(true);
        } catch (error) {
            console.error('Error fetching nearby restaurants:', error);
            alert('Failed to fetch nearby restaurants. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#252836]">
            {/* Modal for Displaying Results */}
            <Modal  visible={modalVisible} animationType="slide" transparent>
                <View className="flex-1 justify-center items-center bg-black/70">
                    <View className="w-full max-w-md bg-[#2D3748] rounded-lg p-6">
                        <Text className="text-xl font-bold text-gray-800 mb-4">Results</Text>

                        {/* List of Restaurants in Modal */}
                        {modalData.length > 0 ? (
                            modalData.map((restaurant) => (
                                <RestaurantCard key={restaurant.id} restaurant={restaurant}
                                                onViewDetails={() => {
                                                    setModalVisible(false);
                                                    setModalData([]);
                                                }}/>
                            ))
                        ) : (
                            <Text className="text-gray-400 text-center">No restaurants found.</Text>
                        )}

                        {/* Cancel Button */}
                        <TouchableOpacity
                            className="bg-orange-500 py-3 rounded-lg mt-4"
                            onPress={() => {
                                setModalVisible(false);
                                setModalData([]);
                            }}
                        >
                            <Text className="text-white text-center font-bold">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View className="relative">
                    <Image source={restaurant2} className="w-full h-64" resizeMode="cover" />
                    <View className="absolute top-0 left-0 w-full h-full bg-black/50 justify-center items-center p-6">
                        <Text className="text-white text-center text-xl font-bold mb-4">
                            Welcome to Nearby Restaurants App!
                        </Text>
                        <Text className="text-white text-center text-base mb-8">
                            Discover delicious restaurants near you with our app. Search by location, cuisine type, or price range to find the perfect dining experience.
                        </Text>

                        <View className="w-full flex-row items-center space-x-2 mb-4">
                            <View className="flex-1">
                                <TextInput
                                    mode="outlined"
                                    label="Search Restaurants"
                                    placeholder="Enter cuisine type"
                                    value={searchQuery}
                                    onChangeText={(text) => setSearchQuery(text)}
                                    className="bg-white"
                                />
                            </View>
                            <TouchableOpacity
                                onPress={handleSearch}
                                className="bg-orange-500 px-4 py-3 rounded-lg"
                            >
                                <Text className="text-white font-bold text-sm">Search</Text>
                            </TouchableOpacity>
                        </View>


                        <TouchableOpacity
                            className="bg-orange-500 py-3 px-6 rounded-lg shadow-md mt-4"
                            onPress={getNearbyRestaurants}
                        >
                            <Text className="text-white text-base font-bold">Get Nearby Restaurants</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="p-4">
                    <Text className="text-gray-800 text-xl font-bold my-4 self-center">List Of Restaurants</Text>
                    {loading ? (
                        <View className="flex-1 justify-center items-center">
                            <ActivityIndicator size="large" color="#FFA726" />
                            <Text className="text-gray-400 mt-2">Loading restaurants...</Text>
                        </View>
                    ) : (
                        <>
                            {restaurants.length > 0 ? (
                                restaurants.map((restaurant) => (
                                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                                ))
                            ) : (
                                <Text className="text-gray-400 text-center">No restaurants found.</Text>
                            )}
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}