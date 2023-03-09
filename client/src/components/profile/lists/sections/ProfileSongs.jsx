import { TitleDiv, Wrapper } from "styles/profile/ProfileHeaderStyles";

import { useState } from "react";

const ProfileSongs = ({ user }) => {
	const [list, setList] = useState(() => user.songList);

	//sorting
	const [titleAsc, setTitleAsc] = useState(false);
	const [scoreAsc, setScoreAsc] = useState(false);

	return (
		<Wrapper>
			<TitleDiv></TitleDiv>
		</Wrapper>
	);
};

export default ProfileSongs;
