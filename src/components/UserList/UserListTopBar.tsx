import { FC, useRef, useEffect, useState } from 'react';
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
	queryFilter: string;
	setSearchParams: Function;
	query: string;
	setQuery: Function;
	activePage: number;
	sortOrders: any;
	setSortOrders: Function;
}

const UserListTopBar: FC<UserListTopBarProps> = ({
	users,
	setUsers,
	setPaginatedUsers,
	setUserSortFilterCount,
	originalUsers,
	setOriginalUsers,
	queryFilter,
	setSearchParams,
	query,
	setQuery,
	activePage,
	sortOrders,
	setSortOrders,
}) => {
	const [latestSort, setLatestSort] = useState('');
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

	useEffect(() => {
		let newUsers = [...users];

		// 1 IS FOR DECENDING ORDER
		const nextUsernameSortOrder = sortOrders.find(
			(obj: any) => obj?.usernameSortOrder
		)?.usernameSortOrder;

		// -1 IS FOR DECENDING ORDER
		const nextAgeSortOrder = sortOrders.find((obj: any) => obj?.ageSortOrder)?.ageSortOrder;

		if (
			latestSort === 'username' ||
			(sortOrders && Object?.keys(sortOrders[0] === 'username').length > 0)
		) {
			// AGE SORT
			newUsers.sort((a, b) => {
				let ageA = moment.duration(moment(new Date()).diff(a.birthday)).years();
				let ageB = moment.duration(moment(new Date()).diff(b.birthday)).years();

				return ageA > ageB ? nextAgeSortOrder : nextAgeSortOrder * -1;
			});

			// USERNAME SORT
			newUsers.sort((a, b) =>
				a.username < b.username ? nextUsernameSortOrder : nextUsernameSortOrder * -1
			);

			setSearchParams({
				queryFilter: query,
				page: String(activePage),
				usernameSortOrder: String(nextUsernameSortOrder),
				ageSortOrder: String(nextAgeSortOrder),
			});
		} else if (
			latestSort === 'age' ||
			(sortOrders && Object?.keys(sortOrders[0] === 'age').length > 0)
		) {
			// USERNAME SORT
			newUsers.sort((a, b) =>
				a.username < b.username ? nextUsernameSortOrder : nextUsernameSortOrder * -1
			);

			// AGE SORT
			newUsers.sort((a, b) => {
				let ageA = moment.duration(moment(new Date()).diff(a.birthday)).years();
				let ageB = moment.duration(moment(new Date()).diff(b.birthday)).years();

				return ageA > ageB ? nextAgeSortOrder : nextAgeSortOrder * -1;
			});

			setSearchParams({
				queryFilter: query,
				page: String(activePage),
				ageSortOrder: String(nextAgeSortOrder),
				usernameSortOrder: String(nextUsernameSortOrder),
			});
		}

		// Sort both the filterable users and the original users.
		setUsers(newUsers);
		setOriginalUsers(newUsers);
		setUserSortFilterCount((prev: number) => prev + 1);
	}, [sortOrders]);

	const handleUsernameSort = () => {
		// 1 IS FOR DECENDING ORDER
		const nextUsernameSortOrder =
			-1 *
			sortOrders.find((obj: any) => {
				return obj?.usernameSortOrder;
			})?.usernameSortOrder;

		const nextAgeSortOrder = sortOrders.find((obj: any) => {
			return obj?.ageSortOrder;
		})?.ageSortOrder;

		setSortOrders([
			{ usernameSortOrder: nextUsernameSortOrder },
			{ ageSortOrder: nextAgeSortOrder },
		]);

		setLatestSort('username');
	};

	const handleAgeSort = () => {
		// -1 IS FOR DECENDING ORDER
		const nextAgeSortOrder =
			-1 *
			sortOrders.find((obj: any) => {
				return obj?.ageSortOrder;
			})?.ageSortOrder;

		const nextUsernameSortOrder = sortOrders.find((obj: any) => {
			return obj?.usernameSortOrder;
		})?.usernameSortOrder;

		setSortOrders([
			{ ageSortOrder: nextAgeSortOrder },
			{ usernameSortOrder: nextUsernameSortOrder },
		]);

		setLatestSort('age');
	};

	const handleSearch = () => {
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

			<div className="tool-item-container">
				<div className="tool-item" onClick={handleUsernameSort}>
					Username{' '}
					{+sortOrders.find((obj: any) => obj?.usernameSortOrder)?.usernameSortOrder ===
					1 ? (
						<FaChevronUp />
					) : (
						<FaChevronDown />
					)}
				</div>

				<div className="tool-item" onClick={handleAgeSort}>
					Age{' '}
					{+sortOrders.find((obj: any) => obj?.ageSortOrder)?.ageSortOrder === 1 ? (
						<FaChevronUp />
					) : (
						<FaChevronDown />
					)}
				</div>
			</div>
		</div>
	);
};

export default UserListTopBar;
