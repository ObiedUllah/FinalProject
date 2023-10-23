import { Option, Select } from "styles/profile/ProfileItemStyles";
import { handleRemoveFromList, handleStatusChange } from "../ProfileHelpers";

import { Link } from "react-router-dom";
import styled from "styled-components";

const Dialog = ({
	user,
	anime,
	onCancel,
	handleChangeStatusSelect,
	handleRatingChange,
	list,
	setList,
	setLoading,
	rating,
	status,
	toDisplay = true,
	completed,
}) => {
	return (
		<Overlay>
			<DialogBox>
				<Anchor to={`/anime/${anime.mal_id}`}>
					<Image src={anime.image} />
				</Anchor>
				<Anchor to={`/anime/${anime.mal_id}`}>{anime.title}</Anchor>

				<div style={{ display: "flex", flexDirection: "column" }}>
					{completed ? (
						<Select
							id="status"
							onChange={(event) =>
								onCancel(event) && handleStatusChange(event, list, setList, anime, user.email, "plan", 0, false, setLoading)
							}
							value={anime.status}
						>
							<Option value="plan">Plan to Watch</Option>
							<Option value="completed">Completed</Option>
						</Select>
					) : (
						<Select id="status" onChange={handleChangeStatusSelect} value={status}>
							<Option value="plan">Plan to Watch</Option>
							<Option value="completed">Completed</Option>
						</Select>
					)}

					<div>
						{toDisplay && (
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
						)}

						<AddButton onClick={(event) => handleStatusChange(event, list, setList, anime, user.email, status, rating, true, setLoading)}>
							Add to List
						</AddButton>
					</div>
				</div>

				<RemoveButton onClick={(event) => handleRemoveFromList(event, list, setList, anime, user.email)}>Remove</RemoveButton>

				<CancelButton onClick={onCancel}>Cancel</CancelButton>
			</DialogBox>
		</Overlay>
	);
};
const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
`;

const DialogBox = styled.div`
	background: #333;
	width: 300px;
	height: 500px;
	border-radius: 5px;
	text-align: center;
	border: 3px solid green;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const CancelButton = styled.button`
	background: inherit;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	width: 150px;
	border: 4px solid black;
	padding: 5px;
`;

const Image = styled.img`
	height: 200px;
	margin-bottom: 10px;
`;

const Anchor = styled(Link)`
	margin-bottom: 10px;
`;

const AddButton = styled.button`
	width: 150px;
	margin: 10px 3px;
	padding: 6px 0px;
	background: blue;
	color: white;

	border-radius: 5px;
`;

const RemoveButton = styled.button`
	width: 150px;
	margin-bottom: 10px;
	padding: 6px 0px;
	background: red;
	color: white;
	border-radius: 5px;
`;

export default Dialog;
