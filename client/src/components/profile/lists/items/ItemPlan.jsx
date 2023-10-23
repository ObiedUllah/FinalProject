import { Anchor, Button, Image, Label, Option, Select, Wrapper } from "styles/profile/ProfileItemStyles";
import { handleRemoveFromList, handleStatusChange } from "../ProfileHelpers";

import { CircularProgress } from "@mui/material";
import Dialog from "./Dialog";
import { useState } from "react";

/**
 * Single Anime that a user plans to watch
 * @param {*} param0
 * @returns
 */
const ItemPlan = ({ user, anime, list, setList }) => {
	const isMobile = window.innerWidth <= 768;

	const [rating, setRating] = useState(() => 0);
	const [status, setStatus] = useState(() => anime.status);

	//dialog box to change status
	const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);

	//displays the rating if the user completed the anime
	const [toDisplay, setToDisplay] = useState(false);
	//loading state while db updates
	const [loading, setLoading] = useState(() => null);

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

	const onOpen = async (event) => {
		event.preventDefault();
		setConfirmDialogOpen(true);
	};

	const onCancel = async (event) => {
		event.preventDefault();
		setConfirmDialogOpen(false);
	};

	//load while waiting for db to update
	if (loading === "loading") {
		return <CircularProgress height={12} />;
	}

	if (isConfirmDialogOpen) {
		return (
			<Dialog
				user={user}
				anime={anime}
				onCancel={onCancel}
				handleChangeStatusSelect={handleChangeStatusSelect}
				handleRatingChange={handleRatingChange}
				list={list}
				setList={setList}
				setLoading={setLoading}
				rating={rating}
				status={status}
				toDisplay={toDisplay}
			/>
		);
	}

	if (isMobile) {
		return (
			<Wrapper onClick={onOpen}>
				<Label>
					<Image src={anime.image} />
				</Label>
				<Label>{anime.title}</Label>
				<Label>{anime.score}</Label>
			</Wrapper>
		);
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
							<Button
								confirm={true}
								onClick={(event) => handleStatusChange(event, list, setList, anime, user.email, status, rating, true, setLoading)}
							>
								Add to List
							</Button>
						</div>
					)}
				</div>
			</Label>
			<Label>{anime.score}</Label>

			<Label>
				<Button confirm={false} onClick={(event) => handleRemoveFromList(event, list, setList, anime, user.email)}>
					Remove
				</Button>
			</Label>
		</Wrapper>
	);
};

export default ItemPlan;
