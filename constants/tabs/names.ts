export const ENames = {
	bookmark: 'Bookmark' as const,
	home: 'Home' as const,
	create: 'Create' as const,
	profile: 'Profile' as const,
} as const;

export type ENames = (typeof ENames)[keyof typeof ENames];
