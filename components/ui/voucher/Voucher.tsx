import { FunctionComponent } from 'react';
import classes from './Voucher.module.css';
import { VoucherDetails } from '@/types/voucher';
import Image from 'next/image';
import { concatClassNames } from '@/utils/css';

interface VoucherProps {
	voucherDetails: VoucherDetails;
}

const Voucher: FunctionComponent<VoucherProps> = ({ voucherDetails }) => {
	return (
		<div
			className={concatClassNames(
				classes.voucher,
				voucherDetails.redeemed ? classes.redeemed : classes.not_redeemed
			)}
		>
			<div className={classes.outer_section}>
				<p>{voucherDetails.contractType}</p>
				<p>{voucherDetails.contractName}</p>
				<p>{voucherDetails.tokenAmount || 1}</p>
			</div>
			<div className={classes.inner_section}>
				<div className={classes.img_container}>
					<Image
						src={voucherDetails.imageURL}
						alt="NFT Picture"
						height={50}
						width={50}
						className={classes.img}
					/>
				</div>
				<div className={classes.attributes}>
					<h3>Attributes:</h3>
					<ul className={classes.attribute_list}>
						<li>Name: Mike W.</li>
						<li>Color: Green</li>
						<li>Limbs: 4</li>
						<li>Favorite Food: Oranges</li>
						<li>Favorite Airline: Delta</li>
					</ul>
				</div>
			</div>
			<div className={classes.outer_section}>
				<p>From: {voucherDetails.creatorAddress}</p>
				<p>To: {voucherDetails.claimerAddress}</p>
			</div>
		</div>
	);
};

export default Voucher;
