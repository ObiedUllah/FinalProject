import { NavLink } from "react-router-dom";
import React from "react";
import styled from "styled-components";

function AnimeCard({ anime }) {
	return (
		<Card>
			<Anchor to={`/anime/${anime.mal_id}`}>
				<Image src={anime.images.jpg.image_url} alt="img" />
				<Title>{anime.title}</Title>
			</Anchor>
		</Card>
	);
}

const Card = styled.article`
	flex: 1 1 15%;
	text-align: center;
	margin-bottom: 3vh;
	width: 10vw;
	height: 25vh;

	&:hover {
		img {
			box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.25);
			transform: scale(1.05);
		}
	}
`;

const Anchor = styled(NavLink)`
	text-decoration: none;
	color: inherit;
`;

const Image = styled.img`
	width: 75%;
	height: 75%;
	border-radius: 16px;
	box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.15);

	transition: 0.4s;
`;

const Title = styled.h1`
	font-size: 20px;
	padding-top: 10px;
`;

export default AnimeCard;
