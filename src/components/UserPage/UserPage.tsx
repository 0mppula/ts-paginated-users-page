import { FC, useState, useEffect } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import moment from 'moment';
import { useNavigate, useParams, Link } from 'react-router-dom';

import usersData from '../../assets/data/users.json';
import { usersDataType } from '../UserList/Users';

const UserPage: FC = () => {
	const [user, setUser] = useState<usersDataType | null>(null);
	let navigate = useNavigate();
	const { userId } = useParams();

	useEffect(() => {
		const activeUser: usersDataType[] = usersData.filter((u) => u.id === Number(userId));

		// No user is found go back to home page
		if (!activeUser) {
			navigate('/');
		}

		setUser(activeUser[0]);
	}, []);

	const {
		first_name,
		last_name,
		email,
		gender,
		phone_number,
		birthday,
		street_address,
		job_title,
		username,
		avatar,
	} = user || {};

	if (!user) return <p>Loading....</p>;

	return (
		<>
			{user && (
				<div className="user-page-container">
					<div className="back-button-container">
						<Link to="/" className="btn back-button">
							<FaChevronLeft /> <span>Users</span>
						</Link>
					</div>

					<hr />

					<div className="user-avatar">
						<img src={avatar} alt="" />
					</div>

					<div className="user-info">
						<p>Username: {username}</p>
						<p>First name: {first_name}</p>
						<p>Last name: {last_name}</p>
						<p>Email: {email}</p>
						<p>Gender: {gender}</p>
						<p>Phone number: {phone_number}</p>
						<p>Age: {moment.duration(moment(new Date()).diff(birthday)).years()}</p>
						<p>Street address: {street_address}</p>
						<p>Job title: {job_title}</p>
					</div>
				</div>
			)}
		</>
	);
};

export default UserPage;
