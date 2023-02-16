import { useState } from 'react';
import useEventListener from './useEventListener';

/*
import React from 'react';
import { Typography } from '@mui/material';
import useWindowSize from './useWindowSize';

export default function TestComponent() {
	const { width, height } = useWindowSize();

	return (
		<>
			<Typography component={'h1'}>
				{width} x {height}
			</Typography>
		</>
	);
}

 */

/**
 * useWindowSize is a custom React hook that allows a component to keep track of the current size of the browser window.
 * @returns an object with the current width and height of the browser window.
 */
export default function useWindowSize(): { width: number; height: number } {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEventListener('resize', () => {
		setWindowSize({ width: window.innerWidth, height: window.innerHeight });
	});

	return windowSize;
}
