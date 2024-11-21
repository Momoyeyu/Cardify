from flask import Flask, render_template, request, send_from_directory
import os

app = Flask(__name__)

# Define static folder for uploaded images
app.config['UPLOAD_FOLDER'] = 'static/images'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/create_card', methods=['POST'])
def create_card():
    name = request.form.get('name')
    staff_id = request.form.get('staff_id')
    bg_image = request.files['bg_image']

    # Save background image
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], bg_image.filename)
    bg_image.save(image_path)

    return render_template('card.html', name=name, staff_id=staff_id, bg_image=image_path)


if __name__ == '__main__':
    app.run(debug=True)
