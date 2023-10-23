import { Anchor, Button, Image, Label, Wrapper } from "styles/profile/ProfileItemStyles";

import CircularProg from "utils/porgress/CircularProg";
import { toggleFavorites } from "endpoints/apiConfig";
import { useState } from "react";

/**
 * Single Anime that a user has favorited
 * @param {*} param0
 * @returns
 */
const ItemFavorites = ({ user, anime, list, setList }) => {
	const [loading, setLoading] = useState(() => null);

	/**
	 * removes the anime from favorites list
	 * @param {*} event
	 */
	const removeAnimeFromFavorites = async (event) => {
		event.preventDefault();

		//handle frontend first
		setLoading("loading");
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
			//updates the favorites in the database
			await fetch(toggleFavorites, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			}).then(() => setLoading(null));
		} catch (error) {
			alert("An error occured please try again or contact support");
		}
	};

	//load while waiting for db to update
	if (loading === "loading") {
		return <CircularProg height={12} />;
	}

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
					x
				</Button>
			</Label>
		</Wrapper>
	);
};

export default ItemFavorites;
