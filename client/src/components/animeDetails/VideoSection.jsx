/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";

import { BsDownload } from "react-icons/bs";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReactPlayer from "react-player";
import styled from "styled-components";

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
				const response = await fetch(`/api/video/${anime?.theme.openings[0] + " opening"}`);
				const result = await response.json();
				setSelectedTheme(result.data);
			} catch (error) {
				console.log(error);
			}
		};
		getInitialTheme();
	}, [id]);

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
				: (response = await fetch(`/api/video/${anime?.theme.endings[index] + " opening"}`));

			const result = await response.json();
			setSelectedTheme(result.data);
		} catch (error) {
			console.log(error);
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
			isOpening ? (data = anime?.theme.openings[index]) : (data = anime?.theme.endings[index]);

			//download mp3
			const response = await fetch("/api/convert-mp3", {
				method: "POST", // or 'PUT'
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ video: data }),
			});

			const result = await response.json();
			console.log(result);

			//modal handling
			if (result.song_link === null) {
				setLink(null);
			}
			setLink(result.data.song_link);
			setOpen(true);
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * closes modal
	 */
	const handleClose = () => {
		setOpen(false);
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
			{open && (
				<Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
					<DialogTitle id="alert-dialog-title">{"Download Song"}</DialogTitle>
					<DialogContent>
						{link ? (
							<DialogContentText id="alert-dialog-description">
								Do you allow this third party application download a song into your computer!?
							</DialogContentText>
						) : (
							<DialogContentText id="alert-dialog-description">There is no video link for this opening/ending!?</DialogContentText>
						)}
					</DialogContent>
					<DialogActions>
						{link ? <Button onClick={handleClose}>Disagree</Button> : <Button onClick={handleClose}>Close</Button>}
						{link && (
							<a href={link}>
								<Button onClick={handleClose} autoFocus>
									Agree
								</Button>
							</a>
						)}
					</DialogActions>
				</Dialog>
			)}

			{/* video content */}
			<MainTitle>{anime.title}</MainTitle>
			{selectedTheme && <Player controls={true} width="100%" height="70vh" url={selectedTheme.url} />}
			<ThemesList>
				<Title>Openings:</Title>
				<OpeningList>
					{anime.theme.openings.map((theme, index) => {
						return (
							<ButtonWrap>
								<ButtonLabel onClick={(e) => handleClick(e, index, true)}>
									<Name>{formatText(theme)} </Name>
									<Download onClick={(e) => handleDownload(e, index, true)} />
								</ButtonLabel>
							</ButtonWrap>
						);
					})}
				</OpeningList>
				<Title>Endings:</Title>
				<EndingList>
					{anime.theme.endings.map((theme, index) => {
						return (
							<ButtonWrap>
								<ButtonLabel onClick={(e) => handleClick(e, index, false)}>
									<Name>{formatText(theme)} </Name>
									<Download onClick={(e) => handleDownload(e, index, false)} />
								</ButtonLabel>
							</ButtonWrap>
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
	font-size: 32px;
	text-align: center;
	margin: 2vh 1vw;
`;

const ThemesList = styled.div`
	display: flex;
	flex-direction: column;
	border: 3px solid #aaa;
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
	font-size: 26px;
`;

const ButtonWrap = styled.div``;

const ButtonLabel = styled.button`
	background-color: #999;
	width: 300px;
	height: 80px;
	margin: 12px 8px;
	font-size: 14px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Name = styled.span`
	flex: 1 1 90%;
`;

const Download = styled(BsDownload)`
	cursor: pointer;
	width: 20px;
	height: 20px;
	padding: 3px;

	transition: 0.4s;

	&:hover {
		background-color: #444;
		border-radius: 4px;
		width: 40px;
		height: 40px;
	}
`;

const Player = styled(ReactPlayer)``;

export default VideoSection;
