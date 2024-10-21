import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { getCurrentUser } from '@/lib/appwrite';

// Інтерфейс для значень контексту
interface GlobalContextType {
	isLoggetIn: boolean;
	setIsLoggetIn: React.Dispatch<React.SetStateAction<boolean>>;
	user: any; // Замість 'any' можна поставити тип користувача, якщо він є.
	setUser: React.Dispatch<React.SetStateAction<any>>;
	isLoading: boolean;
}

// Створення контексту з початковим значенням null
const GlobalContext = createContext<GlobalContextType | null>(null);

// Хук для використання контексту
export const useGlobalContext = () => {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error('useGlobalContext must be used within a GlobalProvider');
	}
	return context;
};

// Тип для компонентів, які передаються в провайдер
interface GlobalProviderProps {
	children: ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
	const [isLoggetIn, setIsLoggetIn] = useState<boolean>(false);
	const [user, setUser] = useState<any>(null); // Замість 'any' можна типізувати відповідно до API.
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		getCurrentUser()
			.then((result) => {
				if (result) {
					setIsLoggetIn(true);
					setUser(result);
				} else {
					setIsLoggetIn(false);
					setUser(null);
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				isLoggetIn,
				setIsLoggetIn,
				user,
				setUser,
				isLoading,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
