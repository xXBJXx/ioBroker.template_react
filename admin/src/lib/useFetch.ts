import useAsync from './useAsync';
/*
import React, { useState } from 'react';
import { Button } from '@mui/material';
import useFetch from './useFetch';

export default function TestComponent() {
	const [id, setId] = useState(1);
	const { loading, error, value } = useFetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {}, [id]);

	return (
		<>
			Loading: {loading.toString()}
			<br />
			{JSON.stringify(error, null, 2)}
			<br />
			{JSON.stringify(value, null, 2)}
			<br />
			<Button onClick={() => setId((currentId) => currentId + 1)}>Increment ID</Button>
		</>
	);
}

 */

const DEFAULT_OPTIONS = {
	headers: { 'Content-Type': 'application/json' },
};

/**
 * useFetch is a custom React hook that allows a component to handle fetching data from a URL and keep track of the loading, error, and value states.
 * It uses the built-in fetch API and custom hook useAsync that allows a component to handle asynchronous operations and keep track of the loading, error, and value states.
 * @param url is the URL of the endpoint to fetch data from
 * @param options  is an object that contains options such as headers, method, and body for the fetch request.
 * @param dependencies is an array of dependencies the hook should listen for changes. The callback function will be executed when any of the dependencies change.
 */
export default function useFetch(
	url,
	options: {
		method?: string;
		headers?: any;
		body?: any;
	} = {},
	dependencies: any[] = [],
): {
	loading: boolean;
	error: any;
	value: any;
} {
	return useAsync(() => {
		return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res) => {
			if (res.ok) return res.json();
			return res.json().then((json) => Promise.reject(json));
		});
	}, dependencies);
}
