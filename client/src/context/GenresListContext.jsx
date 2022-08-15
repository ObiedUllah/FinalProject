import React, { createContext, useState } from "react";

export const GenresListContext = createContext(null);

/**
 * Stores the genres into context so that the useffect is not called everytime
 * the user goes to home page but only once
 * @param {*} param0
 * @returns
 */
export const GenresListProvider = ({ children }) => {
	const [genresList, setTopGenres] = useState(() => null);
	const [themesList, setThemesList] = useState(() => null);
	const [demographicsList, setDemoGraphicsList] = useState(() => null);

	const getGenres = async () => {
		const response = await fetch(`https://api.jikan.moe/v4/genres/anime?filter=genres`);

		//if failure then refresh after 1 sec
		if (response.status === 429)
			setTimeout(() => {
				getGenres();
			}, 1000);

		//if success then set data
		if (response.status === 200) {
			const data = await response.json();
			console.log(data.data);
			setTopGenres(data.data.slice(0, 24));
		}
	};

	const getThemes = async () => {
		const response = await fetch(`https://api.jikan.moe/v4/genres/anime?filter=themes`);

		//if failure then refresh after 1 sec
		if (response.status === 429)
			setTimeout(() => {
				getThemes();
			}, 1000);

		//if success then set data
		if (response.status === 200) {
			const data = await response.json();
			console.log(data.data);
			setThemesList(data.data.slice(0, 24));
		}
	};

	const getDemos = async () => {
		const response = await fetch(`https://api.jikan.moe/v4/genres/anime?filter=demographics`);

		//if failure then refresh after 1 sec
		if (response.status === 429)
			setTimeout(() => {
				getDemos();
			}, 1000);

		//if success then set data
		if (response.status === 200) {
			const data = await response.json();
			console.log(data.data);
			setDemoGraphicsList(data.data.slice(0, 24));
		}
	};

	return (
		<GenresListContext.Provider
			value={{
				genresList,
				themesList,
				demographicsList,
				actions: {
					getGenres,
					getThemes,
					getDemos,
				},
			}}
		>
			{children}
		</GenresListContext.Provider>
	);
};
