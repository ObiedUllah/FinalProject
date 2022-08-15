import { Anchor, Episode, EpisodeLabel, Link, Relation, RelationList, SubTitle, Synopsis } from "styles/AnimeDetailsStyles";

import React from "react";

/**
 * Displays other fictional series relating to the anime in question
 * @param {*} param0
 * @returns
 */
const AnimeRelations = ({ anime }) => {
	return (
		<div>
			<SubTitle>Relations: </SubTitle>
			{anime.relations.length > 0 ? (
				<RelationList>
					{anime.relations.map((item, index) => {
						return (
							<Relation key={index}>
								<EpisodeLabel style={{ textDecoration: "underline" }}>{item.relation}: </EpisodeLabel>
								<Episode style={{ border: "none" }}>
									<EpisodeLabel>Type</EpisodeLabel>
									<EpisodeLabel>Name</EpisodeLabel>
								</Episode>
								{item.entry.map((obj) => {
									if (obj.type === "anime") {
										return (
											<Link to={`/anime/${obj.mal_id}`} key={obj.mal_id}>
												<Episode>
													<EpisodeLabel>{obj.type}</EpisodeLabel>
													<EpisodeLabel>{obj.name}</EpisodeLabel>
												</Episode>
											</Link>
										);
									} else {
										return (
											<Anchor href={obj.url} target="_blank" rel="noreferrer" key={obj.mal_id}>
												<Episode>
													<EpisodeLabel>{obj.type}</EpisodeLabel>
													<EpisodeLabel>{obj.name}</EpisodeLabel>
												</Episode>
											</Anchor>
										);
									}
								})}
							</Relation>
						);
					})}
				</RelationList>
			) : (
				<Synopsis style={{ paddingLeft: "25px" }}>None</Synopsis>
			)}
		</div>
	);
};

export default AnimeRelations;
