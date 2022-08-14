/* eslint-disable react-hooks/exhaustive-deps */

import { Episode, EpisodeLabel, EpisodeList, SubTitle } from "styles/AnimeDetailsStyles";
import React, { useEffect, useState } from "react";

import CircularProg from "utils/porgress/CircularProg";

/**
 * Displays information of the first 100 episodes of an anime
 * @param {*} param
 * @returns
 */
const AnimeEpisodes = ({ anime, id }) => {
	const [episodes, setEpisodes] = useState(() => null);

	useEffect(() => {
		let isCancelled = false;

		const getEpisodes = async () => {
			if (!isCancelled) {
				const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`);

				//if failure then refresh after 2 sec
				if (response.status === 429) getEpisodes();

				//if success then set data
				if (response.status === 200) {
					const data = await response.json();
					setEpisodes(data.data);
				}
			}
		};
		getEpisodes();

		return () => {
			isCancelled = true;
		};
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
