from flask import Flask, render_template, request, jsonify
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Configuration for file uploads
UPLOAD_FOLDER = 'static/images/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/create_card', methods=['POST'])
def create_card():
    name = request.form.get('name')
    staff_id = request.form.get('staff_id')
    bg_image = request.files.get('bg_image')

    if not (name and staff_id and bg_image):
        return jsonify({'error': 'Missing input'}), 400

    if bg_image and allowed_file(bg_image.filename):
        filename = secure_filename(bg_image.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        bg_image.save(image_path)
    else:
        return jsonify({'error': 'Invalid file type'}), 400

    # Return JSON data to be handled by JavaScript
    return jsonify({
        'name': name,
        'staff_id': staff_id,
        'bg_image': f'/static/images/uploads/{filename}'
    })

if __name__ == '__main__':
    app.run(debug=True)
