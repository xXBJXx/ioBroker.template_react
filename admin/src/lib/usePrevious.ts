import { useRef } from 'react';

/*
import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import usePrevious from './usePrevious';

export default function TestComponent() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState('Kyle');
	const previousCount = usePrevious(count);
	const previousName = usePrevious(name);

	// create random name
	const randomName = () => {
		const random = Math.floor(Math.random() * 1000);
		setName(`Random ${random}`);
	};

	return (
		<>
			count: {count} - {previousCount}
			<br />
			Name: {name} - {previousName}
			<Stack spacing={2} direction="row">
				<Button variant={'contained'} onClick={() => setCount((currentCount) => currentCount + 1)}>
					Increment
				</Button>
				<Button variant={'contained'} onClick={randomName}>
					Change Name
				</Button>
			</Stack>
		</>
	);
}

 */

export default function usePrevious(value: any): any {
	const currentRef = useRef(value);
	const previousRef = useRef();

	if (currentRef.current !== value) {
		previousRef.current = currentRef.current;
		currentRef.current = value;
	}

	return previousRef.current;
}
