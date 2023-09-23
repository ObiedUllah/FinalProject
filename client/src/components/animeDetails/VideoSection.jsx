/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";

import CircularProg from "utils/porgress/CircularProg";
import ReactPlayer from "react-player";
import VideoButton from "./VideoData/VideoButton";
import { getVideo } from "endpoints/apiConfig";
import styled from "styled-components";

/**
 * First section of an anime details containing the video and the list of openings and endingg
 * @param {*} param0
 * @returns
 */
const VideoSection = ({ anime, id, index, type }) => {
	const [selectedTheme, setSelectedTheme] = useState(() => null);

	useEffect(() => {
		const getInitialTheme = async () => {
			try {
				let selectedTheme = null;
				const openings = anime?.theme?.openings ?? [];
				const endings = anime?.theme?.endings ?? [];

				if (typeof index === "number" && type === "opening") {
					const response = await fetch(`${getVideo}/${openings[index] + " opening " + anime.title}`);
					if (response.status === 200) {
						const result = await response.json();
						selectedTheme = result.data;
					}
				} else if (typeof index === "number" && type === "ending") {
					const response = await fetch(`${getVideo}/${endings[index] + " ending " + anime.title}`);
					if (response.status === 200) {
						const result = await response.json();
						selectedTheme = result.data;
					}
				} else if (openings[0] === undefined && endings[0] === undefined) {
					selectedTheme = false;
				} else if (openings[0] !== undefined) {
					const response = await fetch(`${getVideo}/${openings[0] + " opening " + anime.title}`);
					if (response.status === 200) {
						const result = await response.json();
						selectedTheme = result.data;
					}
				} else if (endings[0] !== undefined) {
					const response = await fetch(`${getVideo}/${endings[0] + " ending " + anime.title}`);
					if (response.status === 200) {
						const result = await response.json();
						selectedTheme = result.data;
					}
				} else {
					selectedTheme = false;
				}

				setSelectedTheme(selectedTheme);
			} catch (error) {
				setSelectedTheme(false);
			}
		};
		getInitialTheme();
	}, [id, anime]);

	//load player
	if (selectedTheme === null) {
		return <CircularProg />;
	}

	return (
		<Wrapper>
			{/* video content */}
			<MainTitle>{anime.title}</MainTitle>
			{anime.title_english && <EnglishTitle>{anime.title_english}</EnglishTitle>}
			{selectedTheme ? (
				<ReactPlayer controls={true} width="100%" height="70vh" url={selectedTheme} />
			) : (
				<Title style={{ textAlign: "center" }}>Themes Unavailable...</Title>
			)}
			<ThemesList>
				<Title>Openings:</Title>
				<OpeningList>
					{anime.theme.openings.map((theme, index) => {
						return (
							<VideoButton key={index} anime={anime} index={index} theme={theme} isOpening={true} setSelectedTheme={setSelectedTheme} />
						);
					})}
				</OpeningList>
				<Title>Endings:</Title>
				<EndingList>
					{anime.theme.endings.map((theme, index) => {
						return (
							<VideoButton
								key={index}
								anime={anime}
								index={index}
								theme={theme}
								isOpening={false}
								setSelectedTheme={setSelectedTheme}
							/>
						);
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
