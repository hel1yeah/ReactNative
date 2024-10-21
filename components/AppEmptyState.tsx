import { View, Text, Image } from 'react-native';
import React from 'react';

import { images } from '@/constants';
import AppCustomButton from '@/components/AppCustomButton';
import { router } from 'expo-router';

interface AppEmptyStateProps {
	title: string;
	subtitle: string;
}

const AppEmptyState: React.FC<AppEmptyStateProps> = ({
	title = 'Empty state',
	subtitle = 'This is an empty state',
}) => {
	return (
		<View className="flex-1 items-center justify-center px-2">
			<Image
				source={images.empty}
				className="w-[270px] h-[215px]"
				resizeMode="contain"
			/>
			<View>
				<Text className="text-xl text-center font-psemibold text-white mt-2">
					{title}
				</Text>
				<Text className="text-sm font-pmedium text-gray-100">{subtitle}</Text>
			</View>

			<AppCustomButton
				title="Create Video"
				handlePress={() => router.push('/create')}
				containerStyle="w-full my-6"
			/>
		</View>
	);
};

export default AppEmptyState;
