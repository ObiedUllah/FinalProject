import { RandomQuoteContext } from "context/RandomQuoteContext";
import React from "react";
import styled from "styled-components";
import { useContext } from "react";

const Quotes = () => {
	const { quotes } = useContext(RandomQuoteContext);
	const { getQuotes } = useContext(RandomQuoteContext).actions;

	if (!quotes) {
		getQuotes();
	}

	return (
		<QuotesDiv>
			<Title>Random Anime Quote</Title>
			{quotes.slice(0, 3).map((anime, index) => (
				<Box key={index}>
					<Quote>'{anime.quote}'</Quote>
					<Character>-{anime.character}</Character>
					<Anime>Anime: {anime.anime}</Anime>
				</Box>
			))}
		</QuotesDiv>
	);
};

const QuotesDiv = styled.div`
	@media (max-width: 1200px) {
		display: none;
	}
`;

const Quote = styled.h3`
	font-style: italic;
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

const Anime = styled.h2``;

const Character = styled.h1`
	font-weight: bold;
`;

export default Quotes;
