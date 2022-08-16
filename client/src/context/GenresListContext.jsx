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

		//if failure then refresh
		if (response.status === 429) getGenres();

		//if success then set data
		if (response.status === 200) {
			const data = await response.json();
			setTopGenres(data.data.slice(0, 24));
		}
	};

	const getThemes = async () => {
		const response = await fetch(`https://api.jikan.moe/v4/genres/anime?filter=themes`);

		//if failure then refresh
		if (response.status === 429) getThemes();

		//if success then set data
		if (response.status === 200) {
			const data = await response.json();
			setThemesList(data.data.slice(0, 24));
		}
	};

	const getDemos = async () => {
		const response = await fetch(`https://api.jikan.moe/v4/genres/anime?filter=demographics`);

		//if failure then refresh
		if (response.status === 429) getDemos();

		//if success then set data
		if (response.status === 200) {
			const data = await response.json();
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
