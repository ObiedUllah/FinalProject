import { createContext, useState } from "react";

export const DetailsContext = createContext(null);

const DetailsProvider = ({ children }) => {
	const [id, setId] = useState(() => null);
	const [animeTheme, setAnimeTheme] = useState(() => null);
	const [anime, setAnime] = useState(() => null);
	return (
		<DetailsContext.Provider
			value={{
				id,
				anime,
				animeTheme,
				actions: {
					setId,
					setAnime,
					setAnimeTheme,
				},
			}}
		>
			{children}
		</DetailsContext.Provider>
	);
};

export default DetailsProvider;
