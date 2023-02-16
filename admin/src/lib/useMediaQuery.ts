import { useEffect, useState } from 'react';
import useEventListener from './useEventListener';

/*
import React from 'react';
import { Typography } from '@mui/material';
import useMediaQuery from './useMediaQuery';

export default function TestComponent() {
	const isLarge = useMediaQuery('(min-width: 2000px)');

	return (
		<>
			<Typography component={'h1'}>Large: {isLarge.toString()}</Typography>
		</>
	);
}

 */

/**
 * useMediaQuery is a custom React hook that allows a component to check if a specific media query matches the current viewport and keep track of the match status.
 * @param mediaQuery  is a string representing the media query to check for.
 */

export default function useMediaQuery(mediaQuery): boolean {
	const [isMatch, setIsMatch] = useState(false);
	const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList>();

	useEffect(() => {
		const list = window.matchMedia(mediaQuery);
		setMediaQueryList(list);
		setIsMatch(list.matches);
	}, [mediaQuery]);

	useEventListener('change', (e) => setIsMatch(e.matches), mediaQueryList);

	return isMatch;
}
