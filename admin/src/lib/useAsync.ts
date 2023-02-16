import { SetStateAction, useCallback, useEffect, useState } from 'react';

/*
import React from 'react';
import useAsync from './useAsync';
import { Button } from '@mui/material';

export default function TestComponent() {
	const [success, setSuccess] = React.useState(false);
	const { loading, error, value } = useAsync(() => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				success ? resolve('Hi') : reject('Error');
			}, 1000);
		});
	}, [success]);

	return (
		<>
			Loading: {loading.toString()}
			<br />
			{error}
			<br />
			{value}
			<br />
			<Button onClick={() => setSuccess(!success)}>Click</Button>
		</>
	);
}

 */

/**
 * useAsync is a custom React hook that allows a component to handle asynchronous operations and keep track of the loading, error, and value states.
 * @param callback
 * @param dependencies
 */

export default function useAsync(
	callback: () => Promise<SetStateAction<any>>,
	dependencies: any[] = [],
): {
	loading: boolean;
	error: any;
	value: any;
} {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState();
	const [value, setValue] = useState();

	const callbackMemoized = useCallback(() => {
		setLoading(true);
		setError(undefined);
		setValue(undefined);
		callback()
			.then(setValue)
			.catch(setError)
			.finally(() => setLoading(false));
	}, dependencies);

	useEffect(() => {
		callbackMemoized();
	}, [callbackMemoized]);

	return { loading, error, value };
}
