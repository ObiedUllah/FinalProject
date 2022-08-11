import { Button, Label, TitleDiv, Wrapper } from "styles/profile/ProfileHeaderStyles";
import React, { useState } from "react";
import { sortByScore, sortByTitle } from "./ProfileHelpers";

import ItemPlan from "./items/ItemPlan";

const ProfilePlan = ({ user }) => {
	const [list, setList] = useState(() => user.list.filter((item) => item.status === "plan"));
	const [titleAsc, setTitleAsc] = useState(false);
	const [scoreAsc, setScoreAsc] = useState(false);
	return (
		<Wrapper>
			<TitleDiv>
				<Label>Image</Label>
				<Button onClick={(e) => sortByTitle(e, titleAsc, setTitleAsc, list, setList)}>Title</Button>
				<Label>Status</Label>
				<Button onClick={(e) => sortByScore(e, scoreAsc, setScoreAsc, list, setList)}>Score</Button>

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
