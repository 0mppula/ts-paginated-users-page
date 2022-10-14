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

const Users: FC = () => {
	// Search params
	const [searchParams, setSearchParams] = useSearchParams();
	// Value of query input field.
	const [query, setQuery] = useState<string>('');
	// Value of query after user clicks "search".
	const [queryFilter, setQueryFilter] = useState<string>('');
	const [usernameSortOrder, setUsernameSortOrder] = useState<number>(1);

	// Users
	const [originalUsers, setOriginalUsers] = useState<usersDataType[] | null>(null);
	const [users, setUsers] = useState<usersDataType[] | null>(null);
	const [paginatedUsers, setPaginatedUsers] = useState<usersDataType[] | null>(null);

	const [loading, setLoading] = useState<boolean>(true);
	const [activePage, setActivePage] = useState<number>(1);
	const [usersPerPage] = useState<number>(24);
	const [lastPage, setLastPage] = useState<number>(1);
	const [userSortFilterCount, setUserSortFilterCount] = useState<number>(0);

	const lastUserIndex = activePage * usersPerPage;
	const firstUserIndex = lastUserIndex - usersPerPage;
	const activePageParam = Number(searchParams.get('page'));
	const queryFilterParam = searchParams.get('queryFilter') || '';
	const queryUsernameSortParam = searchParams.get('usernameSortOrder') || 1;

	useEffect(() => {
		setLoading(true);
		const usersJSON: usersDataType[] = [...usersData].sort((a, b) =>
			a.username > b.username
				? Number(queryUsernameSortParam)
				: -1 * Number(queryUsernameSortParam)
		);

		// Initialize the filtered users array once users are fethced.
		setLastPage(Math.ceil(usersJSON?.length / usersPerPage));

		// Paginate the users on initial render
		const currentPageUsers = [...usersJSON].slice(firstUserIndex, lastUserIndex);
		setPaginatedUsers(currentPageUsers);
		setOriginalUsers(usersJSON);
		setUsers(usersJSON);

		setLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!loading) {
			// Only if valid page number param
			if (activePageParam > 0 && activePageParam <= lastPage) {
				// Page number params (get the page number from url and save to state)
				setActivePage(activePageParam);
				setUsernameSortOrder(Number(queryUsernameSortParam));
			} else {
				// Default to first page if invalid page number
				setActivePage(1);
				setSearchParams({ queryFilter: query, page: '1', usernameSortOrder: '1' });
			}

			// Query filter param (get the query param from url and save to state)
			setQueryFilter(queryFilterParam);
			setQuery(queryFilterParam);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams, loading]);

	useEffect(() => {
		// When the user changes pages slice the users array and save the sliced array to filtered
		// users state.
		if (Array.isArray(users) && !loading) {
			const currentPageUsers = [...users].slice(firstUserIndex, lastUserIndex);

			// If the users array is filtered update the pagination (page count)
			setLastPage(Math.ceil(users?.length / usersPerPage));

			setPaginatedUsers(currentPageUsers);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activePage, userSortFilterCount]);

	useEffect(() => {
		// Invalid page numbers in url params
		if (activePage > 1 && paginatedUsers?.length === 0) {
			setActivePage(1);
			setSearchParams({ queryFilter: query, page: '1' });
		}
	}, [paginatedUsers]);

	const incrementPage = () => {
		if (activePage < lastPage) {
			setSearchParams({
				queryFilter: query,
				page: String(activePage + 1),
				usernameSortOrder: String(usernameSortOrder),
			});
			window.scrollTo(0, 0);
		}
	};

	const decrementPage = () => {
		if (activePage > 1) {
			setSearchParams({
				queryFilter: query,
				page: String(activePage - 1),
				usernameSortOrder: String(usernameSortOrder),
			});
			window.scrollTo(0, 0);
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
						setQueryFilter={setQueryFilter}
						usernameSortOrder={usernameSortOrder}
						setUsernameSortOrder={setUsernameSortOrder}
						activePage={activePage}
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
