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
	const [recommendations, setRecommendations] = useState(null);
	const [length, setLength] = useState(0);

	//get anime recommendations with id from params
	useEffect(() => {
		const getRecommendations = async () => {
			const data = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`).then((res) => res.json());
			setRecommendations(data.data);

			//set length of anime slider
			if (data.data) {
				if (data.data.length < 8) {
					setLength(parseInt(data.data.length));
				} else {
					setLength(8);
				}
			}
		};
		//add timeout because the jikkan api only allows 3 requests per second, this will bypass that
		try {
			setTimeout(() => getRecommendations(), 2000);
		} catch (error) {
			window.location.reload();
		}
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
