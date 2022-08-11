import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ItemPlan = ({ user, anime, list, setList }) => {
	const [toDisplay, setToDisplay] = useState(false);
	const [rating, setRating] = useState(() => 0);
	const [status, setStatus] = useState(() => anime.status);

	const handleStatusChange = async (event) => {
		if (event.target.value === "plan") {
			setToDisplay(false);
			setStatus("plan");
		} else {
			setToDisplay(true);
			setStatus("completed");
		}
	};

	const handleRatingChange = (event) => {
		setRating(event.target.value);
	};

	const handleAddToCompleted = async (event) => {
		event.preventDefault();

		//data to send to db
		let body = {
			email: user.email,
			data: {
				mal_id: anime.mal_id,
				title: anime.title,
				image: anime.image,
				score: anime.score,
				type: anime?.type,
				status: status,
				rating: rating,
			},
		};

		try {
			//update the favorites in the database
			const response = await fetch("/api/user/status", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			const result = await response.json();

			//change status
			if (result.status === 200) {
				setList([...list.filter((elem) => elem.mal_id !== anime.mal_id)]);
			}
		} catch (error) {
			alert("An error occured please try again or contact support");
		}
	};

	const handleRemoveFromList = async (event) => {
		event.preventDefault();
		//data to send to db
		const body = {
			email: user.email,
			data: { mal_id: anime.mal_id },
		};

		//handle frontend first
		setList([...list.filter((elem) => elem.mal_id !== anime.mal_id)]);

		try {
			//delete anime item from db
			await fetch("/api/user/status", {
				method: "DELETE",
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
				<div style={{ display: "flex", flexDirection: "column" }}>
					<Select id="status" onChange={handleStatusChange} value={status}>
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
							<Button confirm={true} onClick={handleAddToCompleted}>
								Add to List
							</Button>
						</div>
					)}
				</div>
			</Label>
			<Label>{anime.score}</Label>

			<Label>
				<Button confirm={false} onClick={handleRemoveFromList}>
					Delete
				</Button>
			</Label>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	border-bottom: 1px solid #777;
`;

const Image = styled.img`
	height: 15vh;
	margin: 1vh;
`;

const Label = styled.div`
	width: 12vw;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

const Button = styled.button`
	backface-visibility: hidden;
	background-color: ${(props) => (props.confirm ? "#405cf5" : "#ff726f")};
	border-radius: 6px;
	border-width: 0;
	box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset, rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
	box-sizing: border-box;
	color: #fff;
	cursor: pointer;
	height: 35px;
	width: 120px;
	padding: 0 25px;
	text-align: center;

	&:disabled {
		cursor: default;
	}

	&:focus {
		box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset, rgba(50, 50, 93, 0.2) 0 6px 15px 0, rgba(0, 0, 0, 0.1) 0 2px 2px 0,
			rgba(50, 151, 211, 0.3) 0 0 0 4px;
	}

	&:hover {
		color: #333;
	}
`;

const Select = styled.select`
	outline: none;
	border: none;
	background-color: #777;
	color: inherit;
	padding: 8px;
	border-radius: 10px;
	cursor: pointer;
`;

const Option = styled.option`
	outline: none;
	border: none;
	padding: 8px;
	cursor: pointer;
`;

const Anchor = styled(NavLink)`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-decoration: none;
	color: inherit;

	&:hover {
		img {
			width: 7vw;
			height: 10vw;
		}

		div {
			font-size: 22px;
			color: #999;
		}
	}
`;

export default ItemPlan;
