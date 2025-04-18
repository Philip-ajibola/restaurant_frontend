import React, { useState, useEffect } from 'react';
import { ScrollView, Image, View, TouchableOpacity, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import RestaurantCard from '../../components/restaurantCard/restaurantCard';
import { TextInput } from 'react-native-paper';
import axios from 'axios';

export default function HomePage() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const restaurant2 = require('../../assets/images/restaurant2.jpeg');

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/restaurants/');
            setRestaurants(response.data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            alert('Failed to fetch restaurants. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            alert('Please enter a location or cuisine type.');
            return;
        }

        // Filter restaurants based on the search query
        const filteredRestaurants = restaurants.filter(
            (restaurant) =>
                restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setRestaurants(filteredRestaurants); // Update state with filtered results
    };

    // Fetch restaurants when the component mounts
    useEffect(() => {
        fetchRestaurants();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-[#252836]">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View className="relative">
                    <Image
                        source={restaurant2}
                        className="w-full h-64"
                        resizeMode="cover"
                    />
                    <View className="absolute top-0 left-0 w-full h-full bg-black/50 justify-center items-center p-6">
                        <Text className="text-white text-center text-xl font-bold mb-4">
                            Welcome to Nearby Restaurants App!
                        </Text>
                        <Text className="text-white text-center text-base mb-8">
                            Discover delicious restaurants near you with our app. Search by location, cuisine type, or price range to find the perfect dining experience.
                        </Text>

                        {/* Search Input */}
                        <TextInput
                            mode="outlined"
                            label="Search Restaurants"
                            placeholder="Enter location or cuisine"
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                            className="w-full mb-4"
                        />

                        {/* Search Button */}
                        <TouchableOpacity
                            className="bg-orange-500 py-3 px-6 rounded-lg shadow-md"
                            onPress={handleSearch}
                        >
                            <Text className="text-white text-base font-bold">Find Restaurants</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Restaurant List Section */}
                <View className="p-4">
                    <Text className="text-gray-800 text-xl font-bold my-4 self-center">List Of Restaurants</Text>

                    {/* Loading Animation */}
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
                                <Text className="text-gray-400 text-center">
                                    No restaurants found. Try a different search.
                                </Text>
                            )}
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}