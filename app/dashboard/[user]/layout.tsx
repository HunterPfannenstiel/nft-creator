import { FunctionComponent } from 'react';
import classes from './UserDashboardLayout.module.css';
import Link from 'next/link';
import HighlightLink from '@/components/ui/reusable/links/HighlightLink';

interface UserDashboardLayoutProps {
	params: { user: string };
	children: React.ReactNode;
}

const UserDashboardLayout: FunctionComponent<UserDashboardLayoutProps> = ({
	params,
	children,
}) => {
	const { user } = params;
	return (
		<>
			<nav>
				<HighlightLink
					href={`/dashboard/${user}/contracts`}
					highlightClassName={classes.highlight}
					className={classes.link}
				>
					Contracts
				</HighlightLink>
				<HighlightLink
					href={`/dashboard/${user}/vouchers`}
					highlightClassName={classes.highlight}
					className={classes.link}
				>
					Vouchers
				</HighlightLink>
			</nav>
			{children}
		</>
	);
};

export default UserDashboardLayout;
