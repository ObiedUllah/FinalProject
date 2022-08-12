/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";

import { BsDownload } from "react-icons/bs";
import DownloadDialog from "./DownloadDialog";
import ReactPlayer from "react-player";
import styled from "styled-components";

/**
 * First section of an anime details containing the video and the list of openings and endingg
 * @param {*} param0
 * @returns
 */
const VideoSection = ({ anime, id }) => {
	//current theme to display as video
	const [selectedTheme, setSelectedTheme] = useState(null);

	//link to download song
	const [link, setLink] = useState(null);

	//status for modal to be open or close
	const [open, setOpen] = useState(false);

	//will select the initial theme when going to details page
	useEffect(() => {
		const getInitialTheme = async () => {
			try {
				//if no opening or ending set to null
				if (anime?.theme.openings[0] === undefined && anime?.theme.endings[0] === undefined) {
					setSelectedTheme(null);
				}
				//if opening then set to opening
				else if (anime?.theme.openings[0] !== undefined) {
					const response = await fetch(`/api/video/${anime?.theme.openings[0] + " opening"}`);
					const result = await response.json();
					setSelectedTheme(result.data);
				}
				//if ending then set to ending
				else if (anime?.theme.endings[0] !== undefined) {
					const response = await fetch(`/api/video/${anime?.theme.endings[0] + " opening"}`);
					const result = await response.json();
					setSelectedTheme(result.data);
				}
			} catch (error) {
				setSelectedTheme(null);
			}
		};
		getInitialTheme();
	}, [id, anime]);

	/**
	 * When user clicks on opening/ending, will set the video to the first youtube search for that opening/ending
	 * @param {*} e
	 * @param {*} index
	 */
	const handleClick = async (e, index, isOpening) => {
		e.preventDefault();
		e.stopPropagation();
		try {
			let response;
			isOpening
				? (response = await fetch(`/api/video/${anime?.theme.openings[index] + " opening"}`))
				: (response = await fetch(`/api/video/${anime?.theme.endings[index] + " ending"}`));

			const result = await response.json();
			setSelectedTheme(result.data);
		} catch (error) {
			alert("Could not fetch video!?");
		}
	};

	/**
	 * this will convert the selected song to an mp3, then create a modal so that the user can download the song
	 * @param {*} e
	 * @param {*} index
	 * @param {*} isOpening
	 */
	const handleDownload = async (e, index, isOpening) => {
		e.preventDefault();
		e.stopPropagation();
		try {
			//get videoid first
			let data;
			isOpening ? (data = anime?.theme.openings[index] + " opening") : (data = anime?.theme.endings[index] + " ending");

			//download mp3
			const response = await fetch("/api/convert-mp3", {
				method: "POST", // or 'PUT'
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ video: data }),
			});

			//modal handling
			const result = await response.json();
			result.song_link === null ? setLink(null) : setLink(result.data.song_link);
			setOpen(true);
		} catch (error) {
			//open modal to say there was an error
			setOpen(true);
			setLink(null);
		}
	};

	/**
	 * formats the text to look good
	 * @param {*} str
	 * @returns
	 */
	const formatText = (str) => {
		return str.replace(/ *\([^)]*\) */g, " ");
	};

	return (
		<Wrapper>
			{/* modal to confirm download */}
			{open && <DownloadDialog link={link} setOpen={setOpen} />}

			{/* video content */}
			<MainTitle>{anime.title}</MainTitle>
			{anime.title_english && <EnglishTitle>{anime.title_english}</EnglishTitle>}
			{selectedTheme ? (
				<Player controls={true} width="100%" height="70vh" url={selectedTheme.url} />
			) : (
				<Title style={{ textAlign: "center" }}>Unavailable...</Title>
			)}
			<ThemesList>
				<Title>Openings:</Title>
				<OpeningList>
					{anime.theme.openings.map((theme, index) => {
						return (
							<ButtonLabel key={index} onClick={(e) => handleClick(e, index, true)}>
								<Name>{formatText(theme)} </Name>
								<Download onClick={(e) => handleDownload(e, index, true)} />
							</ButtonLabel>
						);
					})}
				</OpeningList>
				<Title>Endings:</Title>
				<EndingList>
					{anime.theme.endings.map((theme, index) => {
						return (
							<ButtonLabel key={index} onClick={(e) => handleClick(e, index, false)}>
								<Name>{formatText(theme)} </Name>
								<Download onClick={(e) => handleDownload(e, index, false)} />
							</ButtonLabel>
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

const ButtonLabel = styled.button`
	width: 240px;
	height: 55px;
	margin: 12px 6px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: 0.3s;

	&:hover {
		background-color: #444;
		color: #777;
	}
`;

const Name = styled.span`
	flex: 1 1 90%;
	font-size: 14px;
`;

const Download = styled(BsDownload)`
	cursor: pointer;
	width: 20px;
	height: 20px;
	padding: 3px;

	transition: 0.4s;

	&:hover {
		background-color: #444;
		color: inherit;
		border-radius: 4px;
		transform: scale(1.5);
	}
`;

const Player = styled(ReactPlayer)``;

export default VideoSection;
