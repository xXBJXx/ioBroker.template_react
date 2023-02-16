import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

interface UseSize {
	(ref: React.MutableRefObject<undefined>): {
		x: number;
		y: number;
		width: number;
		height: number;
		top: number;
		right: number;
		bottom: number;
		left: number;
	};
}

/*
import React, { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useSize } from './useSize';

export default function TestComponent() {
	const ref = useRef();
	const size = useSize(ref);
	return (
		<>
			<Typography component={'h1'}>{JSON.stringify(size)}</Typography>
			<Box ref={ref} sx={{ width: 100, height: 100, bgcolor: 'primary.main' }} />
		</>
	);
}

 */

/**
 * useSize is a custom React Hook that allows a component to track the size of an element, passed as a reference.
 * @param ref
 */

export const useSize: UseSize = (ref) => {
	const [size, setSize] = useState({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	});

	useEffect(() => {
		if (ref.current == null) return;
		const observer = new ResizeObserver(([entry]) => setSize(entry.contentRect));
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return size;
};
