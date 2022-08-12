import { NavLink } from "react-router-dom";
import React from "react";
import styled from "styled-components";

/**
 * Single Anime card containing image and title to be used when user searches for an anime
 * @param {*} anime
 * @returns
 */
const AnimeCard = ({ anime }) => {
	return (
		<Card>
			<Anchor to={`/anime/${anime.mal_id}`}>
				<Image src={anime.images.jpg.image_url} alt="img" />
				<Title>{anime.title}</Title>
			</Anchor>
		</Card>
	);
};

const Card = styled.article`
	flex: 0 0 15%;
	text-align: center;
	margin: 1.5vh 0.5vw;
	width: 200px;
	height: 280px;

	&:hover {
		img {
			box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.25);
			transform: scale(1.1);
			cursor: pointer;
		}
	}
`;

const Anchor = styled(NavLink)`
	text-decoration: none;
	color: inherit;
`;

const Image = styled.img`
	width: 150px;
	height: 200px;
	border-radius: 16px;
	box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.15);
	transition: 0.4s;
`;

const Title = styled.h1`
	font-size: 20px;
	padding-top: 10px;
`;

export default AnimeCard;
