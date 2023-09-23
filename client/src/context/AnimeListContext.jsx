/* eslint-disable react-hooks/exhaustive-deps */

import { createContext, useEffect, useState } from "react";

import { getAnimeList } from "endpoints/apiConfig";

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

	//error checking
	const [error, setError] = useState(null);

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
		try {
			const response = await fetch(getAnimeList);

			//if success then set data
			if (response.status === 200) {
				const result = await response.json();
				setRandomGenreAnimes({ name: capitalizeFirstLetter(result.data.name) + " Anime", data: result.data.data });
			} else {
				throw new Error("An error occured! Refresh the page or Contact support");
			}
		} catch (error) {
			alert(error);
		}
	};

	/**
	 * gets the data of all the animes
	 */
	const getAllAnimes = async () => {
		try {
			const response = await fetch("/api/animes");
			const result = await response.json();

			//if success then set data
			if (result.status === 200) {
				setTopAnime(result.data["top"]);
				setRecentAnime(result.data["recent"]);
				setPopularAnime(result.data["popular"]);
				setSeasonalAnimes(result.data["seasonal"]);
				setUpcomingAnimes(result.data["upcoming"]);
			} else {
				throw new Error("An error occured! Refresh the page or Contact support");
			}
		} catch (error) {
			alert(error);
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
				error,
				setError,
			}}
		>
			{children}
		</AnimeListContext.Provider>
	);
};
