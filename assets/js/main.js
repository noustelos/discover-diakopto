document.addEventListener('DOMContentLoaded', () => {
    // --- Λογική για το Vertical Banner (υπήρχε ήδη) ---
    const banner = document.querySelector('.vertical-banner');
    const footer = document.querySelector('.main-footer');

    if (banner && footer) {
        const fadeInPoint = 200; // Pixels to scroll before fade in

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const bannerRect = banner.getBoundingClientRect();
            const footerRect = footer.getBoundingClientRect();

            // The banner is fixed, so its position relative to the viewport is constant.
            // We need to check its position against the footer.
            // The banner is rotated, so its "bottom" is its right edge in the viewport.
            // Its effective bottom position on the page is scrollY + viewport height.
            const bannerBottom = window.innerHeight; 

            // Fade in the banner after scrolling down a bit
            if (scrollY > fadeInPoint) {
                banner.style.opacity = '1';
            } else {
                banner.style.opacity = '0';
            }

            // Check if the bottom of the banner's viewport space touches the top of the footer
            if (bannerBottom >= footerRect.top) {
                banner.style.opacity = '0';
            } else if (scrollY > fadeInPoint) {
                // If it's not touching the footer and we are past the fade-in point, it should be visible.
                banner.style.opacity = '1';
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check in case the page loads in a scrolled state
        handleScroll();
    }

    // --- Νέα Λογική για το Mobile Menu ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
        });
    }
});
