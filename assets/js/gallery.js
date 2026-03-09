document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryDataUrl = 'data/gallery.json';
    const galleryTemplateUrl = 'components/gallery-grid.html';

    if (galleryGrid) {
        Promise.all([
            fetch(galleryDataUrl).then(response => response.json()),
            fetch(galleryTemplateUrl).then(response => response.text())
        ])
        .then(([data, template]) => {
            let galleryHtml = '';
            data.forEach(item => {
                galleryHtml += template
                    .replace('{src}', item.src)
                    .replace('{thumbnail}', item.thumbnail)
                    .replace('{alt}', item.alt);
            });
            galleryGrid.innerHTML = galleryHtml;
            baguetteBox.run('.gallery-grid');
        })
        .catch(error => console.error('Error loading gallery:', error));
    }
});
