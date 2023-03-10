const { importAnime } = require("./importAnime");
const { importGenres } = require("./importGenres");
const { importPromos } = require("./importPromos");
const { importRandomAnime } = require("./importRandomAnime");

//mongo client and database name
const { client } = require("../utils/mongo.js");

(async () => {
	try {
		await importPromos("https://api.jikan.moe/v4/watch/promos", "promos");
		await importGenres("https://api.jikan.moe/v4/genres/anime?filter=genres", "genres");
		await importGenres("https://api.jikan.moe/v4/genres/anime?filter=themes", "themes");
		setTimeout(() => {
			console.log("loading");
		}, 1500);
		await importGenres("https://api.jikan.moe/v4/genres/anime?filter=demographics", "demographics");
		await importAnime("https://api.jikan.moe/v4/top/anime?type=tv", "topAnime");
		await importAnime("https://api.jikan.moe/v4/top/anime?filter=airing&type=tv", "recentAnime");

		setTimeout(() => {
			console.log("still loading");
		}, 1500);
		await importAnime("https://api.jikan.moe/v4/top/anime?filter=bypopularity&type=tv", "popularAnime");
		await importAnime("https://api.jikan.moe/v4/seasons/upcoming", "upcomingAnime");
		await importAnime("https://api.jikan.moe/v4/seasons/now", "seasonalAnime");

		setTimeout(() => {
			console.log("still loading");
		}, 1500);

		const ids = [1, 2, 4, 8, 30, 27];
		const names = ["Action", "Adventure", "Comedy", "Drama", "Sports", "Shounen"];

		for (const [index, elem] of ids.entries()) {
			if (index % 3 == 0) {
				setTimeout(() => {
					console.log("still loading in loop");
				}, 1000);
			}
			const name = names[index];
			await importRandomAnime(`https://api.jikan.moe/v4/anime?genres=${elem}&order_by=score&sort=desc`, name);
		}
	} finally {
		console.log("completed");
		client.close();
	}
})();
