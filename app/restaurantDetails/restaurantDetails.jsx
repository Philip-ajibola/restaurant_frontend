import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, ActivityIndicator } from 'react-native';
import FoodCard from '../../components/foodCard/foodCard';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const RestaurantDetails = () => {
    const { restaurant } = useLocalSearchParams();
    const parsedRestaurant = JSON.parse(restaurant);

    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchFoods = async () => {
        try {
            const response = await axios.get(
                `http://172.20.10.2:5000/api/foods/restaurant/${parsedRestaurant.id}`
            );
            setFoods(response.data);
        } catch (error) {
            console.error('Error fetching foods:', error);
            alert('Failed to fetch foods. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    return (
        <View className="flex-1 bg-[#2D3748]">
            {/* Restaurant Header */}
            <View className="bg-[#2D3748] rounded-b-lg shadow-md mb-5">
                <Image
                    source={{ uri: parsedRestaurant.picture_url }}
                    className="w-full h-[300px] mb-2"
                    resizeMode="cover"
                />
                <Text className="text-2xl text-gray-300 font-bold mt-2 pl-3">
                    {parsedRestaurant.name}
                </Text>
                <Text className="text-gray-200 text-xl font-semibold pl-3">
                    {parsedRestaurant.location}
                </Text>
                <Text className="text-gray-200 text-xl mt-1 pl-3">
                    {parsedRestaurant.description}
                </Text>
            </View>

            {/* Loading Animation */}
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#FFA726" />
                    <Text className="text-gray-400 mt-2">Loading foods...</Text>
                </View>
            ) : (
                <FlatList
                    data={foods}
                    horizontal
                    keyExtractor={(food) => food.id.toString()}
                    renderItem={({ item: food }) => <FoodCard food={food} />}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingBottom: 24,
                        gap: 40,
                    }}
                    ListEmptyComponent={
                        <Text className="text-gray-400 text-center">
                            No foods found for this restaurant.
                        </Text>
                    }
                />
            )}
        </View>
    );
};

export default RestaurantDetails;