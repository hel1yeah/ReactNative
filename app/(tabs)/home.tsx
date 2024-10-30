import {
	FlatList,
	Text,
	View,
	Image,
	RefreshControl,
	Alert,
	ActivityIndicator,
	StyleSheet,
	Button,
	TouchableOpacity,
} from 'react-native';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Link as Link, useRouter } from 'expo-router';

import { IPost } from '@/interface/IPosts';
import { getAllPosts, getLatestPosts, likePost } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import TheSearchInput from '@/components/TheSearchInput';
import TheTrending from '@/components/TheTrending';
import AppVideoCard from '@/components/AppVideoCard';
import AppEmptyState from '@/components/AppEmptyState';
import { useGlobalContext } from '@/context/GlobalProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppFormFieldEnum } from '@/constants/Enums/AppFormFieldEnum';
import { images } from '@/constants';

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

export default function HomeScreen() {
	const router = useRouter();

	const [postID, setPostID] = useState<null | string>(null);
	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleClosePress = () => {
		setPostID(null);
		bottomSheetModalRef.current?.close();
	};
	const handleClosePressAndSavePost = () => {
		if (!postID) return;

		likePost(postID, user.$id).then(() => {
			router.push('../(tabs)/bookmark');
		});

		bottomSheetModalRef.current?.close();
	};

	function handleLikedVideo(post: IPost) {
		setPostID(post.$id);
		handlePresentModalPress();
	}
	const { user } = useGlobalContext();
	const {
		data: latestPosts,
		refetch: refetchLatest,
		loading: latestLoading,
	} = useAppwrite<IPost[]>(getLatestPosts);

	const { data: posts, loading, refetch } = useAppwrite<IPost[]>(getAllPosts);

	const [refreshing, setRefreshing] = useState<boolean>(false);

	async function onRefresh() {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	}

	return (
		<SafeAreaView className="bg-primary h-full" edges={['top']}>
			<FlatList
				className="bg-primary h-fit"
				data={posts || []}
				keyExtractor={(item) => item?.$id}
				renderItem={({ item }) => (
					<AppVideoCard
						id={item.id}
						title={item.title}
						thumbnail={item.thumbnail}
						video={item.video}
						creator={item?.creator ? item?.creator?.username : undefined}
						avatar={item?.creator ? item?.creator.avatar : undefined}
						onOpenMenu={() => handleLikedVideo(item)}
					/>
				)}
				ListHeaderComponent={() => (
					<View className="my-6 px-4 space-y-6">
						{/* <TouchableOpacity onPress={handlePresentModalPress}>
							<Text className="text-2xl font-psemibold text-white">
								Show Modal
							</Text>
						</TouchableOpacity> */}
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
							<View className="flex-1">
								{latestLoading ? (
									<View className="flex items-center justify-center h-72">
										<ActivityIndicator size={72} color="#FF9C01" />
									</View>
								) : !latestPosts ? (
									<AppEmptyState
										title="No videos found"
										subtitle="Be first who one to upload video"
									/>
								) : (
									<TheTrending posts={latestPosts} />
								)}
							</View>
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<View>
						{!loading ? (
							<AppEmptyState
								title="No Videos Found"
								subtitle="No videos found for this search query"
							/>
						) : (
							<View className="flex items-center justify-center h-72">
								<ActivityIndicator size={72} color="#FF9C01" />
							</View>
						)}
					</View>
				)}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				enableDismissOnClose={true}
				detached={false}
				backgroundStyle={styles.container}
				bottomInset={10}
			>
				<BottomSheetView style={styles.contentContainer}>
					<Button
						title="Close Sheet"
						onPress={handleClosePress}
						color={'red'}
					/>
					<Button title="Save" onPress={handleClosePressAndSavePost} />
				</BottomSheetView>
			</BottomSheetModal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	contentContainer: {
		flex: 1,
		padding: 36,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
	},
});
