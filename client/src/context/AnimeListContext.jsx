/* eslint-disable react-hooks/exhaustive-deps */

import { createContext, useEffect, useState } from "react";

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

	//fetches data on mount of application
	useEffect(() => {
		if (!topAnimes || !recentAnimes || !popularAnimes || !seasonalAnimes || !upcomingAnimes) {
			getAllAnimes();
		}

		if (!randomGenreAnimes) {
			getRandomGenreAnimes();
		}
	}, []);

	/**
	 * helper function to make a string have a capital letter in the beginning
	 * @param {*} string
	 * @returns
	 */
	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	/**
	 * gets a random category and all its anime from the database
	 */
	const getRandomGenreAnimes = async () => {
		const response = await fetch(`/api/animes/random`);
		const result = await response.json();

		//if success then set data
		if (result.status === 200) {
			setRandomGenreAnimes({ name: capitalizeFirstLetter(result.data.name) + " Anime", data: result.data.data });
		}

		if (result.status === 500) {
			alert("An error occured! Refresh the page or Contact support");
		}
	};

	/**
	 * gets the data of all the animes
	 */
	const getAllAnimes = async () => {
		const response = await fetch("/api/animes");
		const result = await response.json();

		//if success then set data
		if (result.status === 200) {
			setTopAnime(result.data["top"]);
			setRecentAnime(result.data["recent"]);
			setPopularAnime(result.data["popular"]);
			setSeasonalAnimes(result.data["seasonal"]);
			setUpcomingAnimes(result.data["upcoming"]);
		}

		if (result.status === 500) {
			alert("An error occured! Refresh the page or Contact support");
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
			}}
		>
			{children}
		</AnimeListContext.Provider>
	);
};
