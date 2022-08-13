import AnimeCard from "components/animeCard/AnimeCard";
import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

/**
 * has a list of searched anime
 * @returns
 */
const SearchedAnimeList = () => {
	//get the searched data that contain a popularity and sort by most popular and get only the first 24
	const { state } = useLocation();
	let animeList;
	if (state.data) {
		animeList = state.data
			.filter((item) => item.popularity !== 0)
			.sort((a, b) => parseInt(a.popularity) - parseInt(b.popularity))
			.slice(0, 24);
	}

	return (
		<Wrapper>
			<Title>Search Result:</Title>
			<SearchWrap>{animeList && animeList.map((anime) => <AnimeCard anime={anime} key={anime.mal_id} />)}</SearchWrap>
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
	align-items: flex-start;
	justify-content: flex-start;
	margin-top: 3vh;
`;

const Title = styled.h1`
	font-size: 36px;
	text-align: center;
`;

export default SearchedAnimeList;
