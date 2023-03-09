import { Button, Label, TitleDiv, Wrapper } from "styles/profile/ProfileHeaderStyles";
import { sortByScore, sortByTitle } from "../ProfileHelpers";

import ItemPlan from "../items/ItemPlan";
import { useState } from "react";

/**
 * Shows all the anime that a user plans to watch in a display flex table looking format
 * @param {*} param0
 * @returns
 */
const ProfilePlan = ({ user }) => {
	const [list, setList] = useState(() => user.list.filter((item) => item.status === "plan"));

	//sort
	const [titleAsc, setTitleAsc] = useState(false);
	const [scoreAsc, setScoreAsc] = useState(false);

	return (
		<Wrapper>
			<TitleDiv>
				<Label>Image</Label>
				<Button onClick={(event) => sortByTitle(event, titleAsc, setTitleAsc, list, setList)}>Title</Button>
				<Label>Status</Label>
				<Button onClick={(event) => sortByScore(event, scoreAsc, setScoreAsc, list, setList)}>Score</Button>

				<Label>Remove</Label>
			</TitleDiv>

			<>
				{list.map((item) => (
					<ItemPlan key={item.mal_id} user={user} anime={item} list={list} setList={setList} />
				))}
			</>
		</Wrapper>
	);
};

export default ProfilePlan;
