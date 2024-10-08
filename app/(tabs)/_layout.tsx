import { Tabs, Redirect } from 'expo-router';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import React from 'react';

import icons from '../../constants/icons';

type TabIconProps = {
	icon: ImageSourcePropType;
	color: string;
	name: string;
	focused: boolean;
};

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
	return (
		<View className="justify-center items-center gap-2">
			<Image
				source={icon}
				resizeMode="contain"
				tintColor={color}
				className="w-6 h-6"
			/>
			<Text
				className={`${focused ? 'font-psemibold' : 'font-pregular'} text-sx`}
				style={{ color }}
			>
				{name}
			</Text>
		</View>
	);
};

export default function TheTabsRootLayout() {
	return (
		<>
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarActiveTintColor: '#FFA001',
					tabBarInactiveTintColor: '#CDCDE0',
					tabBarStyle: {
						backgroundColor: '#161622',
						borderTopWidth: 1,
						borderTopColor: '#232533',
						height: 90,
					},
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						title: 'Home',
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.home}
								color={color}
								name={'Home'}
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="bookmark"
					options={{
						title: 'Bookmark',
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.bookmark}
								color={color}
								name={'Bookmark'}
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="create"
					options={{
						title: 'Create',
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.plus}
								color={color}
								name={'Create'}
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: 'Profile',
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.profile}
								color={color}
								name={'Profile'}
								focused={focused}
							/>
						),
					}}
				/>
			</Tabs>
		</>
	);
}
