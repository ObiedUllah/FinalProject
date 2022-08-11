import { Button, Label, TitleDiv, Wrapper } from "styles/profile/ProfileHeaderStyles";
import React, { useState } from "react";
import { sortByScore, sortByTitle } from "./ProfileHelpers";

import ItemFavorites from "./items/ItemFavorites";

const ProfileFavorites = ({ user }) => {
	const [list, setList] = useState(() => user.favorites);
	const [titleAsc, setTitleAsc] = useState(false);
	const [scoreAsc, setScoreAsc] = useState(false);
	return (
		<Wrapper>
			<TitleDiv>
				<Label>Image</Label>
				<Button onClick={(e) => sortByTitle(e, titleAsc, setTitleAsc, list, setList)}>Title</Button>
				<Button onClick={(e) => sortByScore(e, scoreAsc, setScoreAsc, list, setList)}>Score</Button>
				<Label>Remove</Label>
			</TitleDiv>
			<>
				{list.map((item) => (
					<ItemFavorites key={item.mal_id} user={user} anime={item} list={list} setList={setList} />
				))}
			</>
		</Wrapper>
	);
};

export default ProfileFavorites;
