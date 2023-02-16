import { useEffect, useRef } from 'react';

/*
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import useEventListener from './useEventListener';

export default function TestComponent() {
	const [key, setKey] = useState('');
	useEventListener('keydown', (e) => {
		setKey(e.key);
	});

	return (
		<>
			<Typography component={'span'}>Last Key: {key}</Typography>
		</>
	);
}

 */

/**
 * useEventListener is a custom React hook that allows a component to add an event listener to a specific DOM element and execute a callback function when the event occurs.
 * @param eventType
 * @param callback
 * @param element
 */
export default function useEventListener(eventType: string, callback: (e: any) => void, element?: any): void {
	element = element || window;
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if (element == null) return;
		const handler = (e): any => callbackRef.current(e);
		element.addEventListener(eventType, handler);

		return () => element?.removeEventListener(eventType, handler);
	}, [eventType, element]);
}
