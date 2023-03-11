const { importAnime } = require("./importAnime");
const { importGenres } = require("./importGenres");
const { importPromos } = require("./importPromos");
const { importRandomAnime } = require("./importRandomAnime");

//creates a delay that must happen since its in a promise
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//all the anime types and their jikan urls
const animeTypes = [
	{ type: "top", url: "https://api.jikan.moe/v4/anime?genres=27&order_by=score&sort=desc" },
	{ type: "recent", url: "https://api.jikan.moe/v4/top/anime?filter=airing&type=tv" },
	{ type: "popular", url: "https://api.jikan.moe/v4/top/anime?filter=bypopularity&type=tv" },
	{ type: "seasonal", url: "https://api.jikan.moe/v4/seasons/now" },
	{ type: "upcoming", url: "https://api.jikan.moe/v4/seasons/upcoming" },
];

//all the genre types and their jikan urls
const genreTypes = [
	{ type: "genres", url: "https://api.jikan.moe/v4/genres/anime?filter=genres" },
	{ type: "themes", url: "https://api.jikan.moe/v4/genres/anime?filter=themes" },
	{ type: "demographics", url: "https://api.jikan.moe/v4/genres/anime?filter=demographics" },
];

//calls all the import functions that will add the anime lists into the db
//delays after every call since the api only allows 3 calls per sec
(async () => {
	try {
		console.log("starting");

		//import all the animes
		for (const elem of animeTypes) {
			await importAnime(elem.url, elem.type);
			await delay(1000);
		}

		//import all the genres
		for (const elem of genreTypes) {
			await importGenres(elem.url, elem.type);
			await delay(1000);
		}

		//import the promos
		await importPromos("https://api.jikan.moe/v4/watch/promos", "promos");
		await delay(1000);

		//gets the ids and names
		const ids = [1, 2, 4, 8, 30, 27];
		const names = ["action", "adventure", "comedy", "drama", "sports", "shounen"];

		//goes through all the ids and fetches depending on the id
		for (const [index, elem] of ids.entries()) {
			await delay(1000);
			await importRandomAnime(`https://api.jikan.moe/v4/anime?genres=${elem}&order_by=score&sort=desc`, names[index]);
		}
	} finally {
		console.log("completed");
	}
})();
