import { useCallback, useState } from 'react';

/*
import React from 'react';
import { TextField, Typography } from '@mui/material';
import { useStateWithValidation } from './useStateWithValidation';

export default function TestComponent() {
	const [username, setUsername, isValid] = useStateWithValidation((name) => name.length >= 5, '');
	return (
		<>
			<Typography component={'h1'}>Valid: {isValid.toString()}</Typography>
			<TextField value={username} onChange={(e) => setUsername(e.target.value)} error={!isValid} />
		</>
	);
}

 */

/**
 * useStateWithValidation is a custom React Hook that allows a component to keep track of a state value and validate the state value on each change.
 * @param validationFunc  is a function that will be called with the new state value on each state change. It should return a boolean indicating whether the state value is valid.
 * @param initialValue is the initial value of the state.
 */
export interface UseStateWithValidation {
	<T>(validationFunc: (value: T) => boolean, initialValue: T): [
		state: T,
		onChange: (nextState: T) => void,
		isValid: boolean,
	];
}
export const useStateWithValidation: UseStateWithValidation = (validationFunc, initialValue) => {
	const [state, setState] = useState(initialValue);
	const [isValid, setIsValid] = useState(() => validationFunc(state));

	const onChange = useCallback(
		(nextState) => {
			const value = typeof nextState === 'function' ? nextState(state) : nextState;
			setState(value);
			setIsValid(validationFunc(value));
		},
		[validationFunc],
	);

	return [state, onChange, isValid];
};
