import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

/**
 * Single song div in the users songs list in the right sidebar
 * allows user to click on song and go to anime details
 * @param {*} param0
 * @returns
 */
const Song = ({ song, index, setWidgets, dbUser }) => {
	//format the title text
	const formatText = (str) => {
		return str.replace(/ *\([^)]*\) */g, " ");
	};

	//will remove a song from the list
	const handleRemove = async (event) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			//update the songs list in the database
			await fetch(`/api/user/song/${song.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: dbUser.email }),
			})
				.then((res) => res.json())
				.then((data) => {
					//update in the frontend
					console.log(data);
					if (data.status === 200) {
						setWidgets(data.data.songList);
					}
				});
		} catch (error) {
			alert("An error occured please try again or contact support");
		}
	};

	return (
		<Wrapper to={`/anime/${song.mal_id}`} state={{ index: song.index, type: song.type }} index={index}>
			<Span>{index} </Span>
			<Title>{formatText(song.theme)}</Title>
			<Button onClick={(event) => handleRemove(event)}>x</Button>
		</Wrapper>
	);
};

const Wrapper = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: black;
	border: none;
	background-color: ${(props) => (props.index % 2 === 0 ? "#808080" : "#A9A9A9")};
	padding: 10px;
	margin: 3px 3px 0px 3px;
	text-decoration: none;

	&:hover {
		color: white;
		background-color: purple;
		cursor: pointer;
	}
`;

const Title = styled.h4`
	align-self: left;
	width: 90%;
`;
const Span = styled.span`
	margin-right: 10px;
`;

const Button = styled.button`
	cursor: pointer;
	background-color: inherit;
	border: none;
	margin-left: 1px;

	&:hover {
		color: black;
		background-color: white;
		border: 1px solid white;
		border-radius: 5px;
	}
`;
export default Song;
