import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { useLongPress } from './useLongPress';

export default function TestComponent() {
	const elementRef = useRef();
	useLongPress(elementRef, () => alert('Long Press'), { delay: 200 });

	return (
		<>
			<Box
				ref={elementRef}
				sx={{
					backgroundColor: 'red',
					width: '100px',
					height: '100px',
					position: 'absolute',
					top: 'calc(50% - 50px)',
					left: 'calc(50% - 50px)',
				}}
			>
				Toggle
			</Box>
		</>
	);
}
