document.addEventListener('DOMContentLoaded', function () {
    const cardForm = document.getElementById('cardForm');
    const cardSection = document.getElementById('cardSection');
    const canvas = document.getElementById('cardCanvas');
    const ctx = canvas.getContext('2d');
    const downloadButton = document.getElementById('downloadButton');
    const photoInput = document.getElementById('photo');
    const photoLabel = document.getElementById('photoLabel');
    const bgImageInput = document.getElementById('bg_image');
    const bgImageLabel = document.getElementById('bgImageLabel');

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
                    renderCard(data.name, data.staff_id, data.bg_image, data.photo);
                    // Show the card section
                    cardSection.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    // Function to render the card
    function renderCard(name, staffId, bgImageUrl, photoUrl) {
        const bgImage = new Image();
        const photoImage = new Image();
        const logo = new Image();

        bgImage.crossOrigin = 'Anonymous';
        photoImage.crossOrigin = 'Anonymous';
        logo.crossOrigin = 'Anonymous';

        bgImage.src = bgImageUrl;
        photoImage.src = photoUrl;
        logo.src = '/static/images/school_logo.png'; // Ensure you have a school_logo.png image

        bgImage.onload = function () {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the background image
            ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

            // Draw a semi-transparent overlay
            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw the school logo and name at the top-right
            logo.onload = function () {
                ctx.drawImage(logo, canvas.width - 150, 20, 100, 100);
                ctx.fillStyle = 'white';
                ctx.font = 'bold 20px Arial';
                ctx.fillText('My School', canvas.width - 150, 140);
            };

            // Draw the user's photo
            photoImage.onload = function () {
                const photoSize = 150;
                const photoX = 50;
                const photoY = (canvas.height - photoSize) / 2;

                ctx.save();
                ctx.beginPath();
                ctx.arc(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 0, Math.PI * 2);
                ctx.clip();
                ctx.drawImage(photoImage, photoX, photoY, photoSize, photoSize);
                ctx.restore();

                // Set text styles for name and staff ID
                ctx.fillStyle = 'white';
                ctx.font = 'bold 30px Arial';

                // Name text on the right-center
                ctx.fillText('Name: ' + name, canvas.width / 2, canvas.height / 2 - 20);

                // Staff ID text on the right-center
                ctx.fillText('Staff ID: ' + staffId, canvas.width / 2, canvas.height / 2 + 30);
            };
        };
    }

    // Custom file input button for photo
    photoInput.addEventListener('change', function () {
        const fileName = photoInput.files[0]?.name;
        photoLabel.textContent = fileName ? fileName : 'Choose Your Photo';
    });

    // Custom file input button for background image
    bgImageInput.addEventListener('change', function () {
        const fileName = bgImageInput.files[0]?.name;
        bgImageLabel.textContent = fileName ? fileName : 'Choose Background Image';
    });

    // Download the canvas as an image
    downloadButton.addEventListener('click', function () {
        const link = document.createElement('a');
        link.download = 'campus_card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});
