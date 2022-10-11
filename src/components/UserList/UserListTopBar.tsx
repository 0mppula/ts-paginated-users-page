import { FC, useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch, FaTimes } from 'react-icons/fa';
import moment from 'moment';

import { usersDataType } from './Users';

interface UserListTopBarProps {
	users: usersDataType[];
	setUsers: Function;
	filteredUsers: usersDataType[];
	setFilteredUsers: Function;
}

const UserListTopBar: FC<UserListTopBarProps> = ({
	users,
	setUsers,
	filteredUsers,
	setFilteredUsers,
}) => {
	const [query, setQuery] = useState<string>('');
	const [usernameSortOrder, setUsernameSortOrder] = useState<number>(1);
	const [ageSortOrder, setAgeSortOrder] = useState<number>(1);

	const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

	useEffect(() => {
		let newUsers = [...users];

		if (query) {
			newUsers = newUsers.filter((u) =>
				u.username.toLowerCase().includes(query.toLowerCase())
			);
			setFilteredUsers(newUsers);
		} else {
			setFilteredUsers(filteredUsers);
		}
	}, [query, setFilteredUsers]);

	const handleSearchClick = () => {
		if (query) {
			setQuery('');
		}

		inputRef.current.focus();
	};

	const handleUsernameSort = () => {
		let newUsers = [...users];
		let newFilteredUsers = [...filteredUsers];

		// 1 IS FOR DECENDING ORDER
		const nextSortOrder = -1 * usernameSortOrder;

		newFilteredUsers.sort((a, b) =>
			a.username < b.username ? nextSortOrder : nextSortOrder * -1
		);

		newUsers.sort((a, b) => (a.username < b.username ? nextSortOrder : nextSortOrder * -1));
		

		setUsernameSortOrder(nextSortOrder);

		// Sort both the original users and the users filtered with query.
		setUsers(newUsers);
		setFilteredUsers(newFilteredUsers);
	};

	const handleAgeSort = () => {
		let newUsers = [...users];
		let newFilteredUsers = [...filteredUsers];

		// -1 IS FOR DECENDING ORDER
		const nextSortOrder = -1 * ageSortOrder;

		[newUsers, newFilteredUsers].forEach((arr) =>
			arr.sort((a, b) => {
				let ageA = moment.duration(moment(new Date()).diff(a.birthday)).years();
				let ageB = moment.duration(moment(new Date()).diff(b.birthday)).years();

				return ageA > ageB ? nextSortOrder : nextSortOrder * -1;
			})
		);

		setAgeSortOrder(nextSortOrder);

		// Sort both the original users and the users filtered with query.
		setUsers(newUsers);
		setFilteredUsers(newFilteredUsers);
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
