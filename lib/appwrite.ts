import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
	Storage,
} from 'react-native-appwrite';

export const config = {
	endpoint: 'https://cloud.appwrite.io/v1',
	platform: 'com.packagehel1yeah.aoraapp',
	projectId: '670d0c6a002556b2df8f',
	databaseId: '670d0e530025a364da5f',
	usersCollectionId: '670d0ea0002cd72ec156',
	videosCollectionId: '670d0eec001a7012a346',
	storageId: '670d316c0028dc92ed2c',
};

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
		const userId = (ID.unique() + ID.unique()).slice(0, 36);
		console.log('Generated userId:', userId, userId.length);

		const newAccount = await account.create(userId, email, password, username);

		if (!newAccount) throw Error;

		const avatarUrl = avatars.getInitials(username);

		await signIn(email, password);

		const newUser = await databases.createDocument(
			config.databaseId,
			config.usersCollectionId,
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

		return session;
	} catch (error: any) {
		throw new Error(error);
	}
}

// Upload File
export async function uploadFile(file: any, type: string) {
	if (!file) return;

	const { mimeType, ...rest } = file;
	const asset = { type: mimeType, ...rest };

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
				'top',
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
			config.databaseId,
			config.videosCollectionId,
			ID.unique(),
			{
				title: form.title,
				thumbnail: thumbnailUrl,
				video: videoUrl,
				prompt: form.prompt,
				creator: form.userId,
			}
		);

		return newPost;
	} catch (error: any) {
		throw new Error(error);
	}
}

// Get all video Posts
export async function getAllPosts() {
	try {
		const posts = await databases.listDocuments(
			config.databaseId,
			config.videosCollectionId
		);

		return posts.documents;
	} catch (error: any) {
		throw new Error(error);
	}
}

// Get video posts created by user
export async function getUserPosts(userId: string) {
	try {
		const posts = await databases.listDocuments(
			config.databaseId,
			config.videosCollectionId,
			[Query.equal('creator', userId)]
		);

		return posts.documents;
	} catch (error: any) {
		throw new Error(error);
	}
}

// Get video posts that matches search query
export async function searchPosts(query: string) {
	try {
		const posts = await databases.listDocuments(
			config.databaseId,
			config.videosCollectionId,
			[Query.search('title', query)]
		);

		if (!posts) throw new Error('Something went wrong');

		return posts.documents;
	} catch (error: any) {
		throw new Error(error);
	}
}

// Get latest created video posts
export async function getLatestPosts() {
	try {
		const posts = await databases.listDocuments(
			config.databaseId,
			config.videosCollectionId,
			[Query.orderDesc('$createdAt'), Query.limit(7)]
		);

		return posts.documents;
	} catch (error: any) {
		throw new Error(error);
	}
}
