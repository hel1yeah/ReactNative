import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Image,
} from 'react-native';
import { useState } from 'react';
import React from 'react';

import { icons } from '@/constants';

import { AppFormFieldEnum } from '@/constants/Enums/AppFormFieldEnum';

interface AppFormFieldProps {
	title: AppFormFieldEnum;
	value: string;
	placeholder: string;
	handlerChangeText: (e: string) => void;
	otherStyles?: string;
	keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

const TheSearchInput: React.FC<AppFormFieldProps> = ({
	title,
	value,
	placeholder,
	handlerChangeText,
	otherStyles,
	keyboardType = 'default',
	...props
}) => {
	const [isShowPassword, setIsShowPassword] = useState(false);

	return (
		<View className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
			<TextInput
				className="text-base mt-0.5 text-white flex-1 font-pregular"
				value={value}
				placeholder={placeholder}
				onChangeText={handlerChangeText}
				placeholderTextColor="#7b7b8b"
				secureTextEntry={isShowPassword}
			/>

			<TouchableOpacity onPress={() => setIsShowPassword(!isShowPassword)}>
				<Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
			</TouchableOpacity>
		</View>
	);
};

export default TheSearchInput;
