import { useCallback, useRef, useState } from 'react';

/*
import { Button, Stack } from '@mui/material';
import React from 'react';
import useStateWithHistory from './useStateWithHistory';

export default function TestComponent() {
	const [count, setCount, { history, pointer, back, forward, go }] = useStateWithHistory(1, { capacity: 5 });

	return (
		<>
			count: {count}
			<br />
			history: {history.join(', ')}
			<br />
			Pointer - {pointer}
			<Stack spacing={2} direction="row">
				<Button variant={'contained'} onClick={() => setCount((currentCount) => currentCount + 1)}>
					Increment
				</Button>
				<Button variant={'contained'} onClick={() => setCount((currentCount) => currentCount * 2)}>
					Double
				</Button>
				<Button variant={'contained'} onClick={back}>
					Back
				</Button>
				<Button variant={'contained'} onClick={forward}>
					Forward
				</Button>
				<Button variant={'contained'} onClick={() => go(2)}>
					Go To Index 2
				</Button>
			</Stack>
		</>
	);
}

 */

/**
 * useStateWithHistory is a custom React hook that allows a component to keep track of the state's history
 * @param defaultValue
 * @param capacity
 */
export default function useStateWithHistory(
	defaultValue,
	{ capacity = 10 } = {},
): [
	any,
	(v: any) => void,
	{
		history: any[];
		pointer: number;
		back: () => void;
		forward: () => void;
		go: (index: number) => void;
	},
] {
	const [value, setValue] = useState(defaultValue);
	const historyRef = useRef([value]);
	const pointerRef = useRef(0);

	const set = useCallback(
		(v) => {
			const resolvedValue = typeof v === 'function' ? v(value) : v;
			if (historyRef.current[pointerRef.current] !== resolvedValue) {
				if (pointerRef.current < historyRef.current.length - 1) {
					historyRef.current.splice(pointerRef.current + 1);
				}
				historyRef.current.push(resolvedValue);

				while (historyRef.current.length > capacity) {
					historyRef.current.shift();
				}
				pointerRef.current = historyRef.current.length - 1;
			}
			setValue(resolvedValue);
		},
		[capacity, value],
	);

	const back = useCallback(() => {
		if (pointerRef.current <= 0) return;
		pointerRef.current--;
		setValue(historyRef.current[pointerRef.current]);
	}, []);

	const forward = useCallback(() => {
		if (pointerRef.current >= historyRef.current.length - 1) return;
		pointerRef.current++;
		setValue(historyRef.current[pointerRef.current]);
	}, []);

	const go = useCallback((index) => {
		if (index < 0 || index > historyRef.current.length - 1) return;
		pointerRef.current = index;
		setValue(historyRef.current[pointerRef.current]);
	}, []);

	return [
		value,
		set,
		{
			history: historyRef.current,
			pointer: pointerRef.current,
			back,
			forward,
			go,
		},
	];
}
