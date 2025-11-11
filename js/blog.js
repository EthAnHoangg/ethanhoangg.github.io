// Blog accordion functionality
setTimeout(function() {
    const toggles = document.querySelectorAll('.blog-accordion-toggle');

    toggles.forEach(function(toggle) {
        toggle.onclick = function() {
            const parent = this.closest('.blog-highlights');
            if (parent) {
                parent.classList.toggle('active');
            }
        };
    });
}, 100);
