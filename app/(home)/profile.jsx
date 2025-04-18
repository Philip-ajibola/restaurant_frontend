import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function Profile() {
    // State variables for form fields
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    // Function to handle form submission
    const handleUpdateDetails = () => {
        setLoading(true);
        try {
            console.log('Updated Details:');
            console.log('Username:', username);
            console.log('Password:', password);
            console.log('Email:', email);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-[#2D3748] justify-center items-center p-6">
            {/* Content Container */}
            <View className="w-full max-w-md bg-white rounded-lg p-6 shadow-md">
                {/* Heading */}
                <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Edit User Details
                </Text>

                {/* Username Field */}
                <TextInput
                    label="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    mode="outlined"
                    className="mb-4 bg-orange-200"
                />

                {/* Password Field */}
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    mode="outlined"
                    className="mb-4 bg-orange-200"
                />

                {/* Email Field */}
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    mode="outlined"
                    keyboardType="email-address"
                    className="mb-6 bg-orange-200"
                />

                {/* Update Details Button */}
                <TouchableOpacity
                    onPress={handleUpdateDetails}
                    className={`bg-orange-500 py-3 px-6 rounded-lg shadow-md ${loading ? 'opacity-50' : ''}`}
                    disabled={loading}
                >
                    <Text className="text-white text-base font-bold text-center">
                        {loading ? 'Updating...' : 'Update Details'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}