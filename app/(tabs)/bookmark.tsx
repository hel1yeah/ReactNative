import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
	View,
	Text,
	FlatList,
	ActivityIndicator,
	RefreshControl,
	Button,
	StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IPost } from '@/interface/IPosts';
import useAppwrite from '@/lib/useAppwrite';
import { getLikedPosts, unLikePost } from '@/lib/appwrite';
import AppEmptyState from '@/components/AppEmptyState';
import TheSearchInput from '@/components/TheSearchInput';
import AppVideoCard from '@/components/AppVideoCard';

import { useGlobalContext } from '@/context/GlobalProvider';
import { AppFormFieldEnum } from '@/constants/Enums/AppFormFieldEnum';

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

const TheBookmark = () => {
	const { user, setUser, isLoading, setIsLoggetIn } = useGlobalContext();

	const {
		data: postsLiked,
		refetch,
		loading,
	} = useAppwrite<IPost[]>(() => getLikedPosts(user.$id));

	useEffect(() => {
		refetch();
	}, []);

	const [refreshing, setRefreshing] = useState<boolean>(false);

	async function onRefresh() {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	}

	const [postID, setPostID] = useState<null | string>(null);
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleClosePress = () => {
		setPostID(null);
		bottomSheetModalRef.current?.close();
	};
	const handleClosePressAndRemovePost = () => {
		if (!postID) return;

		unLikePost(postID, user.$id).then(() => {
			onRefresh();
		});

		bottomSheetModalRef.current?.close();
	};

	function handleLikedVideo(post: IPost) {
		setPostID(post.$id);
		handlePresentModalPress();
	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={postsLiked}
				keyExtractor={(item) => item.$id}
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
					<View className="flex my-6 px-4">
						<Text className="text-2xl font-psemibold text-white mt-1">
							Saved Videos
						</Text>

						<View className="mt-6 mb-8">
							<TheSearchInput
								title={AppFormFieldEnum.SEARCH}
								value=""
								placeholder="Search for videos"
								handlerChangeText={() => {}}
							/>
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
				// detached={false}
				// backgroundStyle={styles.container}
				// bottomInset={10}
			>
				<BottomSheetView style={styles.contentContainer}>
					<Button
						title="Close Sheet"
						onPress={handleClosePress}
						color={'red'}
					/>
					<Button
						title="Remove Post"
						onPress={handleClosePressAndRemovePost}
						color={'red'}
					/>
				</BottomSheetView>
			</BottomSheetModal>
		</SafeAreaView>
	);
};

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

export default TheBookmark;
