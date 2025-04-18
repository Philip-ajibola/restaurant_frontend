import React from 'react';
import { View, FlatList,Image,Text } from 'react-native';
import FoodCard from '../../components/foodCard/foodCard';
import {useLocalSearchParams} from "expo-router";

const RestaurantDetails = () => {
    const { restaurant } = useLocalSearchParams();
    const parsedRestaurant = JSON.parse(restaurant);
    console.log(parsedRestaurant)
    return (
        <View className="flex-1 bg-[#2D3748]">
            {/* Restaurant Header */}
            <View className="bg-[#2D3748] rounded-b-lg shadow-md mb-5">
                <Image
                    source={parsedRestaurant.img}
                    className="w-full h-[300px] mb-2"
                    resizeMode="cover"
                />
                <Text className="text-2xl text-gray-300 font-bold mt-2 pl-3">{parsedRestaurant.name}</Text>
                <Text className="text-gray-200 text-xl font-semibold pl-3">{parsedRestaurant.location}</Text>
                <Text className="text-gray-200 text-xl mt-1 pl-3">{parsedRestaurant.description}</Text>
            </View>

            <FlatList
                data={parsedRestaurant.foods}
                horizontal
                keyExtractor={(food) => food.id.toString()}
                renderItem={({ item: food }) => (
                    <FoodCard food={food} />
                )}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 24,
                    gap:40,
                }}
            />
        </View>
    );
};

export default RestaurantDetails;