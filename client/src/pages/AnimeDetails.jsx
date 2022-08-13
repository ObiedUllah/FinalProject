/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect } from "react";

import AddToListSection from "components/animeDetails/AddToListSection";
import { AnimeDetailsContext } from "context/AnimeDetailsContext";
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

	const { anime } = useContext(AnimeDetailsContext);
	const { getAnime } = useContext(AnimeDetailsContext).actions;

	useEffect(() => {
		getAnime(id);
	}, [anime, id]);

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
