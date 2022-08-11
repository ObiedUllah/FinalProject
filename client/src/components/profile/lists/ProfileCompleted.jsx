import React, { useState } from "react";
import { sortByRating, sortByScore, sortByTitle } from "./ProfileHelpers";

import ItemCompleted from "./items/ItemCompleted";
import styled from "styled-components";

const ProfileCompleted = ({ user }) => {
	const [list, setList] = useState(() => user.list.filter((item) => item.status === "completed"));
	const [titleAsc, setTitleAsc] = useState(false);
	const [scoreAsc, setScoreAsc] = useState(false);
	const [ratingAsc, setRatingAsc] = useState(false);

	// const [animeOnly, setAnimeOnly] = useState(() => false);

	// const handleAnimeOnly = (e) => {
	// 	if (animeOnly) {
	// 		setList([...list]);
	// 	} else {
	// 		setList([...user.list.filter((item) => item.type === "TV")]);
	// 	}
	// 	setAnimeOnly((current) => !current);
	// };

	return (
		<Wrapper>
			{/* <div>
				<label htmlFor="animeOnly">Anime Only</label>
				<input type="checkbox" value={animeOnly} checked={animeOnly} onChange={handleAnimeOnly} id="animeOnly" name="animeOnly" />
			</div> */}

			<TitleDiv>
				<Label>Image</Label>
				<Button onClick={(e) => sortByTitle(e, titleAsc, setTitleAsc, list, setList)}>Title</Button>
				<Label>Status</Label>
				<Button onClick={(e) => sortByRating(e, ratingAsc, setRatingAsc, list, setList)}>Rating</Button>
				<Button onClick={(e) => sortByScore(e, scoreAsc, setScoreAsc, list, setList)}>Score</Button>
				<Label>Remove</Label>
			</TitleDiv>
			<>
				{list.map((item) => (
					<ItemCompleted key={item.mal_id} user={user} anime={item} list={list} setList={setList} />
				))}
			</>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 10px;
	border: 1px solid #777;
`;

const TitleDiv = styled.div`
	display: flex;
	justify-content: space-around;
	border-bottom: 3px solid #777;
`;
const Label = styled.label`
	font-size: 20px;
	margin: 1vh 0vh;
`;

const Button = styled.button`
	margin-bottom: 5px;
	background-color: transparent;
	color: inherit;
	border: none;
	font-size: 20px;
	margin: 1vh 0vh;

	&:hover {
		border-bottom: 3px solid #999;
		font-weight: bold;
		cursor: pointer;
	}
`;

export default ProfileCompleted;
