import styled from "styled-components";

const Pagination = ({ pagination, handleNumClick }) => {
	const { last_visible_page, has_previous_page, has_next_page, current_page, items } = pagination;
	const { total, per_page } = items;

	const totalPages = Math.ceil(total / per_page);

	const pageButtons = [];
	for (let i = 1; i <= last_visible_page; i++) {
		pageButtons.push(
			<PageButton key={i} value={i} active={i === current_page} onClick={handleNumClick}>
				{i}
			</PageButton>
		);
	}

	return (
		<Wrapper>
			{has_previous_page && (
				<PageButton value={current_page - 1} onClick={handleNumClick}>
					Previous
				</PageButton>
			)}
			{pageButtons}
			{has_next_page && (
				<PageButton value={current_page + 1} onClick={handleNumClick}>
					Next
				</PageButton>
			)}
			<PaginationInfo>
				{current_page} / {totalPages}
			</PaginationInfo>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: right;
	margin-top: 10px;
	align-self: right;
	width: 90%;
`;

const PageButton = styled.button`
	padding: 8px 12px;
	margin: 0 5px;
	border-radius: 5px;
	border: 1px solid #ccc;
	background-color: ${(props) => (props.active ? "#111" : "#333")};
	color: #fff;
	cursor: pointer;
	&:hover {
		background-color: ${(props) => (props.active ? "#ccc" : "#eee")};
		color: #111;
	}
`;

const PaginationInfo = styled.span`
	margin: 0 1px;
	font-size: 14px;
	margin-top: 10px;
`;

export default Pagination;
