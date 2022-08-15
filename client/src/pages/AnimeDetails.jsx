/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";

import AddToListSection from "components/animeDetails/AddToListSection";
import CircularProg from "utils/porgress/CircularProg";
import InformationSection from "components/animeDetails/InformationSection";
import React from "react";
import VideoSection from "components/animeDetails/VideoSection";
import { useParams } from "react-router-dom";

/**
 * Shows the details of an anime by using 3 other componenets
 *
 * @returns
 */
const AnimeDetails = () => {
	//this will capture the id of the anime clicked
	const { id } = useParams();

	const [anime, setAnime] = useState(null);

	useEffect(() => {
		let isCancelled = false;
		const getAnime = async () => {
			if (!isCancelled) {
				const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);

				//if failure then refresh
				if (response.status === 429) getAnime();

				//if success then set data
				if (response.status === 200) {
					const data = await response.json();
					setAnime(data.data);
				}
			}
		};
		setAnime(null);
		getAnime();

		//makes sure to render only the anime with the id as param (counters user spamming animes)
		return () => {
			isCancelled = true;
		};
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
