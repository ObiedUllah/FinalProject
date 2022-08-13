/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from "react";

import { AnimeDetailsContext } from "context/AnimeDetailsContext";
import AnimeSlider from "components/home/AnimeSlider";
import CircularProg from "utils/porgress/CircularProg";
import { Title } from "styles/AnimeDetailsStyles";
import styled from "styled-components";

/**
 * Displays recommendations for an anime
 * @param {*} param0
 * @returns
 */
const AnimeRecommendations = ({ anime, id }) => {
	const [length, setLength] = useState(0);

	const { recommendations } = useContext(AnimeDetailsContext);
	const { getRecommendations } = useContext(AnimeDetailsContext).actions;

	useEffect(() => {
		getRecommendations(id, setLength);
	}, [anime, id]);

	//wait for recommendations to be loaded
	if (!recommendations) {
		return <CircularProg />;
	}

	return (
		<Wrapper>
			{recommendations && recommendations.length > 0 && <Title>Recommendations: </Title>}
			{recommendations ? (
				<AnimeSlider list={recommendations} title={""} scroll={length} />
			) : (
				<>
					<p>refresh page/unavailable</p>
					<Button
						onClick={(e) => {
							window.location.reload();
						}}
					>
						Refresh Page
					</Button>
				</>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 30px;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`;

const Button = styled.button`
	margin: 10px 0px;
	padding: 10px;
	cursor: pointer;
`;

export default AnimeRecommendations;
