import { useEffect, useState } from "react";

import CircularProg from "utils/porgress/CircularProg";
import ProfileSongs from "components/songLibrary/list/ProfileSongs";
import SongHeader from "components/songLibrary/header/SongHeader";
import { useAuth0 } from "@auth0/auth0-react";

const SongLibrary = () => {
	const [dbUser, setDbUser] = useState(() => null);
	const { user } = useAuth0();

	const [songList, setSongList] = useState(() => null);
	//gets the user from the mongo db
	useEffect(() => {
		const getUser = async () => {
			const response = await fetch(`/api/user/${user.email}`);
			const result = await response.json();
			setDbUser(result.data);
			setSongList(result.data.songList);
		};
		getUser();
	}, [user]);

	//wait until user from db is retrived
	if (!dbUser) {
		return <CircularProg />;
	}

	//wait until user from db is retrived
	if (!songList) {
		return <CircularProg />;
	}

	return (
		<div>
			<SongHeader songList={songList} />
			<ProfileSongs user={dbUser} />
		</div>
	);
};

export default SongLibrary;
