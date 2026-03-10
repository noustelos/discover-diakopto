document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const banner = document.querySelector('.vertical-banner');
    const footer = document.querySelector('.main-footer');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
        });
    }

    if (banner && footer) {
        const fadeInPoint = 200;
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const footerTop = footer.getBoundingClientRect().top;
            const bannerBottom = window.innerHeight;
            if (scrollY > fadeInPoint && bannerBottom < footerTop) {
                banner.style.opacity = '1';
            } else {
                banner.style.opacity = '0';
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }

    renderEvents();
    renderLocations();
    injectOdontotosCTA();
});

function injectOdontotosCTA() {
    const ctaTargets = document.querySelectorAll('[data-odontotos-cta]');
    ctaTargets.forEach((target) => {
        target.innerHTML = '<a class="cta-button" href="https://www.odontotos.gr" target="_blank" rel="noopener">Book Your Tickets</a>';
    });
}

function renderEvents() {
    const eventsContainer = document.querySelector('[data-events-list]');
    if (!eventsContainer) {
        return;
    }

    fetch(resolveDataPath('events.json'))
        .then((response) => response.json())
        .then((events) => {
            eventsContainer.innerHTML = events.map((eventItem) => `
                <article class="data-card">
                    <img src="${eventItem.image}" alt="${eventItem.title}">
                    <div class="data-card-content">
                        <h3>${eventItem.title}</h3>
                        <p class="data-card-date">${eventItem.date}</p>
                        <p>${eventItem.description}</p>
                    </div>
                </article>
            `).join('');
        })
        .catch(() => {
            eventsContainer.innerHTML = `
                <article class="data-card placeholder-card">
                    <img src="https://picsum.photos/seed/events-placeholder/900/650" alt="Events placeholder image">
                    <div class="data-card-content">
                        <h3>Upcoming Events (Placeholder)</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </article>
            `;
        });
}

function renderLocations() {
    const locationsContainer = document.querySelector('[data-locations-list]');
    if (!locationsContainer) {
        return;
    }

    fetch(resolveDataPath('locations.json'))
        .then((response) => response.json())
        .then((locations) => {
            locationsContainer.innerHTML = locations.map((locationItem) => `
                <article class="data-card">
                    <img src="${locationItem.image}" alt="${locationItem.name}">
                    <div class="data-card-content">
                        <h3>${locationItem.name}</h3>
                        <p>${locationItem.summary}</p>
                        <a href="${locationItem.link}" class="card-link">View Spot</a>
                    </div>
                </article>
            `).join('');
        })
        .catch(() => {
            locationsContainer.innerHTML = `
                <article class="data-card placeholder-card">
                    <img src="https://picsum.photos/seed/locations-placeholder/900/650" alt="Location placeholder image">
                    <div class="data-card-content">
                        <h3>Featured Spot (Placeholder)</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </article>
            `;
        });
}

function resolveDataPath(fileName) {
    const inEnglishFolder = window.location.pathname.includes('/en/');
    return inEnglishFolder ? `../data/${fileName}` : `data/${fileName}`;
}
