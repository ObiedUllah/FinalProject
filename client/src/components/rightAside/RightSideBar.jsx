/* eslint-disable react-hooks/exhaustive-deps */

import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { AnimeListContext } from "context/AnimeListContext";
import CircularProg from "utils/porgress/CircularProg";
import { RandomQuoteContext } from "context/RandomQuoteContext";
import React from "react";
import styled from "styled-components";

/**
 * displays random quotes
 */
const RightSideBar = () => {
	const { quotes } = useContext(RandomQuoteContext);
	const { getQuotes } = useContext(RandomQuoteContext).actions;

	const { seasonalAnimes, upcomingAnimes } = useContext(AnimeListContext);
	const { getSeasonalAnimes, getUpcomingAnimes } = useContext(AnimeListContext).actions;

	useEffect(() => {
		if (!quotes) {
			getQuotes();
		}
		if (!seasonalAnimes) {
			getSeasonalAnimes();
		}
		if (!upcomingAnimes) {
			getUpcomingAnimes();
		}
	}, []);

	const navigate = useNavigate();
	const handleClickSeasonal = async (event) => {
		event.preventDefault();
		navigate("searchList", { state: { data: seasonalAnimes } });
	};
	const handleClickUpcoming = async (event) => {
		event.preventDefault();
		navigate("searchList", { state: { data: upcomingAnimes } });
	};

	//wait until the quotes are loaded
	if (!quotes) {
		return <CircularProg />;
	}

	return (
		<Nav>
			<Anchor to={`/genres`}>Genres</Anchor>
			<Anchor to={`/promos`}>Recent Promos</Anchor>
			<Button onClick={handleClickSeasonal}>Seasonal Anime</Button>
			<Button onClick={handleClickUpcoming}>Upcoming Anime</Button>
			<Quotes>
				<Title>Random Anime Quote</Title>
				{quotes.slice(0, 3).map((anime, index) => (
					<Box key={index}>
						<Quote>'{anime.quote}'</Quote>
						<Character>-{anime.character}</Character>
						<Anime>Anime: {anime.anime}</Anime>
					</Box>
				))}
			</Quotes>
		</Nav>
	);
};

const Nav = styled.nav`
	padding: 10%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	@media (max-width: 1300px) {
		order: 4;
		padding: 1vh 0px;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}
`;

const Title = styled.h3`
	margin-top: 1vh;
	font-size: 24px;
	margin-bottom: 16px;
	text-align: center;
`;

const Box = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 7vh;
	margin-top: 10%;
	border: 1px solid black;
	padding: 1vh 1vw;
	border-radius: 5%;
	background-color: #aaa;
	color: #313131;

	transition: 0.4s;

	&:hover {
		background-color: #313131;
		color: #aaa;
	}
`;

const Quote = styled.h3`
	font-style: italic;
`;

const Anime = styled.h2``;

const Character = styled.h1`
	font-weight: bold;
`;

const Anchor = styled(NavLink)`
	padding: 8px 1vw;
	width: 10vw;

	color: #313131;
	font-size: 16px;
	margin-bottom: 16px;

	background-color: #fff;
	text-decoration: none;
	text-align: center;

	transition: 0.4s;

	&:hover {
		background-color: #313131;
		color: #888;
		transform: scale(1.1);
	}
	@media (max-width: 1300px) {
		padding: 8px 0px;
		width: 24%;
	}
`;

const Button = styled.button`
	padding: 8px 0px;
	width: 12vw;

	color: #313131;
	font-size: 16px;
	margin-bottom: 16px;

	background-color: #fff;
	text-decoration: none;
	text-align: center;
	cursor: pointer;
	border: none;

	transition: 0.4s;

	&:hover {
		background-color: #313131;
		color: #888;
		transform: scale(1.1);
	}

	@media (max-width: 1300px) {
		width: 24%;
	}
`;

const Quotes = styled.div`
	@media (max-width: 1300px) {
		display: none;
	}
`;
export default RightSideBar;
