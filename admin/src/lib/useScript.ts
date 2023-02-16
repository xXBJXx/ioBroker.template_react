import useAsync from './useAsync';
/*
import React from 'react';
import useScript from './useScript';

export default function TestComponent() {
	const { loading, error } = useScript('https://code.jquery.com/jquery-3.6.0.min.js');
	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;
	return <>{window.$(window).width()}</>;
}

 */

/**
 * useScript is a custom React hook that allows a component to load a JavaScript file from a given URL and keep track of the loading, error, and value states.
 * @param url is the URL of the JavaScript file to be loaded.
 */
export default function useScript(url): { loading: boolean; error: any; value: any } {
	return useAsync(() => {
		const script = document.createElement('script');
		script.src = url;
		script.async = true;

		return new Promise((resolve, reject) => {
			script.addEventListener('load', resolve);
			script.addEventListener('error', reject);
			document.body.appendChild(script);
		});
	}, [url]);
}
