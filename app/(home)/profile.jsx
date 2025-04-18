import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        };
        getUserData();
    }, []);

    const handleUpdateDetails = async () => {
        console.log(user)
        if (!user) {
            Alert.alert('Error', 'User data not found.');
            return;
        }

        setLoading(true);
        try {
            const updateData = {};

            if (username) updateData.username = username;
            if (password) updateData.password = password;
            if (email) updateData.email = email;

            const response = await axios.put(`http://172.20.10.2:5000/api/users/${user.id}`, updateData);

            if (response.status === 200) {
                Alert.alert('Success', 'User details updated successfully!');
            } else {
                Alert.alert('Error', 'Failed to update user details.');
            }
        } catch (error) {
            console.error('Error updating details:', error);
            Alert.alert('Error', 'An error occurred while updating user details.');
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
