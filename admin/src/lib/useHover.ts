import React, { useState } from 'react';
import useEventListener from './useEventListener';

/*
import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { useHover } from './useHover';

export default function TestComponent() {
	const elementRef = useRef();
	const hovered = useHover(elementRef);

	return (
		<>
			<Box
				ref={elementRef}
				sx={{
					backgroundColor: hovered ? 'primary.main' : 'secondary.main',
					color: 'white',
					p: 2,
					m: 2,
					borderRadius: 1,
					width: 100,
					textAlign: 'center',
					height: 100,
				}}
			>
				Toggle
			</Box>
		</>
	);
}

 */
interface UseHover {
	(ref: React.MutableRefObject<undefined>): boolean;
}

/**
 * This hook lets you track whether an element is currently being hovered by the user's mouse.
 * The hook takes a single argument, ref, which refers to the element you want to track hover events for.
 * @param ref
 */
export const useHover: UseHover = (ref) => {
	const [hovered, setHovered] = useState(false);

	useEventListener('mouseover', () => setHovered(true), ref.current);
	useEventListener('mouseout', () => setHovered(false), ref.current);

	return hovered;
};
