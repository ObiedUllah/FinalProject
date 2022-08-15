/* eslint-disable react-hooks/exhaustive-deps */

import { EpisodeLabel, Title } from "styles/AnimeDetailsStyles";
import React, { useEffect, useState } from "react";

import AnimeSlider from "components/home/AnimeSlider";
import CircularProg from "utils/porgress/CircularProg";
import styled from "styled-components";

/**
 * Displays recommendations for an anime
 * @param {*} param0
 * @returns
 */
const AnimeRecommendations = ({ anime, id }) => {
	const [recommendations, setRecommendations] = useState(() => null);
	const [length, setLength] = useState(0);

	useEffect(() => {
		let isCancelled = false;

		const getRecommendations = async () => {
			if (!isCancelled) {
				const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);

				//if failure then refresh after 2 sec
				if (response.status === 429) getRecommendations();

				//if success then set data
				if (response.status === 200) {
					const data = await response.json();

					//set length of anime slider
					data.data.length < 8 ? setLength(parseInt(data.data.length)) : setLength(8);
					setRecommendations(data.data);
				}
			}
		};

		getRecommendations();

		return () => {
			isCancelled = true;
		};
	}, [id, anime]);

	//wait for recommendations to be loaded
	if (!recommendations) {
		return <CircularProg />;
	}

	return (
		<Wrapper>
			<Title>Recommendations: </Title>
			{recommendations.length > 0 ? (
				<AnimeSlider list={recommendations} title={""} scroll={length} />
			) : (
				<>
					<EpisodeLabel>None</EpisodeLabel>
				</>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	padding: 25px;
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
