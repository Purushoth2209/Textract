from flask import Flask
from aws_textract import aws_textract_bp  # Import the aws_textract blueprint
from flask_cors import CORS

app = Flask(__name__)

CORS(app)  # This will allow all origins; adjust as needed

# Register the blueprint with the Flask app
app.register_blueprint(aws_textract_bp, url_prefix='/textract')  # Adjust URL prefix if necessary

# Route to test if the server is running
@app.route('/')
def home():
    return "Flask app is running! Use '/textract/upload-textract' to upload files."

if __name__ == "__main__":
    app.run(debug=True)
