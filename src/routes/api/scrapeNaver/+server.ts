import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { scrapeNaver } from '$lib';

export const POST: RequestHandler = async ({ request }) => {
	const queryTerm = await request.json();
	const links = await scrapeNaver(queryTerm);

	return json(links);
};
