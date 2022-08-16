import React, { createContext, useState } from "react";

export const PromosContext = createContext(null);

/**
 * Stores the data into context so that the useffect is not called everytime
 *  the user goes to promos page but only once
 * @param {*} param0
 * @returns
 */
export const PromosProvider = ({ children }) => {
	const [promos, setPromos] = useState(() => null);

	const getPromos = async () => {
		const response = await fetch(`https://api.jikan.moe/v4/watch/promos`);
		//if failure then refresh
		if (response.status === 429) getPromos();

		//if success then set data
		if (response.status === 200) {
			const data = await response.json();
			setPromos(data.data);
		}
	};
	return (
		<PromosContext.Provider
			value={{
				promos,
				actions: {
					getPromos,
				},
			}}
		>
			{children}
		</PromosContext.Provider>
	);
};
