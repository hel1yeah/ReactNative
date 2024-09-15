import { Image, Text, View } from 'react-native';
import { Tabs, Redirect } from 'expo-router';

import icons from '../../constants/icons';
import { ENames } from '../../constants/tabs/names';
import { ELinks } from '../../constants/tabs/links';
import { ImageSourcePropType } from 'react-native/';

interface ITabIcon {
	icon: ImageSourcePropType | undefined;
	color: string;
	name: string;
	focused: boolean;
}
const TabIcon = ({ icon, color, name, focused }: ITabIcon): JSX.Element => {
	const semibold = 'font-psemibold';
	const pregular = 'font-pregular';
	return (
		<View className="flex-col items-center gap-1">
			<Image
				source={icon}
				resizeMode="contain"
				tintColor={color}
				className="w-6 h-6"
			/>
			<Text className={`${focused ? semibold : pregular}`}>{name}</Text>
		</View>
	);
};

const RootTabsLayout = () => {
	return (
		<>
			<Tabs screenOptions={{ tabBarShowLabel: false }}>
				<Tabs.Screen
					name={ELinks.home}
					options={{
						title: ENames.home,
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.home as ImageSourcePropType}
								color={color}
								name={ENames.home}
								focused={focused}
							/>
						),
					}}
				/>
			</Tabs>
		</>
	);
};

export default RootTabsLayout;
