import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
	Storage,
	ImageGravity,
} from 'react-native-appwrite';

import * as ImagePicker from 'expo-image-picker';
import { IPost } from '@/interface/IPosts';

export const config = {
	endpoint: 'https://cloud.appwrite.io/v1',
	platform: 'com.packagehel1yeah.aoraapp',
	projectId: '670d0c6a002556b2df8f',
	databaseId: '670d0e530025a364da5f',
	usersCollectionId: '670d0ea0002cd72ec156',
	videosCollectionId: '670d0eec001a7012a346',
	storageId: '670d316c0028dc92ed2c',
};

const {
	endpoint,
	platform,
	projectId,
	databaseId,
	usersCollectionId,
	videosCollectionId,
	storageId,
} = config;

const client = new Client();

client
	.setEndpoint(config.endpoint)
	.setProject(config.projectId)
	.setPlatform(config.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function registerUser(
	email: string,
	password: string,
	username: string
) {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		);

		if (!newAccount) throw Error;

		const avatarUrl = avatars.getInitials(username);

		await signIn(email, password);

		const newUser = await databases.createDocument(
			databaseId,
			usersCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email: email,
				username: username,
				avatar: avatarUrl,
			}
		);

		return newUser;
	} catch (error: any) {
		throw new Error(error);
	}
}

// Sign In
export async function signIn(email: string, password: string) {
	try {
		const session = await account.createEmailPasswordSession(email, password);
		return session;
	} catch (error: any) {
		throw new Error(error);
	}
}

// Get Account
export async function getAccount() {
	try {
		const currentAccount = await account.get();
		return currentAccount;
	} catch (error: any) {
		throw new Error(error);
	}
}

// Get Current User
export async function getCurrentUser() {
	try {
		const currentAccount = await getAccount();
		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(
			config.databaseId,
			config.usersCollectionId,
			[Query.equal('accountId', currentAccount.$id)]
		);

		if (!currentUser) throw Error;

		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
		return null;
	}
}

// Sign Out
export async function signOut() {
	try {
		const session = await account.deleteSession('current');

		console.log(session);

		return session;
	} catch (error: any) {
		throw new Error(error);
	}
}

// Upload File
export async function uploadFile(
	file: ImagePicker.ImagePickerAsset,
	type: string
) {
	if (!file) return;

	const asset = {
		name: file.fileName as string,
		type: file.mimeType as string,
		size: file.fileSize as number,
		uri: file.uri as string,
	};

	try {
		const uploadedFile = await storage.createFile(
			config.storageId,
			ID.unique(),
			asset
		);

		const fileUrl = await getFilePreview(uploadedFile.$id, type);
		return fileUrl;
	} catch (error: any) {
		throw new Error(error);
	}
}

// Get File Preview
export async function getFilePreview(fileId: string, type: string) {
	let fileUrl;

	try {
		if (type === 'video') {
			fileUrl = storage.getFileView(config.storageId, fileId);
		} else if (type === 'image') {
			fileUrl = storage.getFilePreview(
				config.storageId,
				fileId,
				2000,
				2000,
				ImageGravity.Top,
				100
			);
		} else {
			throw new Error('Invalid file type');
		}

		if (!fileUrl) throw Error;

		return fileUrl;
	} catch (error: any) {
		throw new Error(error);
	}
}

// Create Video Post
export async function createVideoPost(form: any) {
	try {
		const [thumbnailUrl, videoUrl] = await Promise.all([
			uploadFile(form.thumbnail, 'image'),
			uploadFile(form.video, 'video'),
		]);

		const newPost = await databases.createDocument(
			databaseId,
			videosCollectionId,
			ID.unique(),
			{
				title: form.title,
				thumbnail: thumbnailUrl,
				video: videoUrl,
				promt: form.prompt,
				creator: form.userId,
			}
		);

		return newPost;
	} catch (error: any) {
		throw new Error(error);
	}
}

// Get all video Posts
export async function getAllPosts(): Promise<IPost[]> {
	try {
		const posts = await databases.listDocuments(databaseId, videosCollectionId);

		// @ts-ignore
		return posts.documents;
	} catch (error: any) {
		throw new Error(error);
	}
}

// Get video posts created by user
export async function getUserPosts(userId: string): Promise<IPost[]> {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			videosCollectionId,
			[Query.equal('creator', userId)]
		);
		// @ts-ignore
		return posts.documents;
	} catch (error: any) {
		throw new Error(error);
	}
}

// Get video posts that matches search query
export async function searchPosts(query: string): Promise<IPost[]> {
	try {
		const posts = await databases.listDocuments(
			config.databaseId,
			config.videosCollectionId,
			[Query.search('title', query)]
		);

		if (!posts) throw new Error('Something went wrong');
		// @ts-ignore
		return posts.documents;
	} catch (error: any) {
		throw new Error(error);
	}
}

// Get latest created video posts
export async function getLatestPosts(): Promise<IPost[]> {
	try {
		const posts = await databases.listDocuments(
			config.databaseId,
			config.videosCollectionId,
			[Query.orderDesc('$createdAt'), Query.limit(7)]
		);
		// @ts-ignore
		return posts.documents;
	} catch (error: any) {
		throw new Error(error);
	}
}
