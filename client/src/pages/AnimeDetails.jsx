/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import AddToListSection from "components/animeDetails/AddToListSection";
import CircularProg from "utils/porgress/CircularProg";
import InformationSection from "components/animeDetails/InformationSection";
import VideoSection from "components/animeDetails/VideoSection";

/**
 * Shows the details of an anime by using 3 other componenets
 *
 * @returns
 */
const AnimeDetails = () => {
	//this will capture the id of the anime clicked
	const { id } = useParams();

	const [anime, setAnime] = useState(null);

	//gets state from songList
	//only occurs when user clicks on song from right sidebar
	const location = useLocation();
	//sets index and type to be able to send it to the video and update it
	let index = null;
	let type = null;
	if (location.state) {
		index = location.state.index;
		type = location.state.type;
	}
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
	}, [id, location.state]);

	//if the anime is null then wait
	if (!anime) {
		return <CircularProg />;
	}

	return (
		<>
			<VideoSection anime={anime} id={id} index={index} type={type} />
			<AddToListSection anime={anime} />
			<InformationSection anime={anime} id={id} />
		</>
	);
};

export default AnimeDetails;
