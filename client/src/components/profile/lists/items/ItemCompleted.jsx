import { Anchor, Button, Image, Label, Option, Select, Wrapper } from "styles/profile/ProfileItemStyles";
import React, { useState } from "react";
import { handleRemoveFromList, handleStatusChange } from "../ProfileHelpers";

/**
 * Single Anime that a user has completed
 * @param {*} param0
 * @returns
 */
const ItemCompleted = ({ user, anime, list, setList }) => {
	const [rating, setRating] = useState(() => anime.rating);

	/**
	 * updates the rating and changes it in the database
	 * @param {*} e
	 */
	const updateRating = async (e) => {
		//data to send to db
		let body = {
			email: user.email,
			data: {
				mal_id: anime.mal_id,
				title: anime.title,
				image: anime.image,
				score: anime.score,
				status: anime.status,
				rating: e.target.value,
			},
		};

		//set value in frontend
		setRating(parseInt(e.target.value));
		setList([...list.map((obj) => (body.data.mal_id === obj.mal_id ? body.data : obj))]);

		try {
			//update the rating for the completed anime in the database
			await fetch("/api/user/status", {
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
			<Label>
				<Select id="status" onChange={(e) => handleStatusChange(e, list, setList, anime, user.email, "plan", 0, false)} value={anime.status}>
					<Option value="plan">Plan to Watch</Option>
					<Option value="completed">Completed</Option>
				</Select>
			</Label>
			<Label>
				<Select id="rating" onChange={updateRating} value={rating}>
					{[...Array(11).keys()]
						.map((i) => i)
						.map((index) => {
							return (
								<Option key={index} value={index}>
									{index}
								</Option>
							);
						})}
				</Select>
			</Label>
			<Label>{anime.score}</Label>

			<Label>
				<Button onClick={(e) => handleRemoveFromList(e, list, setList, anime, user.email)}>Remove</Button>
			</Label>
		</Wrapper>
	);
};

export default ItemCompleted;
