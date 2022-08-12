import React, { useState } from "react";

import { BsDownload } from "react-icons/bs";
import DownloadDialog from "./DownloadDialog";
import styled from "styled-components";

/**
 * Single button link to an opening/ending and allows to download video as mp3
 * @param {*} param0
 * @returns
 */
const VideoButton = ({ anime, index, theme, setSelectedTheme }) => {
	//link to download song
	const [link, setLink] = useState(null);

	//status for modal to be open or close
	const [open, setOpen] = useState(false);

	/**
	 * formats the text to look good
	 * @param {*} str
	 * @returns
	 */
	const formatText = (str) => {
		return str.replace(/ *\([^)]*\) */g, " ");
	};

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
			console.log(result.data);
			setSelectedTheme(result.data);
		} catch (error) {
			alert("Could Not Fetch Video");
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

	return (
		<>
			{/* modal to confirm download */}
			{open && <DownloadDialog link={link} setOpen={setOpen} />}

			{/* Button link to opening/ending */}
			<ButtonLabel key={index} onClick={(e) => handleClick(e, index, false)}>
				<Name>{formatText(theme)} </Name>
				<Download onClick={(e) => handleDownload(e, index, false)} />
			</ButtonLabel>
		</>
	);
};

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

export default VideoButton;
