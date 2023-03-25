import { useContext, useState } from "react";

import CircularProg from "utils/porgress/CircularProg";
import { SongListContext } from "context/SongListContext";
import styled from "styled-components";

const ItemSong = ({ user, song, list, setList, index }) => {
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
			await fetch(`/api/user/song/${song.id}`, {
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
					}
					//ends loading state
					setLoading(false);
				});
		} catch (error) {
			alert("An error occured please try again or contact support");
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
				</Box>
			</MainButton>
			<Button onClick={(event) => handleRemove(event)}>x</Button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`;

const Box = styled.div`
	display: flex;
	align-items: center;
	width: 100%;

	&:hover {
		background-color: #474545;
	}

	div {
		margin: 3px;
		padding: 2px;
	}
`;

const MainButton = styled.button`
	background-color: #191414;
	padding: 5px;
	color: white;
	width: 100%;
	cursor: pointer;
	margin: 2px;
`;

const Index = styled.div`
	width: 5%;
`;

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
	margin: 4px;

	&:hover {
		color: white;
		background-color: #191414;
		border: 1px solid white;
		border-radius: 5px;
	}
`;

export default ItemSong;
