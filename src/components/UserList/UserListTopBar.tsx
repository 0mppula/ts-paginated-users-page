import { FC, useState, useRef } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch, FaTimes } from 'react-icons/fa';

const UserListTopBar: FC = () => {
	const [query, setQuery] = useState<string>('');
	const [usernameSortOrder, setUsernameSortOrder] = useState<number>(1);
	const [ageSortOrder, setAgeSortOrder] = useState<number>(1);

	const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

	const handleSearchClick = () => {
		if (query) {
			setQuery('');
		}

		inputRef.current.focus();
	};

	const handleUsernameSort = () => {
		const nextSortOrder = -1 * usernameSortOrder;

		setUsernameSortOrder(nextSortOrder);
	};

	const handleAgeSort = () => {
		const nextSortOrder = -1 * ageSortOrder;

		setAgeSortOrder(nextSortOrder);
	};

	return (
		<div className="user-list-tools">
			<div className="tool-input-item">
				<input
					ref={inputRef}
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="search by username..."
				/>
				<div className="input-icon-container" onClick={handleSearchClick}>
					{query ? <FaTimes /> : <FaSearch />}
				</div>
			</div>

			<div className="tool-item" onClick={handleUsernameSort}>
				Username {usernameSortOrder === 1 ? <FaChevronUp /> : <FaChevronDown />}
			</div>

			<div className="tool-item" onClick={handleAgeSort}>
				Age {ageSortOrder === 1 ? <FaChevronUp /> : <FaChevronDown />}
			</div>
		</div>
	);
};

export default UserListTopBar;
