import { useEffect, useRef } from 'react';
import useRenderCount from './useRenderCount';

/*
import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import useToggle from './useToggle';
import { useDebugInformation } from "./useDebugInformation";

export default function TestComponent() {
	const [boolean, toggle] = useToggle(false);
	const [count, setCount] = useState(0);

	return (
		<>
			<ChildComponent toggle={boolean} count={count} />
			<Button onClick={toggle}>Toggle</Button>
			<Button onClick={() => setCount((prevCount) => prevCount + 1)}>Increment</Button>
		</>
	);
}

function ChildComponent(props) {
	const info = useDebugInformation('ChildComponent', props);
	return (
		<>
			<Typography variant="body1">{props.toggle.toString()}</Typography>
			<Typography variant="body1">{props.count}</Typography>
			<Typography variant="body1">{JSON.stringify(info, null, 2)}</Typography>
		</>
	);
}

 */
interface UseDebugInformation {
	(componentName: string, props: any): {
		count: number;
		changedProps: any;
		timeSinceLastRender: number;
		lastRenderTimestamp: number;
	};
}
export const useDebugInformation: UseDebugInformation = (componentName, props) => {
	const count = useRenderCount();
	const changedProps = useRef({});
	const previousProps = useRef(props);
	const lastRenderTimestamp = useRef(Date.now());

	const propKeys = Object.keys({ ...props, ...previousProps });
	changedProps.current = propKeys.reduce((obj, key) => {
		if (props[key] === previousProps.current[key]) return obj;
		return {
			...obj,
			[key]: { previous: previousProps.current[key], current: props[key] },
		};
	}, {});
	const info = {
		count,
		changedProps: changedProps.current,
		timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
		lastRenderTimestamp: lastRenderTimestamp.current,
	};

	useEffect(() => {
		previousProps.current = props;
		lastRenderTimestamp.current = Date.now();
		console.log('[debug-info]', componentName, info);
	});

	return info;
};
