// LandingPage.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import OnboardingSlide from './onBoardingSlide';
import {useRouter} from "expo-router";

const slides = [
    {
        id: 1,
        title: "incomparable delicacy",
        description: "All the best restaurants with their top menu waiting for you, they can’t wait for your order!!",
        image: require('../../assets/images/restaurant1.jpg'),
    },
    {
        id: 2,
        title: "delicious meals",
        description: "Indulge in our mouthwatering dishes crafted by master chefs.",
        image: require('../../assets/images/restaurant2.jpeg'),
    },
    {
        id: 3,
        title: "authentic flavors",
        description: "Experience authentic tastes from around the world.",
        image: require('../../assets/images/restaurant3.jpg'),
    },
];

export default function LandingPage() {
    const route = useRouter();
    const [currentSlide, setCurrentSlide] = useState(0);

    const totalSlides = slides.length;

    const handleNext = () => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(currentSlide + 1);
        }else{
            route.push('/register/register')
        }

    };

    const handleSkip = () => {
        route.push('register/register')
    };

    return (
        <View className="flex-1">
            <OnboardingSlide
                title={slides[currentSlide].title}
                description={slides[currentSlide].description}
                image={slides[currentSlide].image}
                handleNext={handleNext}
                handleSkip={handleSkip}
                currentSlide={currentSlide}
                slides={slides}
            />
        </View>
    );
}