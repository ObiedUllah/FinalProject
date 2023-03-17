import ItemSong from "./ItemSong";
import styled from "styled-components";
import { useState } from "react";

const ProfileSongs = ({ user }) => {
	console.log(user);
	const [list, setList] = useState(() => user.songList);

	return (
		<Wrapper>
			{list.map((item) => (
				<ItemSong key={item.mal_id} user={user} song={item} list={list} setList={setList} />
			))}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 15px;
	border: none;
	padding-bottom: 8px;
`;

const Label = styled.label`
	font-size: 20px;
	margin: 1vh 0vh;
	width: 12vw;
	text-align: center;
`;

const TitleDiv = styled.div`
	display: flex;
	justify-content: space-around;
	border-bottom: 3px solid #777;
`;

const ThemeTitle = styled.div`
	width: 70%;
	font-size: 20px;
	margin: 1vh 0vh;
	text-align: center;
`;

export default ProfileSongs;
