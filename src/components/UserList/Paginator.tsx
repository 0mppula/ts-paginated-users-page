import { FC } from 'react';
import ReactPaginate from 'react-paginate';

interface PaginatorProps {
	activePage: number;
	lastPage: number;
	handlePageClick: any;
}

const Paginator: FC<PaginatorProps> = ({ activePage, lastPage, handlePageClick }) => {
	return (
		<ReactPaginate
			containerClassName="paginator-container"
			breakLabel="..."
			nextLabel=">"
			onPageChange={handlePageClick}
			pageRangeDisplayed={2}
			marginPagesDisplayed={2}
			pageCount={lastPage}
			forcePage={activePage - 1}
			previousLabel="<"
			nextLinkClassName="paginator-btn"
			previousLinkClassName="paginator-btn"
			pageLinkClassName="paginator-btn"
			breakLinkClassName="paginator-btn"
			activeLinkClassName="paginator-btn active"
			disabledLinkClassName='paginator-btn disabled'
		/>
	);
};

export default Paginator;
