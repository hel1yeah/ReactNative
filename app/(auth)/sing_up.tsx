import React from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';

// MyAppNameAora
// com.packagehel1yeah.aoraapp
// export const config = {
// 	endpoint: 'https://cloud.appwrite.io/v1',
// 	platform: 'com.packagehel1yeah.aoraapp',
// 	projectId: '670d0c6a002556b2df8f',
// 	databaseId: '670d0e530025a364da5f',
// 	usersCollectionId: '670d0ea0002cd72ec156',
// 	videosCollectionId: '670d0eec001a7012a346',
// 	storageId: '670d316c0028dc92ed2c',
// };

import { useGlobalContext } from '@/context/GlobalProvider';
import { useState } from 'react';

import { images } from '@/constants';
import { AppFormFieldEnum } from '@/constants/Enums/AppFormFieldEnum';
import AppFormField from '@/components/AppFormField';
import AppCustomButton from '@/components/AppCustomButton';

import { registerUser } from '@/lib/appwrite';

const TheSingUp = () => {
	interface FormData {
		userName: string;
		email: string;
		password: string;
	}

	const [form, setForm] = useState<FormData>({
		userName: '',
		email: '',
		password: '',
	});
	const { setUser, setIsLoggetIn } = useGlobalContext();
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSingUp() {
		if (!form.userName || !form.email || !form.password) {
			Alert.alert('Error', 'Please fill in all fields');
		}

		setIsSubmitting(true);

		try {
			const res = await registerUser(form.email, form.password, form.userName);

			setUser(res);
			setIsLoggetIn(true);

			router.replace('/home');
		} catch (error: any) {
			console.log(error);

			Alert.alert('Error', error.message);
		} finally {
			setIsSubmitting(false);
		}

		// registerUser();
		// setIsSubmitting(false);
	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full h-full min-h-[70vh] justify-center px-4 my-6">
					<Link href="/">
						<Image
							source={images.logo}
							resizeMode="contain"
							className="w-[115px] h-[35px]"
						/>
					</Link>
					<Text className="text-2xl text-white text-semibold mt-10">
						Sign Up to Aora
					</Text>

					<AppFormField
						title={AppFormFieldEnum.USERNAME}
						value={form.userName}
						placeholder={AppFormFieldEnum.USERNAME}
						handlerChangeText={(e: string) => {
							setForm({
								...form,
								userName: e,
							});
						}}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>
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
						title="Sign Up"
						handlePress={handleSingUp}
						isLoading={isSubmitting}
						containerStyle="mt-7"
						textStyles=""
					/>

					<View className="flex-row items-center justify-center pt-5 gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							Have an account already?
						</Text>
						<Link
							href="/sing_in"
							className="text-lg text-secondary-100 font-psemibold"
						>
							Sign In
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default TheSingUp;
