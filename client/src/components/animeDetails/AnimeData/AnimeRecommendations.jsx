/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";

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
	const [recommendations, setRecommendations] = useState(() => null);
	const [length, setLength] = useState(0);

	useEffect(() => {
		const getRecommendations = async () => {
			const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);

			//if failure then refresh after 2 sec
			if (response.status === 429)
				setTimeout(() => {
					getRecommendations();
				}, 1000);

			//if success then set data
			if (response.status === 200) {
				const data = await response.json();

				//set length of anime slider
				console.log(parseInt(data.data.length));
				data.data.length < 8 ? setLength(parseInt(data.data.length)) : setLength(8);
				setRecommendations(data.data);
			}
		};
		getRecommendations();
	}, [id, anime]);

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
