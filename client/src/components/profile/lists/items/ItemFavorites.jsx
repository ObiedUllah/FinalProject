import { Anchor, Button, Image, Label, Wrapper } from "styles/profile/ProfileItemStyles";

import React from "react";

/**
 * Single Anime that a user has favorited
 * @param {*} param0
 * @returns
 */
const ItemFavorites = ({ user, anime, list, setList }) => {
	/**
	 * removes the anime from favorites list
	 * @param {*} e
	 */
	const removeAnimeFromFavorites = async (e) => {
		e.preventDefault();

		//handle frontend first
		setList([...list.filter((elem) => elem.mal_id !== anime.mal_id)]);

		//data to send to db
		const body = {
			email: user.email,
			data: {
				mal_id: anime.mal_id,
				title: anime.title,
				image: anime.image,
				score: anime.score,
				type: anime?.type,
			},
		};

		try {
			//update the favorites in the database
			await fetch("/api/user/favorite", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
		} catch (error) {
			alert("An error occured please try again or contact support");
		}
	};

	return (
		<Wrapper>
			<Label>
				<Anchor to={`/anime/${anime.mal_id}`}>
					<Image src={anime.image} />
				</Anchor>
			</Label>
			<Anchor to={`/anime/${anime.mal_id}`}>
				<Label>{anime.title}</Label>
			</Anchor>
			<Label>{anime.score}</Label>

			<Label>
				<Button confirm={false} onClick={removeAnimeFromFavorites}>
					Remove
				</Button>
			</Label>
		</Wrapper>
	);
};

export default ItemFavorites;
