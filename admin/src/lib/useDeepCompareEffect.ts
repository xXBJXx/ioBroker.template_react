import { useEffect, useRef } from 'react';
import isEqual from 'lodash/fp/isEqual';

/*
import React, { useEffect, useRef, useState } from 'react';
import useDeepCompareEffect from './useDeepCompareEffect';
import { Button, Typography } from '@mui/material';

export default function TestComponent() {
	const [age, setAge] = useState(0);
	const [otherCount, setOtherCount] = useState(0);
	const useEffectCountRef = useRef();
	const useDeepCompareEffectCountRef = useRef();

	const person = {
		age: {
			age,
		},
		name: {
			first: 'John',
			last: 'Doe',
		},
	};

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		useEffectCountRef.current.textContent = parseInt(useEffectCountRef.current.textContent) + 1;
	}, [person]);

	useDeepCompareEffect(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		useDeepCompareEffectCountRef.current.textContent =
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			parseInt(useDeepCompareEffectCountRef.current.textContent) + 1;
	}, [person]);

	return (
		<>
			<div>
				<div>
					useEffect:{' '}
					<Typography component={'span'} ref={useEffectCountRef}>
						0
					</Typography>
				</div>
				<div>
					useDeepCompareEffect:{' '}
					<Typography component={'span'} ref={useDeepCompareEffectCountRef}>
						0
					</Typography>
				</div>
				<div>Other Count: {otherCount}</div>
				<div>{JSON.stringify(person)}</div>
				<Button onClick={() => setAge((currentAge) => currentAge + 1)}>Increment Age</Button>
				<Button onClick={() => setOtherCount((count) => count + 1)}>Increment Other Count</Button>
			</div>
		</>
	);
}

 */

/**
 * useDeepCompareEffect is a custom React hook that allows a component to run an effect only when the dependencies have changed using a deep comparison instead of a shallow comparison.
 * @param callback
 * @param dependencies
 */

export default function useDeepCompareEffect(callback: () => void, dependencies: any[] | undefined): void {
	const currentDependenciesRef = useRef<any[] | undefined>();

	if (!isEqual(currentDependenciesRef.current, dependencies)) {
		currentDependenciesRef.current = dependencies;
	}

	useEffect(callback, [currentDependenciesRef.current]);
}
