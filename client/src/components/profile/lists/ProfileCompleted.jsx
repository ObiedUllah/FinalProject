import { Button, Label, TitleDiv, Wrapper } from "styles/profile/ProfileHeaderStyles";
import React, { useState } from "react";
import { sortByRating, sortByScore, sortByTitle } from "./ProfileHelpers";

import ItemCompleted from "./items/ItemCompleted";

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

export default ProfileCompleted;
