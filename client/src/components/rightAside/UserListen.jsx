import React, { useContext } from "react";

import CircularProg from "utils/porgress/CircularProg";
import Song from "./Song";
import { SongListContext } from "context/SongListContext";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
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

	const [status, setStatus] = useState(() => null);

	//gets the user from the mongo db
	useEffect(() => {
		const getUser = async () => {
			const response = await fetch(`/api/user/${user.email}`);
			const result = await response.json();
			setDbUser(result.data);
			setWidgets(result.data.songList);
		};
		getUser();
	}, []);

	//will handle the data when song is dropped
	const handleDrop = async (e) => {
		e.preventDefault();
		const songObject = JSON.parse(e.dataTransfer.getData("text/plain"));

		//data to send to db
		const body = {
			email: dbUser.email,
			data: {
				mal_id: songObject.mal_id,
				theme: songObject.theme,
				type: songObject.isOpening ? "opening" : "ending",
				index: songObject.index,
			},
		};

		try {
			//update the songs list in the database
			await fetch("/api/user/song", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			})
				.then((res) => res.json())
				.then((data) => {
					//update in the frontend
					if (data.status === 200) {
						setWidgets([...widgets, songObject]);
					} else {
						alert("Already in List");
					}
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
							/>
						);
					})}
				</WidgetBox>
			)}
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
	margin-top: 1vh;
	font-size: 24px;
	margin-bottom: 16px;
	text-align: center;
`;

const WidgetBox = styled.div`
	height: 400px;
	width: 100%;
	border: 1px solid;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
`;

export default UserListen;
