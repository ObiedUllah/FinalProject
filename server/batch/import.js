const { importAnime } = require("./importAnime");
const { importGenres } = require("./importGenres");
const { importPromos } = require("./importPromos");
const { importRandomAnime } = require("./importRandomAnime");

//mongo client and database name
const { client } = require("../utils/mongo.js");

//calls all the functions and waits a few seconds to allow api to fetch
//only 3 calls per second for this api
(async () => {
	try {
		await importPromos("https://api.jikan.moe/v4/watch/promos", "promos");
		await importGenres("https://api.jikan.moe/v4/genres/anime?filter=genres", "genres");
		await importGenres("https://api.jikan.moe/v4/genres/anime?filter=themes", "themes");
		setTimeout(() => {
			console.log("...loading");
		}, 1500);
		await importGenres("https://api.jikan.moe/v4/genres/anime?filter=demographics", "demographics");
		await importAnime("https://api.jikan.moe/v4/top/anime?type=tv", "top");
		await importAnime("https://api.jikan.moe/v4/top/anime?filter=airing&type=tv", "recent");

		setTimeout(() => {
			console.log("...still loading");
		}, 1500);
		await importAnime("https://api.jikan.moe/v4/top/anime?filter=bypopularity&type=tv", "popular");
		await importAnime("https://api.jikan.moe/v4/seasons/upcoming", "upcoming");
		await importAnime("https://api.jikan.moe/v4/seasons/now", "seasonal");

		setTimeout(() => {
			console.log("...still loading");
		}, 1500);

		//get the ids and names
		const ids = [1, 2, 4, 8, 30, 27];
		const names = ["action", "adventure", "comedy", "drama", "sports", "shounen"];

		//go through all ids
		for (const [index, elem] of ids.entries()) {
			//after doing 3, api calls, setTimeout
			if ((index + 1) % 3 === 0) {
				setTimeout(() => {
					console.log("...still loading in loop");
				}, 1000);
			}
			await importRandomAnime(`https://api.jikan.moe/v4/anime?genres=${elem}&order_by=score&sort=desc`, names[index]);
		}
	} finally {
		console.log("completed");
		client.close();
	}
})();
