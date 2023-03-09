import { Button, Label, TitleDiv, Wrapper } from "styles/profile/ProfileHeaderStyles";
import { sortByRating, sortByScore, sortByTitle } from "../ProfileHelpers";

import ItemCompleted from "../items/ItemCompleted";
import { useState } from "react";

/**
 * Shows all the anime that a user has completed in a display flex table looking format
 * @param {*} param0
 * @returns
 */
const ProfileCompleted = ({ user }) => {
	const [list, setList] = useState(() => user.list.filter((item) => item.status === "completed"));

	//handles sortung
	const [titleAsc, setTitleAsc] = useState(false);
	const [scoreAsc, setScoreAsc] = useState(false);
	const [ratingAsc, setRatingAsc] = useState(false);

	return (
		<Wrapper>
			<TitleDiv>
				<Label>Image</Label>
				<Button onClick={(event) => sortByTitle(event, titleAsc, setTitleAsc, list, setList)}>Title</Button>
				<Label>Status</Label>
				<Button onClick={(event) => sortByRating(event, ratingAsc, setRatingAsc, list, setList)}>Rating</Button>
				<Button onClick={(event) => sortByScore(event, scoreAsc, setScoreAsc, list, setList)}>Score</Button>
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
