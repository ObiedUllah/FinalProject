import React, { createContext, useState } from "react";

export const AnimeListContext = createContext(null);

/**
 * Stores the lists into context so that the useffect is not called everytime
 * the user goes to home page but only once
 * @param {*} param0
 * @returns
 */
export const AnimeListProvider = ({ children }) => {
	const [topAnime, setTopAnime] = useState(() => null);
	const [recentAnime, setRecentAnime] = useState(() => null);
	const [popularAnime, setPopularAnime] = useState(() => null);
	const [shonenAnime, setShonenAnime] = useState(() => null);

	const getTopAnimes = async () => {
		const response = await fetch(`https://api.jikan.moe/v4/top/anime`);

		//if failure then refresh after 1 sec
		if (response.status === 429)
			setTimeout(() => {
				getTopAnimes();
			}, 1000);

		//if success then set data
		if (response.status === 200) {
			const data = await response.json();
			setTopAnime(data.data.slice(0, 24));
		}
	};

	const getRecentAnimes = async () => {
		const response = await fetch(`https://api.jikan.moe/v4/watch/episodes`);

		//if failure then refresh after 1 sec
		if (response.status === 429)
			setTimeout(() => {
				getRecentAnimes();
			}, 1000);

		//if success then set data
		if (response.status === 200) {
			const data = await response.json();
			console.log(data);
			setRecentAnime(data.data.slice(0, 30));
		}
	};

	const getPopularAnimes = async () => {
		const response = await fetch(`https://api.jikan.moe/v4/watch/episodes/popular`);

		//if failure then refresh after 1 sec
		if (response.status === 429)
			setTimeout(() => {
				getPopularAnimes();
			}, 1000);

		//if success then set data
		if (response.status === 200) {
			const data = await response.json();
			setPopularAnime(data.data.slice(0, 30));
		}
	};

	const getShonenAnimes = async () => {
		const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${27}&order_by=score&sort=desc`);

		//if failure then refresh after 1 sec
		if (response.status === 429)
			setTimeout(() => {
				getShonenAnimes();
			}, 1500);

		//if success then set data
		if (response.status === 200) {
			const data = await response.json();
			setShonenAnime(data.data.slice(0, 24));
		}
	};

	return (
		<AnimeListContext.Provider
			value={{
				topAnime,
				recentAnime,
				popularAnime,
				shonenAnime,
				actions: {
					getTopAnimes,
					getRecentAnimes,
					getPopularAnimes,
					getShonenAnimes,
				},
			}}
		>
			{children}
		</AnimeListContext.Provider>
	);
};
