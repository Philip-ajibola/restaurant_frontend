// OnboardingSlide.js
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function OnboardingSlide({ title, description, image, handleNext, handleSkip, currentSlide,slides }) {
    const totalSlides = slides.length;

    return (
        <View className="flex-1">
            <Image
                source={image}
                className="absolute top-0 left-0 w-full h-full"
                resizeMode="cover"
            />
            <View className="absolute bottom-0 w-full px-6 pb-10">
                <View className="flex flex-col justify-evenly bg-orange-500 h-[400px] rounded-3xl py-10 px-6">
                    <Text className="text-white text-2xl font-semibold text-center m-[-15]">
                        We serve
                    </Text>
                    <Text className="text-white text-2xl font-semibold text-center m-0">
                        {title}
                    </Text>

                    <Text className="text-white text-center text-xl m-0">
                        {description}
                    </Text>

                    {/* Pagination dots */}
                    <View className="flex-row justify-center space-x-2 mb-6">
                        {slides.map((_, index) => (
                            <View
                                key={index}
                                className={`w-3 h-1.5 rounded-full ${
                                    index === currentSlide ? 'bg-white' : 'bg-gray-400'
                                }`}
                            />
                        ))}
                    </View>

                    {/* Bottom buttons */}
                    <View className="flex-row justify-between items-center px-2">
                        <TouchableOpacity onPress={handleSkip}>
                            <Text className="text-white text-xl font-semibold">Skip</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleNext} className="bg-white rounded-full p-3">
                            <Text className="text-orange-500 font-bold">{'→'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}