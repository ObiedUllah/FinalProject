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

	//store anime
	const [anime, setAnime] = useState(null);

	//get anime with id from params
	useEffect(() => {
		const getAnime = async () => {
			const data = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`).then((res) => res.json());
			setAnime(data.data);
		};
		//add timeout because the jikkan api only allows 3 requests per second, this will bypass that
		setTimeout(() => getAnime(), 1000);
	}, [id]);

	//if the anime is null then wait
	if (!anime) {
		return (
			<>
				<CircularProg />
				<p style={{ textAlign: "center", marginTop: "30%" }}> Whoops! Too many requests were made!</p>
				<p style={{ textAlign: "center", marginTop: "30%" }}> Refresh the page!</p>
			</>
		);
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
