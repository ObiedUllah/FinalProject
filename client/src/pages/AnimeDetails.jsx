import DetailsProvider, { DetailsContext } from "context/DetailsContext";
import { useContext, useEffect, useState } from "react";

import CircularProg from "utils/porgress/CircularProg";
import React from "react";
import VideoSection from "components/animeDetails/VideoSection";
import { useParams } from "react-router-dom";

const AnimeDetails = () => {
	//this will capture the id of the anime clicked
	const { id } = useParams();

	const { anime } = useContext(DetailsContext).value;
	const { setId, setAnime, setAnimeTheme } = useContext(DetailsContext).actions;

	//get anime with id from params
	//get theme
	useEffect(() => {
		const getAnime = async () => {
			const anime = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`).then((res) => res.json());
			setId(id);
			setAnime(anime.data);
		};
		const getInitialTheme = async () => {
			const response = await fetch(`/api/video/${anime?.theme.openings[0] + " opening"}`).then((res) => res.json());
			setAnimeTheme(response.data);
		};
		getAnime();
		getInitialTheme();
	}, [id]);

	//if the anime is null then wait
	if (!anime) {
		return <CircularProg />;
	}

	return (
		<DetailsProvider>
			<VideoSection />
		</DetailsProvider>
	);
};

export default AnimeDetails;
