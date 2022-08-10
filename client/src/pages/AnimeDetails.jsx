import { useEffect, useState } from "react";

import AddToListSection from "components/animeDetails/AddToListSection";
import CircularProg from "utils/porgress/CircularProg";
import InformationSection from "components/animeDetails/InformationSection";
import React from "react";
import VideoSection from "components/animeDetails/VideoSection";
import { useParams } from "react-router-dom";

const AnimeDetails = () => {
	//this will capture the id of the anime clicked
	const { id } = useParams();

	//store anime
	const [anime, setAnime] = useState(null);

	//get anime with id from params
	useEffect(() => {
		const getAnime = async () => {
			const data = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`).then((res) => res.json());
			setAnime(data.data);
		};
		getAnime();
	}, [id]);

	//if the anime is null then wait
	if (!anime) {
		return <CircularProg />;
	}

	return (
		<>
			<VideoSection anime={anime} id={id} />
			<AddToListSection anime={anime} />
			<InformationSection anime={anime} id={id} />
		</>
	);
};

export default AnimeDetails;
