import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface IProps {
	title: number;
	subtitle: string;
	containerStyles?: any;
	titleStyles?: any;
}

export default function TheInfoBox({
	title,
	subtitle,
	containerStyles,
	titleStyles,
}: IProps) {
	return (
		<View className={containerStyles}>
			<Text className={`text-white font-psemibold text-center ${titleStyles}`}>
				{title}
			</Text>
			<Text className="text-sm text-gray-100 text-center font-pregular">
				{subtitle}
			</Text>
		</View>
	);
}
