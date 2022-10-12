import { FC, useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch, FaTimes } from 'react-icons/fa';
import moment from 'moment';

import { usersDataType } from './Users';

interface UserListTopBarProps {
	users: usersDataType[];
	setUsers: Function;
	setPaginatedUsers: Function;
	setUserSortFilterCount: Function;
	originalUsers: usersDataType[];
	setOriginalUsers: Function;
}

const UserListTopBar: FC<UserListTopBarProps> = ({
	users,
	setUsers,
	setPaginatedUsers,
	setUserSortFilterCount,
	originalUsers,
	setOriginalUsers,
}) => {
	// Value of query input field.
	const [query, setQuery] = useState<string>('');
	// Value of query after user clicks "search".
	const [queryFilter, setQueryFilter] = useState<string>('');
	const [usernameSortOrder, setUsernameSortOrder] = useState<number>(1);
	const [ageSortOrder, setAgeSortOrder] = useState<number>(1);

	const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

	useEffect(() => {
		let newUsers = [...originalUsers];

		if (queryFilter) {
			newUsers = newUsers.filter((u) =>
				u.username.toLowerCase().includes(queryFilter.toLowerCase())
			);
			setUsers(newUsers);
		} else {
			setUsers(originalUsers);
		}

		setUserSortFilterCount((prev: number) => prev + 1);
	}, [queryFilter, setPaginatedUsers]);

	const handleSearchInputFieldClick = () => {
		if (query) {
			setQuery('');
		}

		inputRef.current.focus();
	};

	const handleUsernameSort = () => {
		let newUsers = [...users];

		// 1 IS FOR DECENDING ORDER
		const nextSortOrder = -1 * usernameSortOrder;

		newUsers.sort((a, b) => (a.username < b.username ? nextSortOrder : nextSortOrder * -1));

		setUsernameSortOrder(nextSortOrder);

		// Sort both the filterable users and the original users.
		setUsers(newUsers);
		setOriginalUsers(newUsers);
		setUserSortFilterCount((prev: number) => prev + 1);
	};

	const handleAgeSort = () => {
		let newUsers = [...users];

		// -1 IS FOR DECENDING ORDER
		const nextSortOrder = -1 * ageSortOrder;

		newUsers.sort((a, b) => {
			let ageA = moment.duration(moment(new Date()).diff(a.birthday)).years();
			let ageB = moment.duration(moment(new Date()).diff(b.birthday)).years();

			return ageA > ageB ? nextSortOrder : nextSortOrder * -1;
		});

		setAgeSortOrder(nextSortOrder);

		// Sort both the filterable users and the original users.
		setUsers(newUsers);
		setOriginalUsers(newUsers);
		setUserSortFilterCount((prev: number) => prev + 1);
	};

	const handleSearch = () => {
		setQueryFilter(query);
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

				<div className="tool-item" onClick={handleAgeSort}>
					Age {ageSortOrder === 1 ? <FaChevronUp /> : <FaChevronDown />}
				</div>
			</div>
		</div>
	);
};

export default UserListTopBar;
