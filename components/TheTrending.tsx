import {
	View,
	Text,
	FlatList,
	ViewToken,
	TouchableOpacity,
	ImageBackground,
	Image,
} from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import React from 'react';
import { FC, useState, useRef } from 'react';
import * as Animatable from 'react-native-animatable';

import { IPost } from '@/interface/IPosts';

import { icons } from '@/constants';
// import Animated from 'react-native-reanimated';
interface ITrendingItem {
	activeItemId: any;
	item: IPost;
}
interface AppTheTrendingProps {
	posts?: IPost[];
}

const zoomIn = {
	0: {
		scale: 0.9,
	},
	1: {
		scale: 1,
	},
};
const zoomOut = {
	0: {
		scale: 1,
	},
	1: {
		scale: 0.8,
	},
};

const TrendingItem: FC<ITrendingItem> = ({ activeItemId, item }) => {
	const [play, setPlay] = useState(false);

	// const typeOfAnimation = ;

	return (
		<Animatable.View
			className="mr-5"
			// @ts-ignore
			animation={activeItemId === item?.$id ? zoomIn : zoomOut}
			duration={500}
		>
			{play ? (
				<Video
					source={{ uri: item.video }}
					className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
					resizeMode={ResizeMode.CONTAIN}
					useNativeControls
					shouldPlay
					onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
						if (status.isLoaded && status.didJustFinish) setPlay(false);
					}}
				/>
			) : (
				<TouchableOpacity
					className="relative justify-center items-center"
					activeOpacity={0.7}
					onPress={() => setPlay(true)}
				>
					<ImageBackground
						source={{ uri: item.thumbnail }}
						className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/4"
						resizeMode="cover"
					/>

					<Image
						source={icons.play}
						className="w-12 h-12 absolute"
						resizeMode="contain"
					/>
				</TouchableOpacity>
			)}
		</Animatable.View>
	);
};

const TheTrending: React.FC<AppTheTrendingProps> = ({ posts = null }) => {
	if (!posts) return null;
	const [activeItemId, setActiveItemId] = useState(posts[0]?.$id);

	const viewableActiveItemChanged = ({
		viewableItems,
	}: {
		viewableItems: Array<ViewToken>;
	}) => {
		if (viewableItems.length > 0) {
			setActiveItemId(viewableItems[0].key);
		}
	};
	const viewabilityConfigCallbackPairs = useRef([
		{
			viewabilityConfig: { itemVisiblePercentThreshold: 80 },
			onViewableItemsChanged: viewableActiveItemChanged,
		},
	]);
	return (
		<FlatList
			data={posts}
			keyExtractor={(item) => item?.$id}
			renderItem={({ item }) => (
				<TrendingItem activeItemId={activeItemId} item={item} />
			)}
			viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
			contentOffset={{ x: 0, y: 0 }}
			horizontal
		/>
	);
};

export default TheTrending;
