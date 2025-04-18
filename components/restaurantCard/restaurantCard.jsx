import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {useRouter} from "expo-router";

export default function  RestaurantCard ({ restaurant, onViewDetails })  {
    const route = useRouter()
    const handleDetails = (restaurant) => {
        if(onViewDetails) onViewDetails();
        route.push({
            pathname: 'restaurantDetails/restaurantDetails',
            params: { restaurant:JSON.stringify(restaurant) },
        });
    };
    return (
        <View className=" w-[85%] flex flex-col items-center justify-evenly rounded-2xlbg-white rounded-3xl shadow-md pb-4 mb-6 self-center bg-[#1f1d2b]">
            <Image
                src={restaurant.picture_url}
                className="w-[100%] h-40  rounded-t-3xl "
            />
            <View className="mt-3">
                <Text className="text-xl font-bold text-gray-100">{restaurant.name}</Text>
                <Text className="text-xl font-semibold text-gray-100">
                    <Text className="font-bold text-orange-300">Cuisine: </Text>
                    {restaurant.cuisine}
                </Text>
                <Text className="text-sm text-gray-500">{restaurant.location}</Text>
            </View>
            <TouchableOpacity
                className="bg-orange-500 py-2 px-4 rounded-lg mt-4"
                onPress={() => handleDetails(restaurant)}
            >
                <Text className="text-white text-center font-bold p-2">View  Details</Text>
            </TouchableOpacity>
        </View>
    );
};

