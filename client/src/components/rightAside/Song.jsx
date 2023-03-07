import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const Song = ({ song, index }) => {
	//format the title text
	const formatText = (str) => {
		return str.replace(/ *\([^)]*\) */g, " ");
	};

	//handle click for wrapper to send to selected anime
	const handleClick = (event) => {
		event.preventDefault();
	};

	return (
		<Wrapper to={`/anime/${song.mal_id}`} index={index}>
			<Span>{index} </Span>
			<div>{formatText(song.theme)}</div>
		</Wrapper>
	);
};

const Wrapper = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: white;
	border: none;
	background-color: ${(props) => (props.index % 2 === 0 ? "green" : "blue")};
	padding: 10px;
	margin: 3px 3px 0px 3px;
	text-decoration: none;

	&:hover {
		color: black;
		cursor: pointer;
	}
`;

const Span = styled.span`
	margin-right: 10px;
`;
export default Song;
