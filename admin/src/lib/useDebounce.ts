import { useEffect } from 'react';
import { useTimeout } from './useTimeout';

/*
import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import useDebounce from './useDebounce';

export default function TestComponent() {
	const [count, setCount] = useState(0);
	const [confirms, setConfirms] = useState(0);

	const handleConfirm = (count) => {
		setConfirms(count);
		alert(count);
	};

	useDebounce(() => handleConfirm(count), 1000, [count]);

	return (
		<>
			count: {count}
			<br />
			confirms: {confirms}
			<Stack spacing={2} direction="row">
				<Button variant={'contained'} onClick={() => setCount((c) => c + 1)}>
					Increment
				</Button>
			</Stack>
		</>
	);
}

 */

/**
 *
 * @param callback
 * @param delay in ms
 * @param dependencies
 */

export default function useDebounce(callback: () => void, delay: number | undefined, dependencies: any): void {
	const { reset, clear } = useTimeout(callback, delay);
	useEffect(reset, [...dependencies, reset]);
	useEffect(clear, []);
}
