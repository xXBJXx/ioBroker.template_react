import { useState } from 'react';
import useEventListener from './useEventListener';

/*
import React from 'react';
import { Typography } from '@mui/material';
import { useOnlineStatus } from './useOnlineStatus';

export default function TestComponent() {
	const online = useOnlineStatus();

	return (
		<>
			<Typography>online: {online ? 'true' : 'false'}</Typography>
		</>
	);
}

 */

/**
 * useOnlineStatus is a custom hook that returns a boolean value indicating whether the user is online or not.
 */

export const useOnlineStatus = (): boolean => {
	const [online, setOnline] = useState(navigator.onLine);

	useEventListener('online', () => setOnline(navigator.onLine));
	useEventListener('offline', () => setOnline(navigator.onLine));

	return online;
};
