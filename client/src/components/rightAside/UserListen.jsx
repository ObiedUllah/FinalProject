/* eslint-disable react-hooks/exhaustive-deps */

import { addSongToList, getUsers as getUserApi } from "endpoints/apiConfig";

import CircularProg from "utils/porgress/CircularProg";
import Song from "./Song";
import { SongListContext } from "context/SongListContext";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

/**
 * Area that displays all the users liked songs
 * @param {*} props
 * @returns
 */
const UserListen = (props) => {
	const [dbUser, setDbUser] = useState(() => null);
	const { user } = useAuth0();

	//drag and drop func
	const { widgets } = useContext(SongListContext);
	const { setWidgets } = useContext(SongListContext).actions;

	//status whenever a user adds or remove a song
	const [status, setStatus] = useState(() => null);

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
	 * handles the data when song is dropped in the drag and drop box
	 * sends an object containing the necessary info to add to db
	 * updates frontend to have new list with new data
	 * @param {*} e
	 * @returns
	 */
	const handleDrop = async (e) => {
		e.preventDefault();

		//if theres no data then do not do anything
		if (e.dataTransfer.getData("text/plain").indexOf("mal_id") === -1) {
			return;
		}

		//if the drop is successfult then start loading
		setStatus(true);

		//retrieves song object
		const songObject = JSON.parse(e.dataTransfer.getData("text/plain"));

		//data to send to db
		const body = {
			email: dbUser.email,
			data: {
				mal_id: songObject.mal_id,
				title: songObject.title,
				theme: songObject.theme,
				type: songObject.isOpening ? "opening" : "ending",
				img: songObject.img,
				index: songObject.index,
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
					setStatus(false);
				});
		} catch (error) {
			alert("An error occured please try again or contact support");
		}
	};

	//allows to drop content on top
	const handleDragOver = (e) => {
		e.preventDefault();
	};

	//if no user then tell user to sign in
	if (!user) {
		return (
			<BoxDiv>
				<Title>Your Songs</Title>
				<p>Sign in to add songs to your list</p>
			</BoxDiv>
		);
	}

	//if user added or removed a song, it should load
	if (status) {
		return (
			<BoxDiv>
				<Title>Liked Songs</Title>
				<WidgetBox>
					<CircularProg />
				</WidgetBox>
				<Arrow> &uarr;</Arrow>
				<Message>Drag and Drop themes above</Message>
			</BoxDiv>
		);
	}

	return (
		<BoxDiv>
			<Title>Liked Songs</Title>
			{!dbUser && <CircularProg />}
			{dbUser && widgets && (
				<WidgetBox onDragOver={handleDragOver} onDrop={handleDrop}>
					{widgets.map((song, index) => {
						return (
							<Song
								key={`${song.mal_id}${song.theme}${song.index}`}
								index={index}
								song={song}
								setWidgets={setWidgets}
								dbUser={dbUser}
								setStatus={setStatus}
							/>
						);
					})}
				</WidgetBox>
			)}
			<Arrow> &uarr;</Arrow>
			<Message>Drag and Drop themes above</Message>
		</BoxDiv>
	);
};

const BoxDiv = styled.div`
	@media (max-width: 1200px) {
		display: none;
	}
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Title = styled.h3`
	margin-top: 2vh;
	font-size: 24px;
	margin-bottom: 16px;
	text-align: center;
`;

const WidgetBox = styled.div`
	height: 600px;
	width: 100%;
	border: 1px solid;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
`;

const Arrow = styled.h1`
	margin-top: 1%;
	text-align: center;
	font-size: 50px;
`;

const Message = styled.h3`
	margin-top: 3%;
	text-align: center;
	font-weight: bold;
`;

export default UserListen;
