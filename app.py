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
    photo = request.files.get('photo')

    if not (name and staff_id and bg_image and photo):
        return jsonify({'error': 'Missing input'}), 400

    if bg_image and allowed_file(bg_image.filename):
        bg_filename = secure_filename(bg_image.filename)
        bg_image_path = os.path.join(app.config['UPLOAD_FOLDER'], bg_filename)
        bg_image.save(bg_image_path)
    else:
        return jsonify({'error': 'Invalid background image file type'}), 400

    if photo and allowed_file(photo.filename):
        photo_filename = secure_filename(photo.filename)
        photo_image_path = os.path.join(app.config['UPLOAD_FOLDER'], photo_filename)
        photo.save(photo_image_path)
    else:
        return jsonify({'error': 'Invalid photo file type'}), 400

    # Return JSON data to be handled by JavaScript
    return jsonify({
        'name': name,
        'staff_id': staff_id,
        'bg_image': f'/static/images/uploads/{bg_filename}',
        'photo': f'/static/images/uploads/{photo_filename}'
    })

if __name__ == '__main__':
    app.run(debug=True)
