import { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import UserListTopBar from './UserListTopBar';
import '../../assets/stylesheets/users.css';
import UserCard from './UserCard';
import usersData from '../../assets/data/users.json';
import Paginator from './Paginator';

export interface usersDataType {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	gender: string;
	phone_number: string;
	birthday: string;
	avatar: string;
	street_address: string;
	job_title: string;
	username: string;
}

export interface sortOrdersType1 {
	usernameSortOrder: number;
}

export interface sortOrdersType2 {
	ageSortOrder: number;
}

const Users: FC = () => {
	// Search params
	const [searchParams, setSearchParams] = useSearchParams();
	// Value of query input field.
	const [query, setQuery] = useState<string>('');
	// Value of query after user clicks "search".
	const [queryFilter, setQueryFilter] = useState<string>('');
	const [sortOrders, setSortOrders] = useState<(sortOrdersType1 | sortOrdersType2)[]>([
		{ usernameSortOrder: 1 },
		{ ageSortOrder: 1 },
	]);

	// Users
	const [originalUsers, setOriginalUsers] = useState<usersDataType[] | null>(null);
	const [users, setUsers] = useState<usersDataType[] | null>(null);
	const [paginatedUsers, setPaginatedUsers] = useState<usersDataType[] | null>(null);

	const [loading, setLoading] = useState<boolean>(true);
	const [activePage, setActivePage] = useState<number>(1);
	const [usersPerPage, setUsersPerPage] = useState<number>(24);
	const [lastPage, setLastPage] = useState<number>(1);
	const [userSortFilterCount, setUserSortFilterCount] = useState<number>(0);

	const lastUserIndex = activePage * usersPerPage;
	const firstUserIndex = lastUserIndex - usersPerPage;
	const activePageParam = Number(searchParams.get('page'));
	const queryFilterParam = searchParams.get('queryFilter') || '';
	const UsernamesortParams = searchParams.get('usernameSortOrder');
	const AgesortParams = searchParams.get('ageSortOrder');

	useEffect(() => {
		setLoading(true);
		const usersJSON: usersDataType[] = usersData;

		// Initialize the filtered users array once users are fethced.
		setLastPage(Math.ceil(usersJSON?.length / usersPerPage));

		// Paginate the users on initial render
		const currentPageUsers = [...usersJSON].slice(firstUserIndex, lastUserIndex);
		setPaginatedUsers(currentPageUsers);
		setOriginalUsers(usersJSON);
		setUsers(usersJSON);

		// Add sorting params to state
		let sortParamsArr: any = [];
		Object.keys(Object.fromEntries([...Array.from(searchParams)])).forEach((k) => {
			if (k === 'ageSortOrder' || k === 'usernameSortOrder') {
				sortParamsArr.push({
					[k]: +Object.fromEntries([...Array.from(searchParams)])[k],
				});
			}
		});

		setSortOrders(sortParamsArr);
		setLoading(false);
	}, []);

	useEffect(() => {
		if (!loading) {
			// Only if valid page number param
			if (activePageParam > 0 && activePageParam <= lastPage) {
				// Page number params (get the page number from url and save to state)
				setActivePage(activePageParam);
				setSortOrders([
					{ usernameSortOrder: Number(UsernamesortParams) },
					{ ageSortOrder: Number(AgesortParams) },
				]);
			} else {
				// Default to first page if invalid page number
				setActivePage(1);
				setSearchParams({
					queryFilter: query,
					page: '1',
					ageSortOrder: '1',
					usernameSortOrder: '1',
				});
			}

			// Query filter param (get the query param from url and save to state)
			setQueryFilter(queryFilterParam);
			setQuery(queryFilterParam);
		}
	}, [searchParams, loading]);

	useEffect(() => {
		// When the user changes pages slice the users array and save the sliced array to filtered
		// users state.
		if (Array.isArray(users) && !loading) {
			const currentPageUsers = [...users].slice(firstUserIndex, lastUserIndex);

			// If the users array is filtered update the pagination (page count)
			setLastPage(Math.ceil(users?.length / usersPerPage));

			setPaginatedUsers(currentPageUsers);
			window.scrollTo(0, 0);
		}
	}, [activePage, userSortFilterCount, loading]);

	const incrementPage = () => {
		if (activePage < lastPage) {
			setSearchParams({
				queryFilter: query,
				page: String(activePage + 1),
				ageSortOrder: '1',
				usernameSortOrder: '1',
			});
		}
	};

	const decrementPage = () => {
		if (activePage > 1) {
			setSearchParams({
				queryFilter: query,
				page: String(activePage - 1),
				ageSortOrder: '1',
				usernameSortOrder: '1',
			});
		}
	};

	if (loading) return <p>Loading....</p>;

	return (
		<>
			{users && paginatedUsers && originalUsers && (
				<>
					<UserListTopBar
						users={users}
						setUsers={setUsers}
						setPaginatedUsers={setPaginatedUsers}
						setUserSortFilterCount={setUserSortFilterCount}
						originalUsers={originalUsers}
						setOriginalUsers={setOriginalUsers}
						queryFilter={queryFilter}
						setSearchParams={setSearchParams}
						query={query}
						setQuery={setQuery}
						activePage={activePage}
						sortOrders={sortOrders}
						setSortOrders={setSortOrders}
					/>

					<hr />

					<div className="users-list-container">
						{paginatedUsers.map?.((user) => (
							<UserCard key={user.id} user={user} />
						))}
					</div>

					<hr />

					<Paginator
						activePage={activePage}
						lastPage={lastPage}
						incrementPage={incrementPage}
						decrementPage={decrementPage}
					/>
				</>
			)}
		</>
	);
};

export default Users;
