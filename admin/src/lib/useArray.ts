import { useState } from 'react';

/*
import { Button, Stack } from '@mui/material';
import React from 'react';
import useArray from './useArray';

export default function TestComponent() {
	const { array, set, push, remove, filter, update, clear } = useArray([0, 1, 2, 3, 4, 5, 6]);

	return (
		<>
			array: {array.join(', ')}
			<Stack spacing={2} direction="row">
				<Button variant={'contained'} onClick={() => push(7)}>
					Add 7
				</Button>
				<Button variant={'contained'} onClick={() => update(1, 9)}>
					Change Second Element To 9
				</Button>
				<Button variant={'contained'} onClick={() => remove(1)}>
					Remove Second Element
				</Button>
				<Button variant={'contained'} onClick={() => filter((n) => n < 3)}>
					Keep Numbers Less Than 4
				</Button>
				<Button variant={'contained'} onClick={() => set([1, 2])}>
					Set To 1, 2
				</Button>
				<Button variant={'contained'} onClick={clear}>
					Clear
				</Button>
			</Stack>
		</>
	);
}
 */

export default function useArray(defaultValue): {
	array: any[];
	set: (value: any[]) => void;
	push: (element: any) => void;
	filter: (callback: (element: any, index: number, array: any[]) => boolean) => void;
	update: (index: number, newElement: any) => void;
	remove: (index: number) => void;
	clear: () => void;
} {
	const [array, setArray] = useState(defaultValue);

	function push(element): void {
		setArray((a) => [...a, element]);
	}

	function filter(callback): void {
		setArray((a) => a.filter(callback));
	}

	function update(index, newElement): void {
		setArray((a) => [...a.slice(0, index), newElement, ...a.slice(index + 1, a.length)]);
	}

	function remove(index): void {
		setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
	}

	function clear(): void {
		setArray([]);
	}

	return { array, set: setArray, push, filter, update, remove, clear };
}
