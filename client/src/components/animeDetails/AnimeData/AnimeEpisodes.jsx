/* eslint-disable react-hooks/exhaustive-deps */

import { Episode, EpisodeLabel, EpisodeList, SubTitle } from "styles/AnimeDetailsStyles";
import React, { useContext, useEffect } from "react";

import { AnimeDetailsContext } from "context/AnimeDetailsContext";
import CircularProg from "utils/porgress/CircularProg";

/**
 * Displays information of the first 100 episodes of an anime
 * @param {*} param0
 * @returns
 */
const AnimeEpisodes = ({ anime, id }) => {
	const { episodes } = useContext(AnimeDetailsContext);
	const { getEpisodes } = useContext(AnimeDetailsContext).actions;

	useEffect(() => {
		getEpisodes(id);
	}, [anime, id]);

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
