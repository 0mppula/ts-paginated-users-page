import { FC } from 'react';

interface PaginatorProps {
	activePage: number;
	lastPage: number;
	incrementPage: Function;
	decrementPage: Function;
}

const Paginator: FC<PaginatorProps> = ({ activePage, lastPage, incrementPage, decrementPage }) => {
	return (
		<div className="paginator-container">
			<button className="btn" onClick={() => decrementPage()}>
				Previous
			</button>
			<p>
				{activePage} / {lastPage || 1}
			</p>
			<button className="btn" onClick={() => incrementPage()}>
				Next
			</button>
		</div>
	);
};

export default Paginator;
