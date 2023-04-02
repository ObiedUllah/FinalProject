import { createContext, useState } from "react";

export const PromosContext = createContext(null);

/**
 * Stores the data into context so that the useffect is not called everytime
 *  the user goes to promos page but only once
 * @param {*} param0
 * @returns
 */
export const PromosProvider = ({ children }) => {
	const [promos, setPromos] = useState(() => null);

	//gets all the promos from the database
	const getPromos = async () => {
		try {
			const response = await fetch("/api/promos");
			const result = await response.json();

			//if success then set data
			if (result.status === 200) {
				setPromos(result.data["promos"]);
			} else {
				throw new Error("An error occured! Refresh the page or Contact support");
			}
		} catch (error) {
			alert(error);
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
