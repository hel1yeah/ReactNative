import { Tabs, Redirect } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import React from 'react';
export default function TheTabsRootLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: 'Home',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'home' : 'home-outline'}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'profile',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'code-slash' : 'code-slash-outline'}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
