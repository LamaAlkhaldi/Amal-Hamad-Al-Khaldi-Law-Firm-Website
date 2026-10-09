document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.close-btn');

    document.querySelectorAll('.toggle-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.service-card');
            
            if (card) {
                const title = card.querySelector('.service-header h3').innerText;
                const detailsHtml = card.querySelector('.service-details').innerHTML;

                modalTitle.innerText = title;
                modalBody.innerHTML = detailsHtml;
                modal.style.display = 'flex';
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
