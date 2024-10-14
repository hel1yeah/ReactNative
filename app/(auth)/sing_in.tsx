import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import { useState } from 'react';

import { images } from '@/constants';
import { AppFormFieldEnum } from '@/constants/Enums/AppFormFieldEnum';
import AppFormField from '@/components/AppFormField';
import AppCustomButton from '@/components/AppCustomButton';

const TheSingIn = () => {
	interface FormData {
		email: string;
		password: string;
	}

	const [form, setForm] = useState<FormData>({ email: '', password: '' });

	const [isSubmitting, setIsSubmitting] = useState(false);

	function handleSingIn() {
		setIsSubmitting(true);
		console.log('asASD');
	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full h-full min-h-[70vh] justify-center px-4 my-6">
					<Image
						source={images.logo}
						resizeMode="contain"
						className="w-[115px] h-[35px]"
					/>
					<Text className="text-2xl text-white text-semibold mt-10">
						Log In to Aora
					</Text>

					<AppFormField
						title={AppFormFieldEnum.EMAIL}
						value={form.email}
						placeholder={AppFormFieldEnum.EMAIL}
						handlerChangeText={(e: string) => {
							setForm({
								...form,
								email: e,
							});
						}}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>
					<AppFormField
						title={AppFormFieldEnum.PASSWORD}
						value={form.password}
						placeholder={AppFormFieldEnum.PASSWORD}
						handlerChangeText={(e: string) => {
							setForm({
								...form,
								password: e,
							});
						}}
						otherStyles="mt-7"
					/>
					<AppCustomButton
						title="Sign In"
						handlePress={handleSingIn}
						isLoading={isSubmitting}
						containerStyle="mt-7"
						textStyles=""
					/>

					<View className="flex-row items-center justify-center pt-5 gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							Don't have an account?{' '}
						</Text>
						<Link
							href="/sing_up"
							className="text-lg text-secondary-100 font-psemibold"
						>
							Sign Up
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default TheSingIn;
