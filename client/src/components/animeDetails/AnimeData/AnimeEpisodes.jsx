import { Episode, EpisodeLabel, EpisodeList, SubTitle } from "styles/AnimeDetailsStyles";
import React, { useEffect, useState } from "react";

const AnimeEpisodes = ({ anime, id }) => {
	const [episodes, setEpisodes] = useState(null);
	//get anime with id from params
	useEffect(() => {
		const getEpisodes = async () => {
			const data = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`).then((res) => res.json());
			setEpisodes(data.data);
		};
		getEpisodes();
	}, [id, anime]);

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
