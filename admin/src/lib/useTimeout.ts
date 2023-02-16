import { useCallback, useEffect, useRef } from 'react';

/*
import { Button, Stack } from '@mui/material';
import React from 'react';
import useTimeout from './useTimeout';

export default function TestComponent() {
	const [count, setCount] = React.useState(20);
	const { clear, reset } = useTimeout(() => setCount(5), 5000);

	return (
		<>
			count:{count}
			<Stack spacing={2} direction="row">
				<Button variant={'contained'} onClick={() => setCount((c) => c + 1)}>
					Increment
				</Button>
				<Button variant={'contained'} onClick={clear}>
					Clear Timeout
				</Button>
				<Button variant={'contained'} onClick={reset}>
					Reset Timeout
				</Button>
			</Stack>
		</>
	);
}
 */

interface UseTimeoutReturn {
	reset: () => void;
	clear: () => void;
}

interface UseTimeout {
	(callback: () => void, delay: number | undefined): UseTimeoutReturn;
}

export const useTimeout: UseTimeout = (callback, delay): UseTimeoutReturn => {
	const callbackRef = useRef(callback);
	const timeoutRef = useRef();

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const set = useCallback(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
	}, [delay]);

	const clear = useCallback(() => {
		timeoutRef.current && clearTimeout(timeoutRef.current);
	}, []);

	useEffect(() => {
		set();
		return clear;
	}, [delay, set, clear]);

	const reset = useCallback(() => {
		clear();
		set();
	}, [clear, set]);

	return { reset, clear };
};
