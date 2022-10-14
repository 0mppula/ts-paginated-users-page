import { FC, useRef, useEffect } from 'react';
import { FaSearch, FaTimes, FaChevronUp, FaChevronDown } from 'react-icons/fa';

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
	usernameSortOrder: number;
	setUsernameSortOrder: Function;
	activePage: number;
}

const UserListTopBar: FC<UserListTopBarProps> = ({
	setUsers,
	users,
	setPaginatedUsers,
	setUserSortFilterCount,
	originalUsers,
	queryFilter,
	setSearchParams,
	query,
	setQuery,
	setQueryFilter,
	usernameSortOrder,
	setOriginalUsers,
	setUsernameSortOrder,
	activePage,
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryFilter, setPaginatedUsers, originalUsers, setUsers, setUserSortFilterCount]);

	const handleSearchInputFieldClick = () => {
		if (query) {
			setQuery('');
		}

		inputRef.current.focus();
	};

	const handleSearch = () => {
		setQueryFilter(query);
		setSearchParams({
			queryFilter: query,
			page: '1',
			usernameSortOrder: String(usernameSortOrder),
		});
	};

	const handleUsernameSort = () => {
		let newUsers = [...users];

		// 1 IS FOR DECENDING ORDER
		const nextSortOrder = -1 * usernameSortOrder;

		newUsers.sort((a, b) => (a.username < b.username ? nextSortOrder * -1 : nextSortOrder));

		setUsernameSortOrder(nextSortOrder);

		// Sort both the filterable users and the original users.
		setUsers(newUsers);
		setOriginalUsers(newUsers);
		setUserSortFilterCount((prev: number) => prev + 1);
		setSearchParams({
			queryFilter,
			page: String(activePage),
			usernameSortOrder: String(nextSortOrder),
		});
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

			<div className="tool-item-container">
				<div className="tool-item" onClick={handleUsernameSort}>
					Username {usernameSortOrder === 1 ? <FaChevronUp /> : <FaChevronDown />}
				</div>
			</div>
		</div>
	);
};

export default UserListTopBar;
