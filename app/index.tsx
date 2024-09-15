// import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';

const TheApp = () => {
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Text>Index</Text>
			<Link href="/home">Home</Link>
		</View>
	);
};

export default TheApp;
