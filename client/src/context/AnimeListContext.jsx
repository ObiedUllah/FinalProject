import React, { createContext, useState } from "react";

export const AnimeListContext = createContext(null);

/**
 * Stores the data into context so that the useffect is not called everytime the user goes to home page but only once
 * @param {*} param0
 * @returns
 */
export const AnimeListProvider = ({ children }) => {
	const [topAnime, setTopAnime] = useState(() => null);
	const [recentAnime, setRecentAnime] = useState(() => null);
	const [popularAnime, setPopularAnime] = useState(() => null);

	const setTop = () => {
		const getTopAnime = async () => {
			const animeList = await fetch(`https://api.jikan.moe/v4/top/anime`).then((res) => res.json());
			setTopAnime(animeList.data.slice(0, 24));
		};
		getTopAnime();
	};

	const setRecent = () => {
		const getRecentAnime = async () => {
			const animeList = await fetch(`https://api.jikan.moe/v4/watch/episodes`).then((res) => res.json());
			setRecentAnime(animeList.data.slice(0, 30));
		};
		getRecentAnime();
	};

	const setPopular = () => {
		const getPopularAnime = async () => {
			const animeList = await fetch(`https://api.jikan.moe/v4/watch/episodes/popular`).then((res) => res.json());
			setPopularAnime(animeList.data.slice(0, 30));
		};
		getPopularAnime();
	};

	return (
		<AnimeListContext.Provider
			value={{
				topAnime,
				recentAnime,
				popularAnime,
				actions: {
					setTop,
					setRecent,
					setPopular,
				},
			}}
		>
			{children}
		</AnimeListContext.Provider>
	);
};
