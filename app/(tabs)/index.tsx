import { Text, View } from 'react-native';
import { Link as Link } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';

export default function HomeScreen() {
	return (
		<View className="flex-1 items-center justify-center bg-white">
			<Text className="text-3xl font-pblack">Welcome!</Text>
			<HelloWave />
			<Link href="/profile">
				<Text>Go to home screen!</Text>
			</Link>
		</View>
	);
}
