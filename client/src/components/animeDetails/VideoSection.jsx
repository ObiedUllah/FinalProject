/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from "react";

import { AnimeDetailsContext } from "context/AnimeDetailsContext";
import ReactPlayer from "react-player";
import VideoButton from "./VideoData/VideoButton";
import styled from "styled-components";

/**
 * First section of an anime details containing the video and the list of openings and endingg
 * @param {*} param0
 * @returns
 */
const VideoSection = ({ anime, id }) => {
	const { selectedTheme } = useContext(AnimeDetailsContext);
	const { getInitialTheme } = useContext(AnimeDetailsContext).actions;

	useEffect(() => {
		getInitialTheme(anime);
	}, [id, anime]);

	return (
		<Wrapper>
			{/* video content */}
			<MainTitle>{anime.title}</MainTitle>
			{anime.title_english && <EnglishTitle>{anime.title_english}</EnglishTitle>}
			{selectedTheme ? (
				<ReactPlayer controls={true} width="100%" height="70vh" url={selectedTheme.url} />
			) : (
				<Title style={{ textAlign: "center" }}>Unavailable...</Title>
			)}
			<ThemesList>
				<Title>Openings:</Title>
				<OpeningList>
					{anime.theme.openings.map((theme, index) => {
						return <VideoButton key={index} anime={anime} index={index} theme={theme} />;
					})}
				</OpeningList>
				<Title>Endings:</Title>
				<EndingList>
					{anime.theme.endings.map((theme, index) => {
						return <VideoButton key={index} anime={anime} index={index} theme={theme} />;
					})}
				</EndingList>
			</ThemesList>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const MainTitle = styled.h1`
	font-size: 28px;
	text-align: center;
	margin: 2vh 1vw;
`;

const EnglishTitle = styled.h1`
	font-size: 22px;
	text-align: center;
	margin-bottom: 1vh;
`;

const ThemesList = styled.div`
	display: flex;
	flex-direction: column;
	border: 3px solid #aaa;
	border-radius: 2px;
	padding: 16px;
	margin: 16px;
`;

const OpeningList = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const EndingList = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const Title = styled.h1`
	font-size: 22px;
`;

export default VideoSection;
