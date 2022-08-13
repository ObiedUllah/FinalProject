import React, { createContext, useState } from "react";

export const AnimeDetailsContext = createContext(null);

/**
 * stores the anime details information
 * @param {*} param0
 * @returns
 */
export const AnimeDetailsProvider = ({ children }) => {
	const [anime, setAnime] = useState(() => null);
	const [episodes, setEpisodes] = useState(() => null);
	const [recommendations, setRecommendations] = useState(() => null);
	const [selectedTheme, setSelectedTheme] = useState(() => null);

	const getAnime = async (id) => {
		if (!id) return;

		const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);

		//if failure then refresh after 2 sec
		if (response.status === 429)
			setTimeout(() => {
				getAnime();
			}, 1000);

		//if success then set data
		if (response.status === 200) {
			const data = await response.json();
			setAnime(data.data);
		}
	};

	const getEpisodes = async (id) => {
		if (!id) return;

		const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`);

		//if failure then refresh after 2 sec
		if (response.status === 429)
			setTimeout(() => {
				getEpisodes();
			}, 1000);

		//if success then set data
		if (response.status === 200) {
			const data = await response.json();
			setEpisodes(data.data);
		}
	};

	const getRecommendations = async (id, setLength) => {
		if (!id) return;

		const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);

		//if failure then refresh after 2 sec
		if (response.status === 429)
			setTimeout(() => {
				getRecommendations();
			}, 1000);

		//if success then set data
		if (response.status === 200) {
			const data = await response.json();

			//set length of anime slider
			data.data.length < 8 ? setLength(parseInt(data.data.length)) : setLength(8);
			setRecommendations(data.data);
		}
	};

	const getInitialTheme = async (anime) => {
		if (!anime) return;
		try {
			//if no opening or ending set to null
			if (anime?.theme.openings[0] === undefined && anime?.theme.endings[0] === undefined) {
				setSelectedTheme(null);
			}
			//if opening then set to opening
			else if (anime?.theme.openings[0] !== undefined) {
				const response = await fetch(`/api/video/${anime?.theme.openings[0] + " opening"}`);
				const result = await response.json();
				setSelectedTheme(result.data);
			}
			//if ending then set to ending
			else if (anime?.theme.endings[0] !== undefined) {
				const response = await fetch(`/api/video/${anime?.theme.endings[0] + " opening"}`);
				const result = await response.json();
				setSelectedTheme(result.data);
			}
		} catch (error) {
			setSelectedTheme(null);
		}
	};

	return (
		<AnimeDetailsContext.Provider
			value={{
				anime,
				episodes,
				recommendations,
				selectedTheme,
				actions: {
					getAnime,
					getEpisodes,
					getRecommendations,
					getInitialTheme,
					setSelectedTheme,
				},
			}}
		>
			{children}
		</AnimeDetailsContext.Provider>
	);
};
