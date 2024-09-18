import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';

const TheProfileTab = () => {
	return (
		<View>
			<Text>sdsdsdsd!</Text>
			<Link href="/profile">
				<Text>Go to home screen!</Text>
			</Link>
		</View>
	);
};

export default TheProfileTab;
