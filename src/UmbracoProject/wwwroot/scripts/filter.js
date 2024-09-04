document.addEventListener('DOMContentLoaded', function () {
    // Define the filterItems function
    function filterItems(tag) {
        var allItems = document.querySelectorAll('.portfolio-items .work-grid');
        allItems.forEach(function (item) {
            if (tag === '*' || item.classList.contains(tag)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // Remove active class from all filters
        document.querySelectorAll('.filter a').forEach(function (filterLink) {
            filterLink.classList.remove('active');
        });

        // Add active class to the clicked filter
        var activeFilter = Array.from(document.querySelectorAll('.filter a')).find(function (filterLink) {
            return filterLink.getAttribute('onclick').includes("'" + tag + "'");
        });
        if (activeFilter) {
            activeFilter.classList.add('active');
        }
    }

    // Attach filterItems to the window object to make it accessible globally
    window.filterItems = filterItems;
});

                        