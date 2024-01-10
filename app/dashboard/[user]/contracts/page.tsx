import { FunctionComponent, Suspense } from 'react';
import classes from './UserDashboardContractsPage.module.css';
import { getUserContracts } from '@/lib/server/contracts';

const GetUserContractsJSX = async ({ user }: { user: string }) => {
	const contracts = await getUserContracts(user);
	return (
		<>
			{contracts.map((contract) => (
				<>
					<p>
						{contract.contractAddress}, {contract.contractType}
					</p>
					<p>{contract.ownerAddress}</p>
					<p>{contract.numTokens}</p>
				</>
			))}
		</>
	);
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
			<h1>{user}&apos;s Contracts</h1>
			<Suspense fallback={<p>Fetching {user}&apos;s contracts...</p>}>
				<GetUserContractsJSX user={user} />
			</Suspense>
		</>
	);
};

export default UserDashboardContractsPage;
