import { useEffect, useState } from "react";

import React from "react";
import styled from "styled-components";

const RightSideBar = () => {
	const [quotes, setQuotes] = useState(() => []);

	//get random anime quote
	useEffect(() => {
		const getRandomAnimeQuotes = async () => {
			const data = await fetch(`https://animechan.vercel.app/api/quotes`).then((res) => res.json());
			setQuotes(data.slice(0, 5));
		};
		//getRandomAnimeQuotes();
	}, []);

	return (
		<Nav>
			<Title>Random Anime Quote</Title>

			{quotes.map((anime, index) => (
				<Box key={index}>
					<Quote>'{anime.quote}'</Quote>
					<Character>-{anime.character}</Character>
					<Anime>Anime: {anime.anime}</Anime>
				</Box>
			))}
		</Nav>
	);
};

const Nav = styled.nav`
	padding: 1vh 1vw;
	display: flex;
	flex-direction: column;
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
	padding: 5%;
	border-radius: 5%;
	background-color: #aaa;
	color: #313131;

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

const Anchor = styled.a`
	padding: 8px 16px;
	width: 70%;

	color: #888;
	font-size: 16px;
	margin-bottom: 16px;

	background-color: #eee;
	border-radius: 999px;
	text-decoration: none;

	transition: 0.4s;

	&:hover {
		background-color: #313131;
		color: #aaa;
	}
`;

export default RightSideBar;
