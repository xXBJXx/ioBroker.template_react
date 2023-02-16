import { useEffect, useState } from 'react';

/*
import React from 'react';
import { Typography } from '@mui/material';
import useGeolocation from './useGeolocation';

export default function TestComponent() {
	const { loading, error, coords, timestamp } = useGeolocation();

	return (
		<>
			<Typography component={'h1'}>Loading: {loading.toString()}</Typography>
			<Typography component={'h1'}>Error: {error?.message}</Typography>
			<Typography component={'h1'}>
				{coords?.latitude} x {coords?.longitude}
			</Typography>
			<Typography component={'h1'}>Timestamp: {new Date(timestamp).toLocaleTimeString()}</Typography>
		</>
	);
}

 */
/**
 * useGeolocation is a custom React Hook that allows a component to access the browser's geolocation API and keep track of the device's current position.
 * @param options The hook takes one optional argument: options is an object that allows you to configure the geolocation API, such as the maximum age of the cached position and the timeout before the error callback is called.
 */
export default function useGeolocation(options?: PositionOptions): {
	coords: GeolocationCoordinates | undefined;
	timestamp: EpochTimeStamp | undefined;
	loading: boolean;
	error: GeolocationPositionError | null | undefined;
} {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<GeolocationPositionError | null | undefined>();
	const [coords, setCoords] = useState<GeolocationCoordinates>();
	const [timestamp, setTimestamp] = useState<EpochTimeStamp>();

	useEffect(() => {
		const successHandler = (position: GeolocationPosition): void => {
			setLoading(false);
			setError(null);
			setCoords(position.coords);
			setTimestamp(position.timestamp);
		};
		const errorHandler = (positionError: GeolocationPositionError): void => {
			setError(positionError);
			setLoading(false);
		};
		navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
		const id = navigator.geolocation.watchPosition(successHandler, errorHandler, options);
		return () => navigator.geolocation.clearWatch(id);
	}, [options]);

	return { loading, error, coords, timestamp };
}
