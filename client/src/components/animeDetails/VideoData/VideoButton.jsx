/* eslint-disable react-hooks/exhaustive-deps */

import { BsDownload, BsFillPlusCircleFill } from "react-icons/bs";
import { addSongToList, getUser as getUserApi } from "endpoints/apiConfig";
import { downloadMp3, getVideo } from "endpoints/apiConfig";
import { useContext, useEffect, useState } from "react";

import DownloadDialog from "./DownloadDialog";
import { SongListContext } from "context/SongListContext";
import { isMobile } from "utils/porgress/mobile";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Single button link to an opening/ending and allows to download video as mp3
 * @param {*} param0
 * @returns
 */
const VideoButton = ({ anime, index, theme, isOpening, setSelectedTheme }) => {
	//handles add
	const [dbUser, setDbUser] = useState(() => null);
	const { user } = useAuth0();
	const { widgets } = useContext(SongListContext);
	const { setWidgets } = useContext(SongListContext).actions;

	//link to download song
	const [link, setLink] = useState(null);

	//status for modal to be open or close
	const [open, setOpen] = useState(false);

	//gets the user from the mongo db
	useEffect(() => {
		const getUser = async () => {
			const response = await fetch(`${getUserApi}/${user.email}`);
			const result = await response.json();
			setDbUser(result.data);
			setWidgets(result.data.songList);
		};

		if (user) {
			getUser();
		}
	}, [user]);

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
	 * @param {*} event
	 * @param {*} index
	 */
	const handleClick = async (event, index) => {
		event.preventDefault();
		event.stopPropagation();
		try {
			let response;
			isOpening
				? (response = await fetch(`${getVideo}/${anime?.theme.openings[index] + " opening " + anime.title}`))
				: (response = await fetch(`${getVideo}/${anime?.theme.endings[index] + " ending " + anime.title}`));

			const result = await response.json();
			setSelectedTheme(result.data);
		} catch (error) {
			alert("Could Not Fetch Video");
		}
	};

	/**
	 * this will convert the selected song to an mp3, then create a modal so that the user can download the song
	 * @param {*} event
	 * @param {*} index
	 */
	const handleDownload = async (event, index) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			//change text
			let data;
			isOpening ? (data = anime?.theme.openings[index] + " opening") : (data = anime?.theme.endings[index] + " ending");

			//download mp3
			const response = await fetch(downloadMp3, {
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
	 * contains the info on what is being dragged
	 * @param {*} e
	 */
	const handleDragStart = (e) => {
		const data = { mal_id: anime.mal_id, title: anime.title, img: anime.images.jpg.image_url, theme, isOpening, index };
		e.dataTransfer.setData("text/plain", JSON.stringify(data));
	};

	/**
	 * Adds song to songlibrary
	 * @param {*} e
	 */
	const handleAdd = async (e, index) => {
		e.preventDefault();

		//data to send to db
		const body = {
			email: dbUser.email,
			data: {
				mal_id: anime.mal_id,
				title: anime.title,
				theme: isOpening ? anime?.theme.openings[index] + " opening" : anime?.theme.endings[index] + " ending",
				type: anime.isOpening ? "opening" : "ending",
				img: anime.images.jpg.image_url,
				index: index,
			},
		};

		try {
			//updates the songs list in the database
			await fetch(addSongToList, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			})
				.then((res) => res.json())
				.then((data) => {
					//updates in the frontend
					if (data.status === 200) {
						setWidgets([...widgets, body.data]);
					} else {
						alert("Already in List");
					}
				});
		} catch (error) {
			alert("An error occured please try again or contact support");
		}
	};

	return (
		<>
			{/* modal to confirm download */}
			{open && <DownloadDialog link={link} setOpen={setOpen} />}

			{/* Button link to opening/ending */}
			<ButtonLabel key={index} draggable onDragStart={handleDragStart} onClick={(event) => handleClick(event, index)}>
				<Name>{formatText(theme)} </Name>
				{isMobile && dbUser && <Add onClick={(event) => handleAdd(event, index)} />}
				<Download onClick={(event) => handleDownload(event, index)} />
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

	@media (max-width: 768px) {
		width: 100%;
	}
`;

const Name = styled.span`
	flex: 1 1 90%;
	font-size: 14px;
`;

const Add = styled(BsFillPlusCircleFill)`
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
