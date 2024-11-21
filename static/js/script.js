document.addEventListener('DOMContentLoaded', function () {
    const cardForm = document.getElementById('cardForm');
    const cardSection = document.getElementById('cardSection');
    const canvas = document.getElementById('cardCanvas');
    const ctx = canvas.getContext('2d');
    const downloadButton = document.getElementById('downloadButton');

    cardForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(cardForm);

        // Send the form data via AJAX
        fetch('/create_card', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    // Render the card on the canvas
                    renderCard(data.name, data.staff_id, data.bg_image);
                    // Show the card section
                    cardSection.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    function renderCard(name, staffId, bgImageUrl) {
        const bgImage = new Image();
        bgImage.crossOrigin = 'Anonymous'; // Handle cross-origin issues
        bgImage.src = bgImageUrl;
        bgImage.onload = function () {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the background image
            ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

            // Optional: Draw a semi-transparent overlay
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Set text styles
            ctx.fillStyle = 'white';
            ctx.font = 'bold 40px Arial';

            // Draw the name and staff ID
            ctx.fillText('Name: ' + name, 50, canvas.height - 100);
            ctx.fillText('Staff ID: ' + staffId, 50, canvas.height - 50);
        };
    }

    // Download the canvas as an image
    downloadButton.addEventListener('click', function () {
        const link = document.createElement('a');
        link.download = 'campus_card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});
