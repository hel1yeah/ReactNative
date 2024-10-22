import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Image,
	Alert,
} from 'react-native';
import { useState } from 'react';
import React from 'react';

import { icons } from '@/constants';

import { AppFormFieldEnum } from '@/constants/Enums/AppFormFieldEnum';

import { usePathname, router } from 'expo-router';

interface AppFormFieldProps {
	title: AppFormFieldEnum;
	value?: string;
	initialQuery?: string;
	placeholder: string;
	handlerChangeText: (e: string) => void;
	otherStyles?: string;
	keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

const TheSearchInput: React.FC<AppFormFieldProps> = ({ initialQuery }) => {
	// const [isShowPassword, setIsShowPassword] = useState(false);
	const pathname = usePathname();

	const [query, setQuery] = useState(initialQuery || '');

	const onChecked = () => {
		if (!query) {
			return Alert.alert(
				'Missing query',
				'Please input something to search result across all posts'
			);
		}

		if (pathname.startsWith('/search')) router.setParams({ query });
		else router.push(`/search/${query}`);
	};
	return (
		<View className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
			<TextInput
				className="text-base mt-0.5 text-white flex-1 font-pregular"
				value={query}
				placeholder="Search"
				onChangeText={(e) => setQuery(e)}
				placeholderTextColor="#cdcde0"
			/>

			<TouchableOpacity
				onPress={() => {
					if (query === '')
						return Alert.alert(
							'Missing Query',
							'Please input something to search results across database'
						);

					if (pathname.startsWith('/search')) router.setParams({ query });
					else router.push(`/search/${query}`);
				}}
			>
				<Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
			</TouchableOpacity>
		</View>
	);
};

export default TheSearchInput;
