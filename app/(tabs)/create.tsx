import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

// context
import { useGlobalContext } from '@/context/GlobalProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

// api
import { createVideoPost } from '@/lib/appwrite';

// documents piker and image piker
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

// enum
import { AppFormFieldEnum } from '@/constants/Enums/AppFormFieldEnum';

// components
import AppFormField from '@/components/AppFormField';
import AppCustomButton from '@/components/AppCustomButton';

// video
import { Video, ResizeMode } from 'expo-av';

// icons
import { icons } from '@/constants';

// router
import { useRouter } from 'expo-router';

// react
import React from 'react';
import { useState } from 'react';
import { Alert } from 'react-native';

const TheCreate = () => {
	interface IForm {
		title: string;
		video: null | ImagePicker.ImagePickerAsset;
		thumbnail: null | ImagePicker.ImagePickerAsset;
		prompt: string;
	}

	const { user } = useGlobalContext();
	const router = useRouter();
	const [isUploading, setUploading] = useState(false);
	const [form, setForm] = useState<IForm>({
		title: '',
		video: null,
		thumbnail: null,
		prompt: '',
	});

	enum EPiker {
		VIDEO = 'video',
		IMAGE = 'image',
	}

	async function onOpenPiker(selectType: EPiker) {
		let result: ImagePicker.ImagePickerResult =
			await ImagePicker.launchImageLibraryAsync({
				mediaTypes:
					selectType === EPiker.IMAGE
						? ImagePicker.MediaTypeOptions.Images
						: ImagePicker.MediaTypeOptions.Videos,
				aspect: [4, 3],
				quality: 1,
			});

		// const result = await DocumentPicker.getDocumentAsync({
		// 	type: objPiker[selectType],
		// });

		if (!result.canceled) {
			if (selectType === EPiker.IMAGE) {
				setForm({ ...form, thumbnail: result.assets[0] });
			} else {
				setForm({ ...form, video: result.assets[0] });
			}
		} else {
			setTimeout(() => {
				Alert.alert('Document Piker', JSON.stringify(result, null, 2));
			}, 100);
		}
	}
	async function onSubmit() {
		if (
			form.prompt === '' ||
			form.title === '' ||
			!form.thumbnail ||
			!form.video
		) {
			return Alert.alert('Please provide all fields');
		}

		setUploading(true);
		try {
			await createVideoPost({
				...form,
				userId: user.$id,
			});

			Alert.alert('Success', 'Post uploaded successfully');
			router.push('/home');
		} catch (error: any) {
			Alert.alert('Error', error.message);
		} finally {
			setForm({
				title: '',
				video: null,
				thumbnail: null,
				prompt: '',
			});

			setUploading(false);
		}
	}
	return (
		<SafeAreaView className="bg-primary h-full" edges={['top']}>
			<ScrollView className="px-4">
				<Text className="text-4xl font-psemibold text-white">Upload Video</Text>

				<AppFormField
					title={AppFormFieldEnum.VIDEO}
					placeholder="Enter Title"
					value={form.title}
					handlerChangeText={(e) => setForm({ ...form, title: e })}
					otherStyles="mt-10"
				/>

				<View className="mt-7 space-y-2 w-full">
					<Text className="text-base font-pmedium text-gray-100">
						Upload Video
					</Text>

					<TouchableOpacity onPress={() => onOpenPiker(EPiker.VIDEO)}>
						{form.video ? (
							<Video
								source={{ uri: form.video.uri }}
								className="
								w-full 
								h-40  
								rounded-2xl
								"
								useNativeControls
								resizeMode={ResizeMode.COVER}
								isLooping
								volume={0.1}
							/>
						) : (
							<View
								className="
								w-full 
								h-40 
								border-gray-500
								border
								bg-black-100
								rounded-2xl 
								justify-center 
								items-center
								"
							>
								<View
									className="
									justify-center 
									items-center 
									w-16 
									h-16
									border
									border-dashed
									border-secondary-200
									rounded-2xl
									"
								>
									<Image
										source={icons.upload}
										className="w-1/2"
										resizeMode="contain"
									/>

									{/* <Text className="text-base font-pmedium text-white">
										No Video Selected
									</Text> */}
								</View>
							</View>
						)}
					</TouchableOpacity>
				</View>
				<View className="mt-7 space-y-2">
					<Text className="text-base font-pmedium text-gray-100">
						Thumbnail image
					</Text>
					<TouchableOpacity onPress={() => onOpenPiker(EPiker.IMAGE)}>
						{form.thumbnail ? (
							<Image
								source={{ uri: form.thumbnail.uri }}
								className="w-full h-64 rounded-2xl"
								resizeMode="cover"
							/>
						) : (
							<View
								className="
								w-full 
								h-16
								border-gray-500
								border
								bg-black-100
								rounded-2xl 
								justify-center 
								items-center
								"
							>
								<Image
									source={icons.upload}
									className="w-5 h-5"
									resizeMode="contain"
								/>
								<Text className="text-sm font-pmedium text-gray-100">
									<Text>Choose a img/png file</Text>
								</Text>
							</View>
						)}
					</TouchableOpacity>
				</View>

				<AppFormField
					title={AppFormFieldEnum.PROMPT}
					placeholder="Enter Prompt"
					value={form.prompt}
					handlerChangeText={(e) => setForm({ ...form, prompt: e })}
					otherStyles="mt-10"
				/>

				<AppCustomButton
					title="Submit & Publish"
					isLoading={isUploading}
					handlePress={() => onSubmit()}
					containerStyle="w-full my-6"
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default TheCreate;
