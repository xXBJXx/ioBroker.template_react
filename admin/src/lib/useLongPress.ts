import useEventListener from './useEventListener';
import { useTimeout } from './useTimeout';
import { useEffectOnce } from './useEffectOnce';
import { MutableRefObject } from 'react';

/*
import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { useLongPress } from './useLongPress';

export default function TestComponent() {
	const elementRef = useRef();
	useLongPress(elementRef, () => alert('Long Press'), { delay: 1000 });

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

 */

export const useLongPress = (ref: MutableRefObject<undefined>, cb: { (): void }, { delay = 250 } = {}): void => {
	const { reset, clear } = useTimeout(cb, delay);
	useEffectOnce(clear);

	useEventListener('mousedown', reset, ref.current);
	useEventListener('touchstart', reset, ref.current);

	useEventListener('mouseup', clear, ref.current);
	useEventListener('mouseleave', clear, ref.current);
	useEventListener('touchend', clear, ref.current);
};
