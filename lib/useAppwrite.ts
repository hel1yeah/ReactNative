import { Alert } from 'react-native';
import { useEffect, useState } from 'react';

type AsyncFunction<T> = () => Promise<T | null>;

const useAppwrite = <T>(fn: AsyncFunction<T>) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await fn();
			if (res) {
				setData(res);
			} else {
				Alert.alert('Error', 'No document found');
			}
		} catch (error: any) {
			Alert.alert('Error', error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const refetch = () => fetchData();

	return { data, loading, refetch };
};

export default useAppwrite;
