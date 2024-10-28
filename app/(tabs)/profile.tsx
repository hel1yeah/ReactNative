import { router } from 'expo-router';
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Image,
	ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useAppwrite from '@/lib/useAppwrite';
import { getUserPosts, signOut } from '@/lib/appwrite';
import AppEmptyState from '@/components/AppEmptyState';
import AppVideoCard from '@/components/AppVideoCard';
import TheInfoBox from '@/components/TheInfoBox';

import { useGlobalContext } from '@/context/GlobalProvider';

import { icons } from '@/constants';

export default function TheProfileTab() {
	const { user, setUser, isLoading, setIsLoggetIn } = useGlobalContext();

	const {
		data: posts,
		loading,
		refetch,
	} = useAppwrite(() => getUserPosts(user?.$id));

	// useEffect(() => {
	// 	refetch();
	// }, []);

	function onLogOut() {
		signOut();
		setUser(null);
		setIsLoggetIn(false);

		router.replace('/sing_in');
	}

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => (
					<AppVideoCard
						title={item.title}
						thumbnail={item.thumbnail}
						video={item.video}
						creator={item?.creator?.username ?? undefined}
						avatar={item?.creator?.avatar ?? undefined}
					/>
				)}
				ListHeaderComponent={() => (
					<View className="w-full justify-center items-center mt-3 mb-8 px-4">
						<View className="w-full items-end mb-4">
							{isLoading ? (
								<ActivityIndicator size="small" color="#FF9C01" />
							) : (
								<TouchableOpacity onPress={() => onLogOut()}>
									<Image
										source={icons.logout}
										className="w-7 h-7"
										resizeMode="contain"
									/>
								</TouchableOpacity>
							)}
						</View>

						<View
							className="w-16 
							h-16
						border-secondary border-2 
							rounded-lg 
							justify-center 
							items-center"
						>
							<Image
								source={{ uri: user?.avatar ?? '' }}
								className="w-[90%] h-[90%] rounded-[3px]"
								resizeMode="cover"
							/>
						</View>

						<Text className="text-white font-psemibold text-center mt-2">
							{user?.username}
						</Text>

						<View className="mt-3 flex-row">
							<TheInfoBox
								title={posts?.length || 0}
								subtitle="Posts"
								containerStyles="mr-10"
								titleStyles="text-xl"
							/>
							<TheInfoBox
								title={1.2}
								subtitle="Followers"
								titleStyles="text-xl"
							/>
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<View>
						{loading ? (
							<AppEmptyState
								title="No Videos Found"
								subtitle="No videos found for this search query"
							/>
						) : (
							<View>
								<ActivityIndicator size={72} color="#FF9C01" />
							</View>
						)}
					</View>
				)}
			/>
		</SafeAreaView>
	);
}
