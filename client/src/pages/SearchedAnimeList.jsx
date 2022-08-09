import AnimeCard from "components/animeCard/AnimeCard";
import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const SearchedAnimeList = () => {
	//get the searched data
	const { state } = useLocation();
	const animeList = state.data;

	return (
		<Wrapper>
			<Title>Search Result:</Title>
			<SearchWrap>
				{animeList.map((anime) => (
					<AnimeCard anime={anime} key={anime.mal_id} />
				))}
			</SearchWrap>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 2vh;
`;

const SearchWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	margin-top: 3vh;
`;

const Title = styled.h1`
	font-size: 36px;
	text-align: center;
`;

export default SearchedAnimeList;
