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

const AppFormField: React.FC<AppFormFieldProps> = ({
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
		<View className={`space-y-2 ${otherStyles}`}>
			<Text className="text-base text-green-100 font-pmedium">{title}</Text>
			<View className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
				<TextInput
					className="flex-1 text-white font-psemibold border-black-500"
					value={value}
					placeholder={placeholder}
					onChangeText={handlerChangeText}
					placeholderTextColor="#7b7b8b"
					secureTextEntry={isShowPassword}
				/>

				{title === AppFormFieldEnum.PASSWORD && (
					<TouchableOpacity onPress={() => setIsShowPassword(!isShowPassword)}>
						<Image
							source={isShowPassword ? icons.eyeHide : icons.eye}
							className="w-6 h-6"
							resizeMode="contain"
						></Image>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default AppFormField;
