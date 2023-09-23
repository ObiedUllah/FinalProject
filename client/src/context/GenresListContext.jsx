import { createContext, useState } from "react";

import { getGenresList } from "endpoints/apiConfig";

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

	/**
	 * Gets the data from the database and sets the states
	 */
	const getGenres = async () => {
		try {
			const response = await fetch(getGenresList);

			//if success then set data
			if (response.status === 200) {
				const result = await response.json();

				setTopGenres(result.data["genres"]);
				setThemesList(result.data["themes"]);
				setDemoGraphicsList(result.data["demographics"]);
			} else {
				throw new Error("An error occured! Refresh the page or Contact support");
			}
		} catch (error) {
			alert(error);
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
				},
			}}
		>
			{children}
		</GenresListContext.Provider>
	);
};
