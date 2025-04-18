import React from 'react';
import { View, Image,Text } from 'react-native';

const FoodCard = ({ food }) => {
    return (
        <View className="w-[250px] h-[300px] bg-gray-800 rounded-lg shadow-md ">
            <Image
                src={food.picture_url}
                className="w-full h-40 rounded-lg mb-2"
                resizeMode="cover"
            />

            <Text className="text-white text-xl font-bold pl-4">{food.name}</Text>

            <Text className="text-yellow-500 text-sm mt-1 pl-4">${food.price}</Text>

            <Text className="text-gray-200 text-xs mt-1 pl-4">20 Bowls available</Text>
        </View>
    );
};

export default FoodCard;