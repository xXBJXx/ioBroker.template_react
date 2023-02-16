import React from 'react';

/*
Example:
import useToggle from './useToggle';
import { Button, Stack } from '@mui/material';
import React from 'react';

export default function TestComponent() {
	const [value, toggleValue] = useToggle(false);

	return (
		<>
			{value.toString()}
			<Stack spacing={2} direction="row">
				<Button variant={'contained'} onClick={toggleValue}>
					Toggle
				</Button>
				<Button variant={'contained'} onClick={() => toggleValue(true)}>
					Make True
				</Button>
				<Button variant={'contained'} onClick={() => toggleValue(false)}>
					Make False
				</Button>
			</Stack>
		</>
	);
}
*/

/*
 * useToggle
 * const [value, toggleValue] = useToggle(false);
 * toggleValue(true); | toggleValue(false); | toggleValue('any');
 */
export default function useToggle(defaultValue: any): [boolean, (value: any) => void] {
	const [value, setValue] = React.useState<boolean>(defaultValue);

	function toggleValue(value): void {
		setValue((currentValue) => (typeof value === 'boolean' ? value : !currentValue));
	}

	return [value, toggleValue];
}
