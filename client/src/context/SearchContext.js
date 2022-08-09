import { createContext, useState } from "react";

export const SearchContext = createContext(null);

const SearchProvider = ({ children }) => {
	const [animeList, setAnimeList] = useState(() => null);
	return (
		<SearchContext.Provider
			value={{
				animeList,
				actions: {
					setAnimeList,
				},
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};

export default SearchProvider;
