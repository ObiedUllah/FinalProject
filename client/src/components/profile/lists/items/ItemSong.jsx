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
					console.log(data);
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
			<ThemeTitle>{song.theme}</ThemeTitle>
			<Button onClick={(event) => handleRemove(event)}>x</Button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	background-color: #191414;
	padding: 2px 8px 0px 8px;
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
const ThemeTitle = styled.div`
	width: 90%;
	margin: 1vh 0vh;
	padding: 8px;
	cursor: pointer;
	&:hover {
		background-color: #474545;
	}
`;

export default ItemSong;
