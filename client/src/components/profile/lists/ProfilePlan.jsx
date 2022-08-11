import React, { useState } from "react";
import { sortByScore, sortByTitle } from "./ProfileHelpers";

import ItemPlan from "./items/ItemPlan";
import styled from "styled-components";

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

export default ProfilePlan;
