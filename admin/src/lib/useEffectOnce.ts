import { useEffect } from 'react';

interface UseEffectOnce {
	(cb: () => void): void;
}

export const useEffectOnce: UseEffectOnce = (cb) => {
	useEffect(cb, []);
};
