document.addEventListener('DOMContentLoaded', function () {
    const cardForm = document.getElementById('cardForm');
    const cardSection = document.getElementById('cardSection');
    const frontCanvas = document.getElementById('frontCanvas');
    const backCanvas = document.getElementById('backCanvas');
    const frontCtx = frontCanvas.getContext('2d');
    const backCtx = backCanvas.getContext('2d');
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
                    // Render both sides of the card
                    renderFrontSide(data.name, data.staff_id, data.photo);
                    renderBackSide(data.bg_image);
                    // Show the card section
                    cardSection.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    // Function to render the front side of the card
    function renderFrontSide(name, staffId, photoUrl) {
        const photoImage = new Image();
        const logo = new Image();

        photoImage.crossOrigin = 'Anonymous';
        logo.crossOrigin = 'Anonymous';

        photoImage.src = photoUrl;

        // Add timestamp to logo URL to avoid 304 caching issues
        logo.src = '/static/images/school_logo.png?' + new Date().getTime();

        photoImage.onload = function () {
            // Clear the canvas
            frontCtx.clearRect(0, 0, frontCanvas.width, frontCanvas.height);

            // Fill the background with a solid color (white)
            frontCtx.fillStyle = '#FFFFFF';
            frontCtx.fillRect(0, 0, frontCanvas.width, frontCanvas.height);

            // Draw the school logo at the top-right with constrained height
            logo.onload = function () {
                const logoHeight = 100; // Adjust this value to change logo height
                const logoWidth = (logo.width / logo.height) * logoHeight; // Maintain aspect ratio
                frontCtx.drawImage(logo, frontCanvas.width - logoWidth - 20, 20, logoWidth, logoHeight); // Align to top-right corner
            };

            // Draw the user's photo with 4:3 aspect ratio
            const photoWidth = 200;
            const photoHeight = (photoWidth * 4) / 3; // 4:3 aspect ratio (height:width)
            const photoX = 75;
            const photoY = (frontCanvas.height - photoHeight) / 2;

            frontCtx.drawImage(photoImage, photoX, photoY, photoWidth, photoHeight);

            // Set text styles for name and staff ID
            frontCtx.fillStyle = 'black';
            frontCtx.font = 'bold 30px Arial';
            frontCtx.textBaseline = 'middle';

            // Name text on the right-center
            frontCtx.fillText('Name: ' + name, frontCanvas.width / 2, frontCanvas.height / 2 - 30);

            // Staff ID text on the right-center
            frontCtx.fillText('Staff ID: ' + staffId, frontCanvas.width / 2, frontCanvas.height / 2 + 30);

            // Add gradient overlay at the top
            const topGradient = frontCtx.createLinearGradient(0, 0, 0, frontCanvas.height / 10);
            topGradient.addColorStop(0, 'rgba(0, 0, 255, 0.5)'); // Blue with 50% opacity
            topGradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent

            frontCtx.fillStyle = topGradient;
            frontCtx.fillRect(0, 0, frontCanvas.width, frontCanvas.height / 2);

            // Add gradient overlay at the bottom
            const bottomGradient = frontCtx.createLinearGradient(0, frontCanvas.height * 9 / 10, 0, frontCanvas.height);
            bottomGradient.addColorStop(0, 'rgba(255, 255, 255, 0)'); // Transparent
            bottomGradient.addColorStop(1, 'rgba(0, 0, 255, 0.5)'); // Blue with 50% opacity

            frontCtx.fillStyle = bottomGradient;
            frontCtx.fillRect(0, frontCanvas.height / 2, frontCanvas.width, frontCanvas.height / 2);
        };
    }


    // Function to render the back side of the card
    function renderBackSide(bgImageUrl) {
        const bgImage = new Image();
        const logo = new Image();

        bgImage.crossOrigin = 'Anonymous';
        logo.crossOrigin = 'Anonymous';

        bgImage.src = bgImageUrl;

        // Add timestamp to logo URL to avoid 304 caching issues
        logo.src = '/static/images/school_logo.png?' + (new Date().getTime() + 50);

        bgImage.onload = function () {
            // Clear the canvas
            backCtx.clearRect(0, 0, backCanvas.width, backCanvas.height);

            // Draw the background image
            backCtx.drawImage(bgImage, 0, 0, backCanvas.width, backCanvas.height);

            // Draw the school logo at the top-left with constrained height
            logo.onload = function () {
                const logoHeight = 100; // Adjust this value to change logo height
                const logoWidth = (logo.width / logo.height) * logoHeight; // Maintain aspect ratio
                backCtx.drawImage(logo, 20, 20, logoWidth, logoHeight); // Align to top-left corner
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

    // Download both canvases as images
    downloadButton.addEventListener('click', function () {
        // Create a combined canvas
        const combinedCanvas = document.createElement('canvas');
        combinedCanvas.width = frontCanvas.width * 2; // Place canvases side by side
        combinedCanvas.height = frontCanvas.height;
        const combinedCtx = combinedCanvas.getContext('2d');

        // Draw front canvas
        combinedCtx.drawImage(frontCanvas, 0, 0);

        // Draw back canvas next to front canvas
        combinedCtx.drawImage(backCanvas, frontCanvas.width, 0);

        // Trigger download
        const link = document.createElement('a');
        link.download = 'campus_card.png';
        link.href = combinedCanvas.toDataURL('image/png');
        link.click();
    });
});
