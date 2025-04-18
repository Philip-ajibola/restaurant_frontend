import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Loading state for the button
    const route = useRouter();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!email) {
            tempErrors.email = 'Email is required';
        } else if (!isValidEmail(email)) {
            tempErrors.email = 'Invalid email format';
        }
        if (!password) tempErrors.password = 'Password is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await axios.post('http://172.20.10.2:5000/api/users/auth', {
                email,
                password,
            });

            await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
            if (response.status === 200) {
                Alert.alert('Success', 'Logged in successfully!');
                route.push('(home)/homePage');
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Login failed. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-[#252836] justify-center items-center p-6">
            <View className="w-full max-w-md bg-white rounded-lg p-6 shadow-md">
                <Text className="text-2xl font-bold text-gray-800 text-center mb-6">Login</Text>

                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="mb-4 bg-orange-200"
                />
                {errors.email && (
                    <HelperText type="error" visible={true}>
                        {errors.email}
                    </HelperText>
                )}

                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    secureTextEntry={!showPassword}
                    right={
                        <TextInput.Icon
                            icon={showPassword ? 'eye-off' : 'eye'}
                            onPress={() => setShowPassword(!showPassword)}
                        />
                    }
                    className="mb-4 bg-orange-200"
                />
                {errors.password && (
                    <HelperText type="error" visible={true}>
                        {errors.password}
                    </HelperText>
                )}

                <TouchableOpacity
                    className="bg-orange-500 py-3 rounded-lg mt-4"
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white text-center font-bold">Login</Text>
                    )}
                </TouchableOpacity>


                <TouchableOpacity
                    className="mt-4"
                    onPress={() => route.push('register/register')}
                >
                    <Text className="text-center text-gray-800">
                        Don't have an account?{' '}
                        <Text className="text-orange-500 font-bold">Register here</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}