import { createContext, useState } from "react";

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
		const response = await fetch("/api/genres");
		const result = await response.json();

		//if success then set data
		if (result.status === 200) {
			setTopGenres(result.data["genres"]);
			setThemesList(result.data["themes"]);
			setDemoGraphicsList(result.data["demographics"]);
		}

		if (result.status === 500) {
			alert("An error occured! Refresh the page or Contact support");
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
