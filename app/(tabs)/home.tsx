import {
	FlatList,
	Text,
	View,
	Image,
	RefreshControl,
	Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Link as Link } from 'expo-router';

import { IPost } from '@/interface/IPosts';
import { getAllPosts, getLatestPosts } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import TheSearchInput from '@/components/TheSearchInput';
import TheTrending from '@/components/TheTrending';
import AppVideoCard from '@/components/AppVideoCard';
import AppEmptyState from '@/components/AppEmptyState';
import { useGlobalContext } from '@/context/GlobalProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppFormFieldEnum } from '@/constants/Enums/AppFormFieldEnum';
import { images } from '@/constants';

export default function HomeScreen() {
	const { user } = useGlobalContext();
	const { data: posts, loading, refetch } = useAppwrite<IPost[]>(getAllPosts);
	const {
		data: latestPosts,
		refetch: refetchLatest,
		loading: latestLoading,
	} = useAppwrite<IPost[]>(getLatestPosts);

	const [refreshing, setRefreshing] = useState<boolean>(false);

	async function onRefresh() {
		setRefreshing(true);
		await refetch();
		await refetchLatest();
		setRefreshing(false);
	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={posts || []}
				keyExtractor={(item) => item?.$id}
				renderItem={({ item }) => (
					<AppVideoCard
						title={item.title}
						thumbnail={item.thumbnail}
						video={item.video}
						creator={item?.creator ? item?.creator?.username : undefined}
						avatar={item?.creator ? item?.creator.avatar : undefined}
					/>
				)}
				ListHeaderComponent={() => (
					<View className="my-6 px-4 space-y-6">
						<View className="justify-between items-start flex-row mb-6">
							<View>
								<Text className="text-sm font-pmedium text-gray-100">
									Welcome back
								</Text>
								<Text className="text-2xl font-psemibold text-white">
									{user?.username}
								</Text>
							</View>
							<View className="mt-1.5">
								<Image
									source={images.logoSmall}
									className="w-9 h-10"
									resizeMode="contain"
								/>
							</View>
						</View>
						<TheSearchInput
							title={AppFormFieldEnum.SEARCH}
							value=""
							placeholder="Search for videos"
							handlerChangeText={() => {}}
						/>

						<View className="w-full flex-1 pt-5 pb-8">
							<Text className="text-gray-100 tex-lg font-pregular mb-3">
								Lates Videos
							</Text>
							{latestLoading && latestPosts ? (
								<AppEmptyState
									title="No videos found"
									subtitle="Be first who one to upload video"
								/>
							) : (
								<TheTrending posts={latestPosts || []} />
							)}
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<AppEmptyState
						title="No videos found"
						subtitle="Be first who one to upload video"
					/>
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
		</SafeAreaView>
	);
}
