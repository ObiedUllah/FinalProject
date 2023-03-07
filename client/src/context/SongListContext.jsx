import React, { createContext, useState } from "react";

export const SongListContext = createContext(null);

export const SongListProvider = ({ children }) => {
	const [widgets, setWidgets] = useState(() => []);

	return (
		<SongListContext.Provider
			value={{
				widgets,
				actions: {
					setWidgets,
				},
			}}
		>
			{children}
		</SongListContext.Provider>
	);
};
