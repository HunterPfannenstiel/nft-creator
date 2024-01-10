import { FunctionComponent } from 'react';
import classes from './UserDashboardPage.module.css';

interface UserDashboardPageProps {
	params: { user: string };
}

const UserDashboardPage: FunctionComponent<UserDashboardPageProps> = ({
	params,
}) => {
	const { user } = params;
	return (
		<>
			<p>Select to view {user}&apos;s contracts or vouchers</p>
		</>
	);
};

export default UserDashboardPage;
