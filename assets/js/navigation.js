document.addEventListener('DOMContentLoaded', () => {
	const menuToggle = document.querySelector('.menu-toggle');
	const nav = document.querySelector('nav');

	if (!menuToggle || !nav) {
		return;
	}

	menuToggle.addEventListener('click', () => {
		nav.classList.toggle('nav-open');
	});

	nav.querySelectorAll('a').forEach((anchor) => {
		anchor.addEventListener('click', () => {
			nav.classList.remove('nav-open');
		});
	});
});
