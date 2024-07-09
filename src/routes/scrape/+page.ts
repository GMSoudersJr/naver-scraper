import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	const searchParams = url.searchParams.get('searchNaverFor');
	
	const response = await fetch('/api/scrapeNaver', {
		method: 'POST',
		body: JSON.stringify(searchParams),
	});


	return {
		title: `Links for ${searchParams}`,
		links: await response.json(),
		searchedFor: searchParams,
	}

}
