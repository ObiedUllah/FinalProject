import { useEffect, useState } from "react";

import CircularProg from "utils/porgress/CircularProg";
import React from "react";
import VideoSection from "components/animeDetails/VideoSection";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const AnimeDetails = () => {
	//this will capture the id of the anime clicked
	const { id } = useParams();

	//store anime
	const [anime, setAnime] = useState(() => null);

	//get anime with id from params
	useEffect(() => {
		const getAnime = async () => {
			const anime = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`).then((res) => res.json());
			setAnime(anime.data);
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
		</>
	);
};

export default AnimeDetails;
