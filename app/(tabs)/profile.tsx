import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';

const TheProfileTab = () => {
	return (
		<View className="flex-1 items-center justify-center bg-white">
			<Text>sdsdsdsd!</Text>
			<Link href="/home">
				<Text>Go to home screen!</Text>
			</Link>
		</View>
	);
};

export default TheProfileTab;
