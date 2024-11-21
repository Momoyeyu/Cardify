# Cardify

**Cardify** is a web application built with Python and Flask that allows users to create personalized campus cards. Users can customize their cards by inputting their name and staff ID, uploading a profile photo, and selecting a background image. The application generates both the front and back sides of the campus card, offering a professional and aesthetically pleasing design. Users can preview their cards and download them as images for easy printing or digital use.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Personalized Input**: Users can input their name and staff ID.
- **Image Uploads**: Upload a profile photo and a background image for the card.
- **Dual-Sided Cards**: Generates both front and back sides of the campus card.
  - **Front Side**:
    - Displays user photo with a 4:3 aspect ratio.
    - Shows user name and staff ID.
    - Includes the school logo at the top-right corner.
    - Features gradient overlays for enhanced visual appeal.
  - **Back Side**:
    - Displays the selected background image.
    - Includes the school logo at the top-left corner.
- **Responsive Design**: Ensures the application is accessible and looks great on all devices.
- **Download Option**: Users can download the rendered campus card as an image.
- **Custom Styled Upload Buttons**: Enhanced user interface for uploading images with file name display.

## Demo

![demo](static/images/demo.png)

## Installation

### Prerequisites

- Python 3.x installed on your machine.
- Git installed on your machine.

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/cardify.git
   cd cardify
   ```
2. **Create a Virtual Environment**

   It's recommended to use a virtual environment to manage dependencies.

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```
4. **Add School Logo**

   Ensure you have a `school_logo.png` image placed in the `static/images/` directory.

   ```bash
   mkdir -p static/images
   # Place your school_logo.png inside static/images/
   ```

## Usage

1. **Run the Application**

   ```bash
   python app.py
   ```
2. **Access the Application**

   Open your web browser and navigate to `http://127.0.0.1:5000`.
3. **Create Your Campus Card**

   - Fill in your **Name** and **Staff ID**.
   - Upload a **Background Image**.
   - Upload your **Profile Photo**.
   - Click on **Create My Card** to generate your personalized campus card.
   - Preview the front and back sides of your card.
   - Click **Download Your Card** to save the card as an image.

## Project Structure

```
cardify/
├── app.py
├── requirements.txt
├── static/
│   ├── css/
│   │   └── styles.css
│   ├── images/
│   │   ├── school_logo.png
│   │   └── uploads/
│   └── js/
│       └── script.js
├── templates/
│   └── index.html
└── README.md
```

- **app.py**: The main Flask application file handling routes and backend logic.
- **requirements.txt**: Lists the Python dependencies required for the project.
- **static/**: Contains static assets like CSS, JavaScript, and images.
  - **css/styles.css**: Stylesheet for the application.
  - **js/script.js**: JavaScript file handling front-end interactions.
  - **images/**:
    - **school_logo.png**: The school's logo displayed on the cards.
    - **uploads/**: Directory where uploaded images are stored.
- **templates/index.html**: The main HTML template for the application.
- **README.md**: Project documentation.

## Technologies Used

- **Backend**:
  - [Python](https://www.python.org/)
  - [Flask](https://flask.palletsprojects.com/)
- **Frontend**:
  - [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)
  - [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
  - [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **Other Tools**:
  - [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
  - [Git](https://git-scm.com/)

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**
2. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Commit Your Changes**

   ```bash
   git commit -m "Add your feature"
   ```
4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```
5. **Open a Pull Request**

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or suggestions, feel free to reach out:

- **Email**: [sujunjie@bupt.edu.cn](mailto:sujunjie@bupt.edu.cn)
- **GitHub**: [Momoyeyu](https://github.com/Momoyeyu)

Developed by **Junjie Su** as part of the "Web Development" course homework at Beijing University of Posts and Telecommunications.
