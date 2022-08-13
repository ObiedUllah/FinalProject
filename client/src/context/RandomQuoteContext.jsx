import React, { createContext, useState } from "react";

export const RandomQuoteContext = createContext(null);

/**
 * Stores the data into context so that the useffect is not called everytime
 *  the user goes to home page but only once
 * @param {*} param0
 * @returns
 */
export const RandomQuoteProvider = ({ children }) => {
	const [quotes, setQuotes] = useState(() => null);

	const getQuotes = async () => {
		const data = await fetch(`https://animechan.vercel.app/api/quotes`).then((res) => res.json());
		setQuotes(data);
	};
	return (
		<RandomQuoteContext.Provider
			value={{
				quotes,
				actions: {
					getQuotes,
				},
			}}
		>
			{children}
		</RandomQuoteContext.Provider>
	);
};
