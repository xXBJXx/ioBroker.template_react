import { useState } from 'react';
import copy from 'copy-to-clipboard';

interface UseCopyToClipboard {
	(): [(text: any, options?: { debug?: boolean; message?: string }) => void, { value: any; success: boolean }];
}
/*
import React from 'react';
import { Button, TextField } from '@mui/material';
import { useCopyToClipboard } from './useCopyToClipboard';
import { useUpdateEffect } from './useUpdateEffect';

export default function TestComponent() {
	const [value1, setValue] = React.useState('');
	const [copyToClipboard, { value, success }] = useCopyToClipboard();
	useUpdateEffect(() => setValue(value), [value]);
	return (
		<>
			<Button onClick={() => copyToClipboard('This was copied')}>{success ? 'Copied' : 'Copy Text'}</Button>
			<TextField type={'text'} value={value1} onChange={(e) => setValue(e.target.value)} />
		</>
	);
}

 */

/**
 * @description Copy to clipboard hook
 */

export const useCopyToClipboard: UseCopyToClipboard = () => {
	const [value, setValue] = useState<any>();
	const [success, setSuccess] = useState<boolean>(false);

	const copyToClipboard = (text: any, options?: { debug?: boolean; message?: string }): void => {
		const result = copy(text, options || {});
		if (result) setValue(text);
		setSuccess(result);
	};

	return [copyToClipboard, { value, success }];
};
