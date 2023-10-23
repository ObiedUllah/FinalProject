import { useContext, useState } from "react";

import CircularProg from "utils/porgress/CircularProg";
import { SongListContext } from "context/SongListContext";
import { removeSongFromList } from "endpoints/apiConfig";
import styled from "styled-components";

/**
 * Each song of the user displayed in the songLibrary under the header
 * @param {*} param0
 * @returns
 */
const ItemSong = ({ user, song, setList, index }) => {
	//updates widget if user clicks on delete
	const { setWidgets, playCurrentSong } = useContext(SongListContext).actions;

	//loading state to wait for db
	const [loading, setLoading] = useState(() => null);

	/**
	 * removes a song from the list and updates the widgets and the users list
	 * @param {*} event
	 */
	const handleRemove = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		//loading state
		setLoading(true);

		try {
			//updates the songs list in the database
			await fetch(`${removeSongFromList}/${song.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: user.email }),
			})
				.then((res) => res.json())
				.then((data) => {
					//updates in the frontend, also for right side bar
					if (data.status === 200) {
						setWidgets(data.data.songList);
						setList(data.data.songList);
					} else {
						throw new Error("An error occured! Refresh the page or Contact support");
					}

					//ends loading state
					setLoading(false);
				});
		} catch (error) {
			alert(error);
		}
	};

	/**
	 * plays audio of the song that was clicked
	 * modifies the front end so that it dispolays currently selected song
	 * @param {*} event
	 */
	const handlePlay = async (event) => {
		event.preventDefault();
		setLoading(true);
		await playCurrentSong(song, index);
		setLoading(false);
	};

	//if user added or removed a song, it should load
	if (loading) {
		return (
			<Wrapper>
				<CircularProg height={5} />
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<MainButton onClick={(event) => handlePlay(event)}>
				<Box>
					<Index>{index}</Index>
					<ThemeTitle>{song.theme}</ThemeTitle>
					<Title>{song.title}</Title>
					<Button onClick={(event) => handleRemove(event)}>x</Button>
				</Box>
			</MainButton>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Box = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 5px;

	div {
		margin: 3px;
		padding: 2px;
	}
`;

const MainButton = styled.button`
	background-color: #191414;
	color: white;
	width: 100%;
	cursor: pointer;

	&:hover {
		background-color: #474545;
	}
`;

const Index = styled.div``;

const ThemeTitle = styled.div`
	width: 75%;
	text-align: left;
`;

const Title = styled.div`
	width: 20%;
	text-align: left;
`;

const Button = styled.button`
	cursor: pointer;
	background-color: inherit;
	border: none;
	color: white;

	&:hover {
		color: white;
		background-color: #191414;
		border: 1px solid white;
		border-radius: 5px;
	}
`;

export default ItemSong;
