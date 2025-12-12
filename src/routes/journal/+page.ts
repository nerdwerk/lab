import type { PageLoad } from './$types';

type PostMetadata = {
	title: string;
	date: string;
	summary: string;
	[key: string]: unknown;
};

export const load: PageLoad = async () => {
	const modules = import.meta.glob('./*/+page.md');

	const posts = await Promise.all(
		Object.entries(modules).map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as { metadata: PostMetadata };

			const slug = path.split('/')[1];

			return {
				slug,
				...metadata
			};
		})
	);

	posts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	return {
		posts
	};
};
