import React, { createContext, useState } from "react";

export const AnimeListContext = createContext(null);

/**
 * Stores the lists into context so that the useffect is not called everytime
 * the user goes to home page but only once
 * @param {*} param0
 * @returns
 */
export const AnimeListProvider = ({ children }) => {
	const [topAnimes, setTopAnime] = useState(() => null);
	const [recentAnimes, setRecentAnime] = useState(() => null);
	const [popularAnimes, setPopularAnime] = useState(() => null);
	const [randomGenreAnimes, setRandomGenreAnimes] = useState(() => null);
	const [seasonalAnimes, setSeasonalAnimes] = useState(() => null);
	const [upcomingAnimes, setUpcomingAnimes] = useState(() => null);

	const getTopAnimes = async () => {
		getData(`https://api.jikan.moe/v4/top/anime?type=tv`, getTopAnimes, setTopAnime);
	};

	const getRecentAnimes = async () => {
		getData(`https://api.jikan.moe/v4/top/anime?filter=airing&type=tv`, getRecentAnimes, setRecentAnime);
	};

	const getPopularAnimes = async () => {
		getData(`https://api.jikan.moe/v4/top/anime?filter=bypopularity&type=tv`, getPopularAnimes, setPopularAnime);
	};

	const getRandomGenreAnimes = async () => {
		//get random genre
		const ids = [1, 2, 4, 8, 30, 27];
		const names = ["Action", "Adventure", "Comedy", "Drama", "Sports", "Shounen"].map((item) => item + " Anime");
		const num = Math.floor(Math.random() * ids.length);

		const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${ids[num]}&order_by=score&sort=desc`);

		//if failure then refresh
		if (response.status === 429) getRandomGenreAnimes();

		//if success then set data
		if (response.status === 200) {
			const data = await response.json();
			setRandomGenreAnimes({ name: names[num], data: data.data.slice(0, 24) });
		}
	};

	const getSeasonalAnimes = async () => {
		getData(`https://api.jikan.moe/v4/seasons/now`, getSeasonalAnimes, setSeasonalAnimes);
	};

	const getUpcomingAnimes = async () => {
		getData(`https://api.jikan.moe/v4/seasons/upcoming`, getUpcomingAnimes, setUpcomingAnimes);
	};

	const getData = async (url, getFunc, setFunc) => {
		const response = await fetch(url);
		//if failure then refresh
		if (response.status === 429) getFunc();

		//if success then set data
		if (response.status === 200) {
			const data = await response.json();
			setFunc(data.data.slice(0, 24));
		}
	};

	return (
		<AnimeListContext.Provider
			value={{
				topAnimes,
				recentAnimes,
				popularAnimes,
				randomGenreAnimes,
				seasonalAnimes,
				upcomingAnimes,
				actions: {
					getTopAnimes,
					getRecentAnimes,
					getPopularAnimes,
					getRandomGenreAnimes,
					getSeasonalAnimes,
					getUpcomingAnimes,
				},
			}}
		>
			{children}
		</AnimeListContext.Provider>
	);
};
