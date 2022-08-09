import React, { useEffect, useState } from "react";

import styled from "styled-components";

const InformationSection = ({ anime, id }) => {
	console.log(anime);
	const [episodes, setEpisodes] = useState(null);

	//get anime with id from params
	useEffect(() => {
		const getAnime = async () => {
			const data = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`).then((res) => res.json());
			console.log(data);
			setEpisodes(data.data);
		};
		getAnime();
	}, [id, anime]);

	return (
		<Wrapper>
			<First>
				<Image src={anime.images.jpg.image_url} />
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
						{anime.aired.to ? (
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
			</First>

			<Second>
				<Background>
					<Title>Synopsis: </Title>
					{anime.synopsis ? <Synopsis>{anime.synopsis}</Synopsis> : <Synopsis>Unavailable</Synopsis>}
					<Title>Background: </Title>
					{anime.background ? <Synopsis>{anime.background}</Synopsis> : <Synopsis>Unavailable</Synopsis>}
				</Background>
				<EpisodeList>
					<Title>Episodes: </Title>
					<Episode style={{ border: "none" }}>
						<EpisodeLabel>#</EpisodeLabel>
						<EpisodeLabel>Score:</EpisodeLabel>
						<EpisodeLabel>Aired:</EpisodeLabel>
						Title
					</Episode>
					{episodes &&
						episodes.map((ep, index) => {
							return (
								<Episode>
									<EpisodeLabel>{episodes.length - index}</EpisodeLabel>
									<EpisodeLabel>{ep.score}</EpisodeLabel>
									<EpisodeLabel>{ep.aired.split("T")[0]} </EpisodeLabel>
									<EpisodeLabel>"{ep.title}"</EpisodeLabel>
								</Episode>
							);
						})}
				</EpisodeList>
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
	padding: 0px 16px;
	height: 370px;
`;

const Title = styled.h1`
	width: 98%;
	border-bottom: 1px solid #999;
`;

const Synopsis = styled.p`
	padding: 16px 0px;
	flex-shrink: 0;
	flex-grow: 0;
`;

const Second = styled.div`
	display: flex;
	flex-direction: column;
`;

const Information = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 16px;
	flex-basis: 250px;
`;

const Container = styled.div`
	display: flex;
	padding-top: 10px;
`;

const InformationLabel = styled.h2``;

const InformationData = styled.p`
	padding-left: 10px;
`;

const EpisodeList = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 20px;
	max-height: 400px;
	overflow-y: auto;
`;

const Episode = styled.div`
	display: flex;
	margin-top: 8px;
	border: 1px solid #666;
	padding: 10px;
	width: 95%;
`;

const EpisodeLabel = styled.p`
	flex-basis: 150px;
`;

export default InformationSection;
