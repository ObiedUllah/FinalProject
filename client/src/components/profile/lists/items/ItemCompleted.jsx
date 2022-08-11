import React, { useState } from "react";

import styled from "styled-components";

const ItemCompleted = ({ user, anime, list, setList }) => {
	const [rating, setRating] = useState(() => anime.rating);
	const status = anime.status;

	/**
	 * removes an anime from the users completed list
	 * @param {*} event
	 */
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

	/**
	 * sets status of anime
	 * @param {*} event
	 */
	const handleStatusChange = async (e) => {
		e.preventDefault();
		//if completed then do nothing
		if (e.target.value === "completed") {
			return;
		}

		//update frontend list
		setList([...list.filter((elem) => elem.mal_id !== anime.mal_id)]);

		//data to send to db
		let body = {
			email: user.email,
			data: {
				mal_id: anime.mal_id,
				title: anime.title,
				image: anime.image,
				score: anime.score,
				status: "plan",
				rating: "",
			},
		};

		try {
			//update the status in the database
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

	const updateRating = async (e) => {
		//set value in frontend
		setRating(parseInt(e.target.value));

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

		//change frontend first
		setList([...list.map((obj) => (body.data.mal_id === obj.mal_id ? body.data : obj))]);

		try {
			//update the favorites in the database
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
				<Image src={anime.image} />
			</Label>
			<Label>{anime.title}</Label>
			<Label>
				<Select id="status" onChange={handleStatusChange} value={status}>
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
				<Button onClick={handleRemoveFromList}>Delete</Button>
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
	background-color: #ff726f;
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

export default ItemCompleted;
