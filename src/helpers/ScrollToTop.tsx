import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: FC = () => {
	// This element scrolls to the top of the page when the url changes
	const { pathname } = useLocation();

	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

export default ScrollToTop;
