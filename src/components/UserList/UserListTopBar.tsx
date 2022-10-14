import { FC, useRef, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

import { usersDataType } from './Users';

interface UserListTopBarProps {
	users: usersDataType[];
	setUsers: Function;
	setPaginatedUsers: Function;
	setUserSortFilterCount: Function;
	originalUsers: usersDataType[];
	setOriginalUsers: Function;
	queryFilter: string;
	setSearchParams: Function;
	query: string;
	setQuery: Function;
	setQueryFilter: Function;
}

const UserListTopBar: FC<UserListTopBarProps> = ({
	setUsers,
	setPaginatedUsers,
	setUserSortFilterCount,
	originalUsers,
	queryFilter,
	setSearchParams,
	query,
	setQuery,
	setQueryFilter,
}) => {
	const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

	useEffect(() => {
		let newUsers = [...originalUsers];

		if (queryFilter) {
			newUsers = newUsers.filter((u) =>
				u.username.toLowerCase().includes(queryFilter.toLowerCase())
			);

			setUsers(newUsers);
		} else {
			setUsers(newUsers);
		}

		setUserSortFilterCount((prev: number) => prev + 1);
	}, [queryFilter, setPaginatedUsers]);

	const handleSearchInputFieldClick = () => {
		if (query) {
			setQuery('');
		}

		inputRef.current.focus();
	};

	const handleSearch = () => {
		setQueryFilter(query);
		setSearchParams({ queryFilter: query, page: '1' });
	};

	return (
		<div className="user-list-tools">
			<div className="tool-input-item-container">
				<div className="tool-input-item">
					<input
						ref={inputRef}
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="search by username..."
					/>
					<div className="input-icon-container" onClick={handleSearchInputFieldClick}>
						{query ? <FaTimes /> : <FaSearch />}
					</div>
				</div>

				<button className="btn" onClick={handleSearch}>
					Search
				</button>
			</div>
		</div>
	);
};

export default UserListTopBar;
