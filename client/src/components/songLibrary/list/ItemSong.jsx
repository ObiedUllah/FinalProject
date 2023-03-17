import { useContext, useState } from "react";

import CircularProg from "utils/porgress/CircularProg";
import { SongListContext } from "context/SongListContext";
import styled from "styled-components";

const ItemSong = ({ user, song, list, setList }) => {
	//updates widget if user clicks on delete
	const { setWidgets } = useContext(SongListContext).actions;

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

	const handlePlay = async (event) => {
		event.preventDefault();
		setLoading(true);
		const response = await fetch(`/api/video/${song?.theme + " opening " + song.title}`);
		const result = await response.json();

		let audio = new Audio(result.data.url);
		audio.play();

		console.log(result);
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
				<ThemeTitle>{song.theme}</ThemeTitle>
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

const MainButton = styled.button`
	background-color: #191414;
	padding: 5px;
	color: white;
	width: 100%;
`;

const ThemeTitle = styled.div`
	width: 98%;
	align-self: center;
	margin: 4px;
	padding: 5px;
	cursor: pointer;
	&:hover {
		background-color: #474545;
	}
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
