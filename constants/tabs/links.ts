export const ELinks = {
	bookmark: 'bookmark' as const,
	home: 'home' as const,
	create: 'create' as const,
	profile: 'profile' as const,
} as const;

export type ELinks = (typeof ELinks)[keyof typeof ELinks];
