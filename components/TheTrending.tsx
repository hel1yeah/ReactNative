import {
	View,
	Text,
	FlatList,
	ViewToken,
	TouchableOpacity,
	ImageBackground,
	Image,
} from 'react-native';
import React from 'react';
import { FC, useState } from 'react';
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
		scale: 1.1,
	},
};
const zoomOut = {
	0: {
		scale: 1,
	},
	1: {
		scale: 0.9,
	},
};

const customAnimation = {
	0: { scale: 0.5 },
	1: { scale: 1 },
};

const TrendingItem: FC<ITrendingItem> = ({ activeItemId, item }) => {
	const [play, setPlay] = useState(false);

	// const typeOfAnimation = ;

	return (
		<Animatable.View
			className="mr-5"
			animation={activeItemId === item.$id ? zoomIn : zoomOut}
			duration={500}
		>
			{play ? (
				<Text className="text-white">Playing</Text>
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
	const [activeItemId, setActiveItemId] = useState(posts[0].$id);

	const viewableActiveItemChanged = ({
		viewableItems,
	}: {
		viewableItems: Array<ViewToken>;
	}) => {
		if (viewableItems.length > 0) {
			setActiveItemId(viewableItems[0].key);
		}
	};

	return (
		<FlatList
			data={posts}
			keyExtractor={(item) => item.$id}
			renderItem={({ item }) => (
				<TrendingItem activeItemId={activeItemId} item={item} />
			)}
			onViewableItemsChanged={viewableActiveItemChanged}
			viewabilityConfig={{
				itemVisiblePercentThreshold: 70,
			}}
			contentOffset={{ x: 110, y: 0 }}
			horizontal
		/>
	);
};

export default TheTrending;
