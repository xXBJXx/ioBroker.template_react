import useEventListener from './useEventListener';
import React from 'react';

/*
import React, { useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useClickOutside } from './useClickOutside';

export default function TestComponent() {
	const [open, setOpen] = useState(false);
	const modalRef = useRef();

	useClickOutside(modalRef, () => {
		if (open) setOpen(false);
	});

	return (
		<>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Box
				ref={modalRef}
				sx={{
					display: open ? 'block' : 'none',
					bgcolor: 'blue',
					color: 'white',
					width: '100px',
					height: '100px',
					position: 'absolute',
					top: 'calc(50% - 50px)',
					left: 'calc(50% - 50px)',
				}}
			>
				<Typography component={'h1'}>Modal</Typography>
			</Box>
		</>
	);
}

 */

/**
 * useClickOutside is a custom hook that listens for a click event on the document, and when a click happens, it checks if the event target is within the current ref.
 * @param ref
 * @param cb
 */
interface UseClickOutside {
	(ref: React.RefObject<any>, cb: (e: MouseEvent) => void): void;
}
export const useClickOutside: UseClickOutside = (ref, cb) => {
	useEventListener(
		'click',
		(e) => {
			if (ref.current == null || ref.current.contains(e.target)) return;
			cb(e);
		},
		document,
	);
};
