import { Anchor, Button, Image, Label, Option, Select, Wrapper } from "styles/profile/ProfileItemStyles";
import React, { useState } from "react";
import { handleRemoveFromList, handleStatusChange } from "../ProfileHelpers";

const ItemPlan = ({ user, anime, list, setList }) => {
	const [toDisplay, setToDisplay] = useState(false);
	const [rating, setRating] = useState(() => 0);
	const [status, setStatus] = useState(() => anime.status);

	/**
	 * changes the status and shows the rating and add to list button
	 * @param {*} event
	 */
	const handleChangeStatusSelect = async (event) => {
		if (event.target.value === "plan") {
			setToDisplay(false);
			setStatus("plan");
		} else {
			setToDisplay(true);
			setStatus("completed");
		}
	};

	/**
	 * changes the rating
	 * @param {*} event
	 */
	const handleRatingChange = (event) => {
		setRating(event.target.value);
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
				<div style={{ display: "flex", flexDirection: "column" }}>
					<Select id="status" onChange={handleChangeStatusSelect} value={status}>
						<Option value="plan">Plan to Watch</Option>
						<Option value="completed">Completed</Option>
					</Select>

					{toDisplay && (
						<div>
							<Select id="rating" onChange={handleRatingChange} value={rating}>
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
							<Button confirm={true} onClick={(e) => handleStatusChange(e, list, setList, anime, user.email, status, rating, true)}>
								Add to List
							</Button>
						</div>
					)}
				</div>
			</Label>
			<Label>{anime.score}</Label>

			<Label>
				<Button confirm={false} onClick={(e) => handleRemoveFromList(e, list, setList, anime, user.email)}>
					Remove
				</Button>
			</Label>
		</Wrapper>
	);
};

export default ItemPlan;
