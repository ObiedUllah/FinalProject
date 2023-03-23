import ItemSong from "./ItemSong";
import styled from "styled-components";
import { useState } from "react";

const ProfileSongs = ({ user }) => {
	const [list, setList] = useState(() => user.songList);

	return (
		<Wrapper>
			{list.map((item, index) => (
				<ItemSong key={item.theme + index} user={user} song={item} list={list} setList={setList} index={index} />
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

export default ProfileSongs;
