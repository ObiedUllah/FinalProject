import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import styled from "styled-components";

const InformationSection = ({ anime, id }) => {
	console.log(anime);
	const [episodes, setEpisodes] = useState(null);

	//get anime with id from params
	useEffect(() => {
		const getAnime = async () => {
			const data = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`).then((res) => res.json());
			setEpisodes(data.data);
		};
		getAnime();
	}, [id, anime]);

	return (
		<Wrapper>
			<First>
				<Image src={anime.images.jpg.image_url} />

				{/* INFO BELOW IMAGE */}
				<Information>
					<Title>Information: </Title>
					<Container>
						<InformationLabel>Type: </InformationLabel>
						<InformationData>{anime.type}</InformationData>
					</Container>

					<Container>
						<InformationLabel>Episodes: </InformationLabel>
						<InformationData>{anime.episodes}</InformationData>
					</Container>

					<Container>
						<InformationLabel>Status: </InformationLabel>
						<InformationData>{anime.status}</InformationData>
					</Container>

					<Container>
						<InformationLabel>Aired: </InformationLabel>
						{anime?.aired?.to ? (
							<InformationData>{anime.aired.to.split("T")[0]}</InformationData>
						) : (
							<InformationData>Not Aired</InformationData>
						)}
					</Container>

					<Container>
						<InformationLabel>Rating: </InformationLabel>
						<InformationData>{anime.rating}</InformationData>
					</Container>

					<Container>
						<InformationLabel>Duration: </InformationLabel>
						<InformationData>{anime.duration}</InformationData>
					</Container>

					<Container>
						<InformationLabel>Themes: </InformationLabel>
						{anime.themes ? (
							<InformationData>{anime.themes.map((item) => item.name + ", ")}</InformationData>
						) : (
							<InformationData>No Themes</InformationData>
						)}
					</Container>

					<Container>
						<InformationLabel>Genres: </InformationLabel>
						{anime.genres ? (
							<InformationData>{anime.genres.map((item) => item.name + ", ")}</InformationData>
						) : (
							<InformationData>No Genres</InformationData>
						)}
					</Container>

					<Container>
						<InformationLabel>Studios: </InformationLabel>
						{anime.studios ? (
							<InformationData>{anime.studios.map((item) => item.name + ", ")}</InformationData>
						) : (
							<InformationData>No Studios</InformationData>
						)}
					</Container>

					<Container>
						<InformationLabel>Licensors: </InformationLabel>
						{anime.licensors ? (
							<InformationData>{anime.licensors.map((item) => item.name + ", ")}</InformationData>
						) : (
							<InformationData>No Licensors</InformationData>
						)}
					</Container>

					<Container>
						<InformationLabel>Producers: </InformationLabel>
						{anime.producers ? (
							<InformationData>{anime.producers.map((item) => item.name + ", ")}</InformationData>
						) : (
							<InformationData>No producers</InformationData>
						)}
					</Container>
				</Information>

				{/* ANIME STATS  */}
				<Information style={{ marginTop: "20px" }}>
					<Title>Stats:</Title>

					<Container>
						<InformationLabel>Score: </InformationLabel>
						<InformationData>{anime.score}</InformationData>
					</Container>

					<Container>
						<InformationLabel>Scored By: </InformationLabel>
						<InformationData>{anime.scored_by}</InformationData>
					</Container>

					<Container>
						<InformationLabel>Popularity: </InformationLabel>
						<InformationData>{anime.popularity}</InformationData>
					</Container>

					<Container>
						<InformationLabel>Ranking: </InformationLabel>
						<InformationData>{anime.rank}</InformationData>
					</Container>
				</Information>
			</First>

			<Second>
				{/* ANIME SYNOPSIS  */}
				<Background>
					<Title>Synopsis: </Title>
					{anime.synopsis ? <Synopsis>{anime.synopsis}</Synopsis> : <Synopsis>Unavailable</Synopsis>}
					<Title>Background: </Title>
					{anime.background ? <Synopsis>{anime.background}</Synopsis> : <Synopsis>Unavailable</Synopsis>}
				</Background>

				{/* ANIME EPISODES */}
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
								<Episode>
									<EpisodeLabel>{episodes.length - index}</EpisodeLabel>
									<EpisodeLabel>{ep.score}</EpisodeLabel>
									{ep.aired ? <EpisodeLabel>{ep.aired.split("T")[0]} </EpisodeLabel> : <EpisodeLabel>Not Out Yet</EpisodeLabel>}
									<EpisodeLabel>"{ep.title}"</EpisodeLabel>
								</Episode>
							);
						})}
					</EpisodeList>
				)}

				{/* ANIME RELATIONS  */}
				{anime.relations && anime.relations.length > 0 && <SubTitle>Relations: </SubTitle>}
				{anime.relations && (
					<RelationList>
						{anime.relations.map((item, index) => {
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
			</Second>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	padding: 16px;
`;

const First = styled.div`
	display: flex;
	flex-direction: column;
`;

const Image = styled.img`
	width: 250px;
	height: 350px;
`;

const Background = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px 16px;
	max-height: 350px;
	overflow: hidden;
`;

const Title = styled.h1`
	width: 100%;
	border-bottom: 1px solid #999;
`;

const SubTitle = styled.h1`
	width: 97%;
	border-bottom: 1px solid #999;
	margin-left: 20px;
	margin-top: 16px;
`;

const Synopsis = styled.p`
	padding: 16px 0px;
`;

const Second = styled.div`
	display: flex;
	flex-direction: column;
`;

const Information = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 20px;
	flex-basis: 250px;
`;

const Container = styled.div`
	display: flex;
	padding-top: 14px;
`;

const InformationLabel = styled.h2``;

const InformationData = styled.p`
	padding-left: 10px;
`;

const EpisodeList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-y: auto;
	border: 1px solid black;
	margin-left: 20px;
	margin-top: 16px;
	max-height: 400px;
	padding: 8px;
`;

const Episode = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-top: 8px;
	border: 1px solid #666;
	padding: 10px;
	width: 95%;
`;

const EpisodeLabel = styled.p`
	flex-basis: 22%;
	text-align: center;
`;

const RelationList = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	border: 1px solid black;
	margin-left: 20px;
	margin-top: 16px;
	max-height: 400px;
	padding: 14px;
`;

const Relation = styled.div`
	margin-top: 10px;
`;

const Link = styled(NavLink)`
	text-decoration: none;
	color: inherit;

	transition: 0.4s;

	&:hover {
		background-color: #444;
		color: #888;
	}
`;

const Anchor = styled.a`
	text-decoration: none;
	color: inherit;

	transition: 0.4s;

	&:hover {
		background-color: #313131;
		color: blue;
	}
`;

export default InformationSection;
