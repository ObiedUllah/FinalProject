import React, { useState } from "react";

import styled from "styled-components";

const AddToListSection = () => {
	const [isFavorite, setIsFavorite] = useState(() => false);
	const [rating, setRating] = useState(() => "");
	const [status, setStatus] = useState(() => "Plan to Watch");

	const handleStatusChange = (event) => {
		console.log("✅" + event.target.value);
		setStatus(event.target.value);
	};

	const handleRatingChange = (event) => {
		console.log("✅" + event.target.value);
		setRating(event.target.value);
	};

	const handleFavoriteChange = (event) => {
		if (event.target.checked) {
			console.log("✅ Checkbox is checked");
		} else {
			console.log("⛔️ Checkbox is NOT checked");
		}
		setIsFavorite((current) => !current);
	};

	const handleAddToList = (event) => {
		event.preventDefault();

		//make sure the user selected a rating
		if (status === "completed" && isNaN(parseInt(rating))) {
			alert("Select a Rating, you may change it later");
			return;
		}
		console.log("✅");
	};

	return (
		<Wrapper>
			<Select id="status" onChange={handleStatusChange} value={status}>
				<Option value="plan">Plan to Watch</Option>
				<Option value="completed">Completed</Option>
			</Select>

			<Select id="rating" disabled={status !== "completed"} onChange={handleRatingChange}>
				<Option value="" disabled selected defaultValue>
					Rating
				</Option>
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

			<Button onClick={handleAddToList}>Add to List</Button>
			<div>
				<label htmlFor="favorite">Favorite</label>
				<input type="checkbox" value={isFavorite} onChange={handleFavoriteChange} id="favorite" name="favorite" />
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	border: 2px solid #aaa;
	border-radius: 2px;
	padding: 22px;
	margin: 16px;
`;

const Button = styled.button`
	backface-visibility: hidden;
	background-color: #405cf5;
	border-radius: 6px;
	border-width: 0;
	box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset, rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
	box-sizing: border-box;
	color: #fff;
	cursor: pointer;
	height: 35px;
	line-height: 1.15;
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
export default AddToListSection;
