import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
// import { Video, ResizeMode } from 'expo-av';

import { IPost } from '@/interface/IPosts';
import { icons } from '@/constants';

// Описуємо типи пропсів для компонента

interface AppVideoCardProps {
	id: string;
	title: string;
	thumbnail: string;
	video: string;
	creator: string | undefined;
	avatar: string | undefined;
	onOpenMenu: (e: string) => void;
}

const AppVideoCard: React.FC<AppVideoCardProps> = ({
	id,
	title,
	thumbnail,
	video,
	creator,
	avatar,
	onOpenMenu,
}) => {
	const [play, setPlay] = useState(false);

	function handlerOpenMenu() {
		onOpenMenu(id);
	}

	return (
		<View className="flex flex-col items-center px-4 mb-14">
			<View className="flex flex-row gap-3 items-center">
				<View className="flex justify-center items-center flex-row flex-1">
					{avatar ? (
						<View className="w-[46px] h-[46px] rounded-md border border-secondary flex justify-center items-center">
							<Image
								source={{ uri: avatar }}
								className="w-[90%] h-[90%] rounded-[3px]"
								resizeMode="cover"
							/>
						</View>
					) : (
						<View className="flex-col justify-center item-center ">
							<Text className="text-center text-white">No </Text>
							<Text className="text-center text-white">Avatar</Text>
						</View>
					)}

					<View className="flex justify-center flex-1 ml-3 gap-y-1">
						<Text
							className="font-psemibold text-sm text-white"
							numberOfLines={1}
						>
							{title}
						</Text>
						{creator ? (
							<Text
								className="text-xs text-gray-100 font-pregular"
								numberOfLines={1}
							>
								{creator}
							</Text>
						) : (
							<Text
								className="text-xs text-gray-100 font-pregular"
								numberOfLines={1}
							>
								no name
							</Text>
						)}
					</View>
				</View>
				<TouchableOpacity
					onPress={() => handlerOpenMenu()}
					className="w-6 h-6 p-2 m-3 items-center justify-center"
				>
					<Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
				</TouchableOpacity>
			</View>
			{play ? (
				<Video
					source={{ uri: video }}
					className="w-full h-60 rounded-xl mt-3"
					resizeMode={ResizeMode.CONTAIN}
					useNativeControls
					shouldPlay
					onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
						if (status.isLoaded && status.didJustFinish) setPlay(false);
					}}
				/>
			) : (
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => setPlay(true)}
					className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
				>
					<Image
						source={{ uri: thumbnail }}
						className="w-full h-full rounded-xl mt-3"
						resizeMode="cover"
					/>

					<Image
						source={icons.play}
						className="w-12 h-12 absolute"
						resizeMode="contain"
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default AppVideoCard;
