// since the api demo is rate limited I'll be loading 30 images at a time
// which is the max per page, and store those locally,
// load them lazily and once there's no more locally load the next 30
const host = "https://api.unsplash.com";
const ACCESS_KEY = "58iXCxxYluc1lS-Y9VAQULmJkNDwVKB6Fd7I5GWsJlw";
let page = 1;

/**
 *
 * @returns {Promise}
 */
export function getPage() {
	const paginationParams = new URLSearchParams({
		page: page++,
		per_page: 30,
	});
	const headers = new Headers({
		Authorization: `Client-ID ${ACCESS_KEY}`,
	});
	const url = `${host}/photos?${paginationParams.toString()}`;

	return fetch(url, { headers }).then((res) => res.json());
}
