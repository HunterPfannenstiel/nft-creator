'use client';

import { ComponentPropsWithRef, FunctionComponent } from 'react';
import classes from './HighlightLink.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface HighlightLinkProps extends ComponentPropsWithRef<'a'> {
	highlightClassName: string;
	href: string;
}

const HighlightLink: FunctionComponent<HighlightLinkProps> = ({
	highlightClassName,
	children,
	href,
	className,
	...props
}) => {
	const isSelected = usePathname().startsWith(href); // doesn't work with query params atm

	return (
		<li
			key={href}
			className={className + (isSelected ? ` ${highlightClassName}` : '')}
		>
			<Link href={href} {...props}>
				{children}
			</Link>
		</li>
	);
};

export default HighlightLink;
