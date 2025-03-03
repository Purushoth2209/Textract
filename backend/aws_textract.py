from flask import Blueprint, request, jsonify
import boto3
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

aws_textract_bp = Blueprint("aws_textract", __name__)

# Access AWS credentials and configuration from environment variables
ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
ACCESS_SECRET_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
REGION_NAME = os.getenv('AWS_REGION')
BUCKET_NAME = os.getenv('AWS_BUCKET_NAME')

s3_client = boto3.client('s3',
                         aws_access_key_id=ACCESS_KEY_ID,
                         aws_secret_access_key=ACCESS_SECRET_KEY,
                         region_name=REGION_NAME)

textract_client = boto3.client('textract',
                               aws_access_key_id=ACCESS_KEY_ID,
                               aws_secret_access_key=ACCESS_SECRET_KEY,
                               region_name=REGION_NAME)

@aws_textract_bp.route('/upload-textract', methods=['POST'])
def upload_textract():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    file_s3 = request.files['file']
    if file:
        try:
            filename = secure_filename(file.filename)

            img_data = file.read()

            response = textract_client.detect_document_text(
                Document={
                    'Bytes': img_data
                }
            )

            detected_text = []
            for item in response['Blocks']:
                if item['BlockType'] == 'LINE':
                    detected_text.append(item['Text'])
            s3_client.upload_fileobj(file_s3, BUCKET_NAME, filename)
            return jsonify({'detected_text': detected_text})

        except Exception as e:
            return jsonify({'error': f'Error processing file: {str(e)}'}), 500

    return jsonify({'error': 'File upload failed'}), 500
