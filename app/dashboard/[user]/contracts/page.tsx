import { FunctionComponent, Suspense } from 'react';
import classes from './UserDashboardContractsPage.module.css';
import { getUserContracts } from '@/lib/server/contracts';
import ContractList from '@/components/ui/contract/ContractList';

const GetUserContractsJSX = async ({ user }: { user: string }) => {
	const contracts = await getUserContracts(user);
	return <ContractList contracts={contracts} />;
};

interface UserDashboardContractsPageProps {
	params: { user: string };
}

const UserDashboardContractsPage: FunctionComponent<
	UserDashboardContractsPageProps
> = ({ params }) => {
	const { user } = params;

	return (
		<>
			<Suspense fallback={<p>Fetching {user}&apos;s contracts...</p>}>
				<GetUserContractsJSX user={user} />
			</Suspense>
		</>
	);
};

export default UserDashboardContractsPage;
