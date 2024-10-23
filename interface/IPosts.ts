export interface IPost {
	id: string;
	$id: string;
	thumbnail: string;
	video: string;
	creator?: {
		$id: string;
		username: string;
		avatar: string;
	};
	title: string;
	content: string;
}
