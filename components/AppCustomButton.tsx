import {
	GestureResponderEvent,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import React from 'react';

// Типізуємо пропси
interface AppCustomButtonProps {
	title: string; // Назва кнопки
	handlePress: (event: GestureResponderEvent) => void; // Обробник кліку
	containerStyle?: string; // Необов'язковий стиль для контейнера
	textStyles?: string; // Необов'язковий стиль для тексту
	isLoading?: boolean; // Необов'язковий прапорець для завантаження
}

const AppCustomButton: React.FC<AppCustomButtonProps> = ({
	title,
	handlePress,
	containerStyle,
	textStyles,
	isLoading,
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.8}
			className={`bg-secondary-100 rounded-xl min-h-[48px] min-w-[80px] max-w-xxl justify-center items-center flex-row w-full p-3 ${containerStyle} ${
				isLoading ? 'opacity-50' : ''
			}`}
			disabled={isLoading}
		>
			{isLoading ? <ActivityIndicator size="small" color="black" /> : ''}
			<Text className={`text-primary-100 font-psemibold text-lg ${textStyles}`}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default AppCustomButton;

const styles = StyleSheet.create({});
