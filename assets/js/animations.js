document.addEventListener('DOMContentLoaded', () => {
	const elements = document.querySelectorAll('.experience-card, .data-card, .blog-card, .featured-card');

	if (!elements.length || !('IntersectionObserver' in window)) {
		return;
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.15 });

	elements.forEach((element) => {
		element.classList.add('reveal');
		observer.observe(element);
	});
});
