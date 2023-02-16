import { useEffect, useState } from 'react';

/*
import React, { useRef } from 'react';
import { Typography } from '@mui/material';
import useOnScreen from './useOnScreen';

export default function TestComponent() {
	const headerTwoRef = useRef();
	const visible = useOnScreen(headerTwoRef, '-100px');

	return (
		<>
			<Typography component={'h1'}>Header</Typography>
			<Typography>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde incidunt, nam id itaque error dicta?
				Numquam earum iusto optio officia, molestias debitis illum facilis nemo asperiores eaque voluptates
				modi? Dicta mollitia fugit doloremque vitae, dolores sequi fuga quas vel incidunt animi architecto
				dignissimos amet in quam praesentium corrupti voluptate dolorem impedit numquam aut cupiditate nulla!
			</Typography>
			<Typography ref={headerTwoRef}>Header 2 {visible && '(Visible)'}</Typography>
			<Typography>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde incidunt, nam id itaque error dicta?
				Numquam earum iusto optio officia, molestias debitis illum facilis nemo asperiores eaque voluptates
				modi? Dicta mollitia fugit doloremque vitae, dolores sequi fuga quas vel incidunt animi architecto
				dignissimos amet in quam praesentium corrupti voluptate dolorem impedit numquam aut cupiditate nulla!
				Nisi dolore dicta, cumque illum tempora enim dolores eum quis itaque nostrum architecto vel cum officiis
				aperiam qui exercitationem voluptatibus. Veritatis unde doloribus dolorem architecto, eum reprehenderit
				possimus similique eius cum obcaecati totam placeat. Delectus nulla, quae temporibus omnis assumenda
				autem ad quibusdam facilis aspernatur inventore nobis. Vitae architecto, unde consequuntur velit
			</Typography>
		</>
	);
}

 */

/**
 * useOnScreen is a custom React hook that allows a component to detect when a specific DOM element is visible within the viewport and keep track of the visibility status.
 * @param ref is a reference to the DOM element to detect visibility, which is typically created using the React "useRef" hook.
 * @param rootMargin  is an optional string that defines an offset around the root element. It can be used to enlarge or shrink the root element's bounding box before checking for an intersection. The default value is "0px".
 * @returns a boolean value that indicates whether the DOM element is visible within the viewport.
 */
export default function useOnScreen(ref, rootMargin = '0px'): boolean {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (ref.current == null) return;
		const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { rootMargin });
		observer.observe(ref.current);
		return () => {
			if (ref.current == null) return;
			observer.unobserve(ref.current);
		};
	}, [ref.current, rootMargin]);

	return isVisible;
}
