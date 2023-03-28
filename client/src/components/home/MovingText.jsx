import { useEffect, useState } from "react";

import styled from "styled-components";

/**
 * Moving text that shows the user there will be a movile version soon
 * @returns
 */
const MovingText = () => {
	const [position, setPosition] = useState(window.innerWidth);

	//update the position from right to left
	useEffect(() => {
		const interval = setInterval(() => {
			setPosition((prevPosition) => (prevPosition > -200 ? prevPosition - 1 : window.innerWidth));
		}, 10);
		return () => clearInterval(interval);
	}, []);

	return <Text style={{ left: position }}>Mobile Version coming soon!</Text>;
};

const Text = styled.div`
	position: absolute;
	top: 15vh;
	white-space: nowrap;
	color: white;

	@media (max-width: 1200px) {
		display: none;
	}
`;

export default MovingText;
