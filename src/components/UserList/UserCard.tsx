import { FC } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { usersDataType } from './Users';

interface UserCardProps {
	user: usersDataType;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
	const calculateAge = () => {
		let age = moment.duration(moment(new Date()).diff(user.birthday)).years();

		return age;
	};

	return (
		<Link to={`user/${user.id}`} className="user-card">
			<div className="user-card-avatar">
				<img src={user.avatar} alt="" />
			</div>
			<div className="user-card-bottom">
				<p>{user.username}</p>
				<p>{calculateAge()}</p>
			</div>
		</Link>
	);
};

export default UserCard;
