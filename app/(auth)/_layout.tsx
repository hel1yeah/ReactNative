import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const TheAuthRootLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="sing_in" options={{ headerShown: false }} />
				<Stack.Screen name="sing_up" options={{ headerShown: false }} />
			</Stack>
			<StatusBar backgroundColor="#161622" style="light" />
		</>
	);
};

export default TheAuthRootLayout;
