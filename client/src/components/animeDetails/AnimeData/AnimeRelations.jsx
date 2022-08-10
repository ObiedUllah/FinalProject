import { Anchor, Episode, EpisodeLabel, Link, Relation, RelationList, SubTitle } from "styles/AnimeDetailsStyles";

import React from "react";

const AnimeRelations = ({ anime }) => {
	return (
		<div>
			{anime.relations && anime.relations.length > 0 && <SubTitle>Relations: </SubTitle>}
			{anime.relations && (
				<RelationList>
					{anime.relations.map((item) => {
						return (
							<Relation>
								<EpisodeLabel style={{ textDecoration: "underline" }}>{item.relation}: </EpisodeLabel>
								<Episode style={{ border: "none" }}>
									<EpisodeLabel>Type</EpisodeLabel>
									<EpisodeLabel>Name</EpisodeLabel>
								</Episode>
								{item.entry.map((obj) => {
									if (obj.type === "anime") {
										return (
											<Link to={`/anime/${obj.mal_id}`}>
												<Episode>
													<EpisodeLabel>{obj.type}</EpisodeLabel>
													<EpisodeLabel>{obj.name}</EpisodeLabel>
												</Episode>
											</Link>
										);
									} else {
										return (
											<Anchor href={obj.url} target="_blank" rel="noreferrer">
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
			)}
		</div>
	);
};

export default AnimeRelations;
