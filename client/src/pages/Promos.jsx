/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from "react";

import CircularProg from "utils/porgress/CircularProg";
import { PromosContext } from "context/PromosContext";

const Promos = () => {
	const { promos } = useContext(PromosContext);
	const { getPromos } = useContext(PromosContext).actions;

	useEffect(() => {
		if (!promos) {
			getPromos();
		}
	}, []);

	// wait until data is loaded
	if (!promos) {
		<CircularProg />;
	}

	return <div>Promos</div>;
};

export default Promos;
