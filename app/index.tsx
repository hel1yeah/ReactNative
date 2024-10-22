import { Link, Stack, Redirect, router } from 'expo-router';
import { View, Image, ScrollView, Text } from 'react-native';
import { useGlobalContext } from '@/context/GlobalProvider';

import { SafeAreaView } from 'react-native-safe-area-context';

import AppCustomButton from '@/components/AppCustomButton';

import images from '../constants/images';

import React from 'react';
export default function App() {
	const { isLoading, isLoggetIn } = useGlobalContext();

	if (!isLoading && isLoggetIn) {
		return <Redirect href="/home" />;
	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView contentContainerStyle={{ height: '100%' }}>
				<View className="w-full h-full min-h-[85vh] justify-center items-center px-4">
					<Image
						source={images.logo}
						className="w-[120px] h-[84px]"
						resizeMode="contain"
					></Image>
					<Image
						source={images.cards}
						className="max-w-[380px] max-h-[300px]"
						resizeMode="contain"
					></Image>

					<View className="relative mt-5">
						<Text className="text-3xl text-white font-bold text-center">
							Discover Endless Possibilities with{' '}
							<Text className="text-secondary-200 text-center">Aora</Text>
						</Text>
						<Image
							source={images.path}
							className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
							resizeMode="contain"
						></Image>
					</View>
					<Text className="text-gray-100 text-sm text-center font-pregular mt-7">
						Where Creativity Meets Innovation: Embark on a Journey of Limitless
						Exploration with Aora
					</Text>

					<AppCustomButton
						title="Continue with Email"
						handlePress={() => router.push('/(auth)/sing_in')}
						containerStyle="mt-7"
						textStyles=""
						isLoading={false}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
