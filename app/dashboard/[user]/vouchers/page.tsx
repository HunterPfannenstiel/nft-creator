import { FunctionComponent } from 'react';
import classes from './UserDashboardVouchersPage.module.css';
import { getUserVouchers } from '@/lib/server/vouchers';
import Image from 'next/image';
import { VoucherFilter } from '@/types/voucher';
import { redirect } from 'next/navigation';
import HighlightLink from '@/components/ui/reusable/links/HighlightLink';
import Voucher from '@/components/ui/voucher/Voucher';

const getVoucherFilter = (
	user: string,
	searchParams: {
		[key: string]: string | string[] | undefined;
	}
) => {
	let voucherFilter: VoucherFilter | undefined;
	if ('claimed' in searchParams) voucherFilter = 'claimed';
	else if ('pending' in searchParams) voucherFilter = 'pending';
	else if ('created' in searchParams) voucherFilter = 'created';

	if (!voucherFilter) redirect(`/dashboard/${user}/vouchers?claimed`);
	else if (Object.keys(searchParams).length !== 1)
		redirect(`/dashboard/${user}/vouchers?${voucherFilter}`);

	return voucherFilter;
};

interface UserDashboardVouchersPageProps {
	params: { user: string };
	searchParams: { [key: string]: string | string[] | undefined };
}

const UserDashboardVouchersPage: FunctionComponent<
	UserDashboardVouchersPageProps
> = async ({ params, searchParams }) => {
	const { user } = params;

	const voucherFilter = getVoucherFilter(user, searchParams);
	const vouchers = await getUserVouchers(user, voucherFilter);

	return (
		<>
			<h1>{user}&apos;s Vouchers</h1>
			<nav>
				<HighlightLink
					href={`/dashboard/${user}/vouchers?claimed`}
					highlightClassName={classes.highlight}
					className=""
				>
					Claimed
				</HighlightLink>
				<HighlightLink
					href={`/dashboard/${user}/vouchers?pending`}
					highlightClassName={classes.highlight}
					className=""
				>
					Pending
				</HighlightLink>
				<HighlightLink
					href={`/dashboard/${user}/vouchers?created`}
					highlightClassName={classes.highlight}
					className=""
				>
					Created
				</HighlightLink>
			</nav>
			{vouchers.map((voucher) => (
				<div key={voucher.metadataURL} style={{ margin: '1rem 0' }}>
					<Voucher voucherDetails={voucher} />
				</div>
			))}
		</>
	);
};

export default UserDashboardVouchersPage;
