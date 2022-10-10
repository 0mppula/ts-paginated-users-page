import { FC, useMemo } from 'react';
import moment from 'moment';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/micah';

import { usersDataType } from './Users';
import { cssVar } from '../../helpers/getCssVariable';
import { Link } from 'react-router-dom';

interface UserCardProps {
	user: usersDataType;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
	const calculateAge = () => {
		let age = moment.duration(moment(new Date()).diff(user.birthday)).years();

		return age;
	};

	const avatar = useMemo(() => {
		return createAvatar(style, {
			dataUri: true,
			size: 200,
			background: cssVar('--clr-light'),
			mouth: ['surprised', 'laughing', 'nervous', 'smile', 'pucker', 'smirk'],
		});
	}, []);

	return (
		<Link to={`user/${user.id}`} className="user-card">
			<div className="user-card-avatar">
				<img src={avatar} alt="" />
			</div>
			<div className="user-card-bottom">
				<p>{user.username}</p>
				<p>{calculateAge()}</p>
			</div>
		</Link>
	);
};

export default UserCard;
