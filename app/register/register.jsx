import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const route = useRouter();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!username) tempErrors.username = 'Username is required';
        if (!email) {
            tempErrors.email = 'Email is required';
        } else if (!isValidEmail(email)) {
            tempErrors.email = 'Invalid email format';
        }
        if (!password) tempErrors.password = 'Password is required';
        if (password !== confirmPassword) tempErrors.confirmPassword = 'Passwords do not match';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await axios.post('http://172.20.10.2:5000/api/users/', {
                username,
                email,
                password,
            });
            console.log(response)
            await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
            if (response.status === 201) {
                Alert.alert('Success', 'User registered successfully!');
                route.push('(home)/homePage');
            } else {
                Alert.alert(response.error)
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-[#252836] justify-center items-center p-6">
            <View className="w-full max-w-md bg-white rounded-lg p-6 shadow-md">
                <Text className="text-2xl font-bold text-gray-800 text-center mb-6">Register</Text>

                {/* Username Input */}
                <TextInput
                    label="Username"
                    value={username}
                    onChangeText={setUsername}
                    mode="outlined"
                    className="mb-4 bg-orange-200"
                />
                {errors.username && (
                    <HelperText type="error" visible={true}>
                        {errors.username}
                    </HelperText>
                )}

                {/* Email Input */}
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

                <TextInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
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
                {errors.confirmPassword && (
                    <HelperText type="error" visible={true}>
                        {errors.confirmPassword}
                    </HelperText>
                )}

                <TouchableOpacity
                    className="bg-orange-500 py-3 rounded-lg mt-4"
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white text-center font-bold">Register</Text>
                    )}
                </TouchableOpacity>

                {/* Login Link */}
                <TouchableOpacity
                    className="mt-4"
                    onPress={() => route.push('login/login')}
                >
                    <Text className="text-center text-gray-800">
                        Already have an account?{' '}
                        <Text className="text-orange-500 font-bold">Login here</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}