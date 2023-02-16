import { useEffect, useRef } from 'react';

export default function useRenderCount(): number {
	const count = useRef(1);
	useEffect(() => {
		count.current++;
	});
	return count.current;
}
