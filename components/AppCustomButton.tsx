import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	GestureResponderEvent,
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
			className={`bg-secondary-100 rounded-xl min-h-[48px] min-w-[80px] max-w-xxl justify-center items-center w-full p-3 ${containerStyle} ${
				isLoading ? 'opacity-50' : ''
			}`}
			disabled={isLoading}
		>
			<Text className={`text-primary-100 font-psemibold text-lg ${textStyles}`}>
				{isLoading}
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default AppCustomButton;

const styles = StyleSheet.create({});
