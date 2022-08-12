import { Episode, EpisodeLabel, EpisodeList, SubTitle } from "styles/AnimeDetailsStyles";
import React, { useEffect, useState } from "react";

import CircularProg from "utils/porgress/CircularProg";

/**
 * Displays information of the first 100 episodes of an anime
 * @param {*} param0
 * @returns
 */
const AnimeEpisodes = ({ anime, id }) => {
	const [episodes, setEpisodes] = useState(null);
	//get anime with id from params
	useEffect(() => {
		const getEpisodes = async () => {
			const data = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`).then((res) => res.json());
			setEpisodes(data.data);
		};
		//add timeout because the jikkan api only allows 3 requests per second, this will bypass that
		try {
			setTimeout(() => getEpisodes(), 1500);
		} catch (error) {
			window.location.reload();
		}
	}, [id, anime]);

	//wait for episodes to be loaded
	if (!episodes) {
		return <CircularProg />;
	}

	return (
		<div>
			{episodes && episodes.length > 0 && <SubTitle>Episodes: </SubTitle>}
			{episodes && episodes.length > 0 && (
				<EpisodeList>
					<Episode style={{ border: "none" }}>
						<EpisodeLabel>#</EpisodeLabel>
						<EpisodeLabel>Score (/5):</EpisodeLabel>
						<EpisodeLabel>Aired:</EpisodeLabel>
						<EpisodeLabel>Title:</EpisodeLabel>
					</Episode>

					{episodes.map((ep, index) => {
						return (
							<Episode key={index}>
								<EpisodeLabel>{index + 1}</EpisodeLabel>
								<EpisodeLabel>{ep.score}</EpisodeLabel>
								{ep.aired ? <EpisodeLabel>{ep.aired.split("T")[0]} </EpisodeLabel> : <EpisodeLabel>Not Out Yet</EpisodeLabel>}
								<EpisodeLabel>"{ep.title}"</EpisodeLabel>
							</Episode>
						);
					})}
				</EpisodeList>
			)}
		</div>
	);
};

export default AnimeEpisodes;
