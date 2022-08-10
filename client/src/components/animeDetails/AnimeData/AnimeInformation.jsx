import { Container, Information, InformationData, InformationLabel, Title } from "styles/AnimeDetailsStyles";

import React from "react";

const AnimeInformation = ({ anime }) => {
	return (
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
				{anime?.aired?.to ? <InformationData>{anime.aired.to.split("T")[0]}</InformationData> : <InformationData>Not Aired</InformationData>}
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
	);
};

export default AnimeInformation;
