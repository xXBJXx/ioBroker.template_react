import { useCallback, useState } from 'react';
import Cookies from 'js-cookie';

/*
import React from 'react';
import { Button, Typography } from '@mui/material';
import { useCookie } from './useCookie';

export default function TestComponent() {
	const [value, update, remove] = useCookie('name', 'John');

	return (
		<>
			<Button onClick={() => update('Sally')}>Change Name To Sally</Button>
			<Button onClick={remove}>Delete Name</Button>
			<Typography>Name: {value}</Typography>
		</>
	);
}

 */
/**
 * useCookie is a custom hook that uses the js-cookie library to interact with cookies. It allows you to get, set, and delete a specific cookie by name.
 * @param name The name of the cookie you want to interact with.
 * @param defaultValue The default value of the cookie if it doesn't exist.
 */
interface UseCookie {
	<T>(name: string, defaultValue: T): [T, (newValue: T, options?: Cookies.CookieAttributes) => void, () => void];
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const useCookie: UseCookie = (name, defaultValue) => {
	const [value, setValue] = useState(() => {
		const cookie = Cookies.get(name);
		if (cookie) return cookie;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		Cookies.set(name, defaultValue);
		return defaultValue;
	});

	const updateCookie = useCallback(
		(newValue, options?: Cookies.CookieAttributes) => {
			Cookies.set(name, newValue, options || {});
			setValue(newValue);
		},
		[name],
	);

	const deleteCookie = useCallback(() => {
		Cookies.remove(name);
		setValue('');
	}, [name]);

	return [value, updateCookie, deleteCookie];
};
