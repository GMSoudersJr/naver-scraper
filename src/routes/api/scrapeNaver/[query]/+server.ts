import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { scrapeNaver } from '$lib';

export const GET: RequestHandler = async ({ request, params }) => {
	const queryTerm = params.query;
	const links = await scrapeNaver(queryTerm);

	return json(links);
};
