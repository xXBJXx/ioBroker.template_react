import { DependencyList, useEffect, useRef } from 'react';

/*
import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import useUpdateEffect from './useUpdateEffect';

export default function TestComponent() {
	const [count, setCount] = useState(0);
	const [confirms, setConfirms] = useState(0);

	const handleConfirm = (count) => {
		setConfirms(count);
	};

	useUpdateEffect(() => handleConfirm(count), [count]);

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
 * @param dependencies
 */
interface UseUpdateEffect {
	(callback: () => void, dependencies: DependencyList | undefined): void;
}

export const useUpdateEffect: UseUpdateEffect = (callback, dependencies): void => {
	const firstRenderRef = useRef(true);

	useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false;
			return;
		}
		return callback();
	}, dependencies);
};
