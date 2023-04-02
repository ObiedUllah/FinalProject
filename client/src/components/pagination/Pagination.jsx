import styled from "styled-components";

/**
 * Pagination for the search page
 * @param {*} param0
 * @returns
 */
const Pagination = ({ pagination, handleNumClick }) => {
	const { has_previous_page, has_next_page, current_page, last_visible_page, items } = pagination;
	const { total, per_page } = items;

	const totalPages = Math.ceil(total / per_page);
	// Maximum number of visible pages at once
	const MAX_VISIBLE_PAGES = 5;

	// Calculate the range of pages to display
	let startPage = 1;
	let endPage = totalPages;
	if (totalPages > MAX_VISIBLE_PAGES) {
		const midPage = Math.floor(MAX_VISIBLE_PAGES / 2) + 1;
		if (current_page > midPage) {
			startPage = current_page - midPage + 1;
			endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);
		} else {
			endPage = MAX_VISIBLE_PAGES;
		}
	}

	// Generate the page buttons
	const pageButtons = [];
	for (let i = startPage; i <= endPage; i++) {
		pageButtons.push(
			<PageButton key={i} value={i} active={i === current_page} onClick={handleNumClick}>
				{i}
			</PageButton>
		);
	}

	return (
		<Wrapper>
			<NavigationButton onClick={handleNumClick} value={1} disabled={!has_previous_page}>
				&laquo; Previous
			</NavigationButton>
			{pageButtons}
			<NavigationButton onClick={handleNumClick} value={last_visible_page} disabled={!has_next_page}>
				Next &raquo;
			</NavigationButton>
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
	background-color: ${(props) => (props.active ? "#111" : "#666")};
	color: #fff;
	cursor: pointer;
	&:hover {
		background-color: ${(props) => (props.active ? "#ccc" : "#eee")};
		color: #111;
	}
`;

const NavigationButton = styled.button`
	padding: 8px 12px;
	margin: 0 5px;
	border-radius: 5px;
	border: 1px solid #ccc;
	background-color: #333;
	color: #fff;
	cursor: pointer;
	&:hover {
		background-color: #eee;
		color: #111;
	}
	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export default Pagination;
