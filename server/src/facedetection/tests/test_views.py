import io

from rest_framework import status
from rest_framework.test import APITestCase

from django.core.files.images import ImageFile
from django.urls import reverse as reverse_api

from facedetection.models import FaceDectection
from facedetection.api.serializers import FaceDetectionSerializer, ImageSerializer, CordsSerializer

from PIL import Image


def generate_image_file(file_name, file_format):
    file = io.BytesIO()
    image = Image.new('RGB', size=(100, 100), color=(164,152,0))
    image.save(file, file_format)
    file.seek(0)
    return ImageFile(file, name=f'{file_name}.{file_format}')

def generate_file():
    file = io.BytesIO()
    file.name = 'test.txt'
    file.seek(0)
    return file

class ImageUploadTest(APITestCase):

    def setUp(self):
        self.valid_payload = {
            'img': generate_image_file('photo', 'png')
        }
        self.invalid_payload = {
            'img': generate_file()
        }

    def test_post_image(self):
        response = self.client.post(
            reverse_api('fd-api:post-fd'),
            data=self.valid_payload,
            format='multipart'
        )

        serializer = CordsSerializer(response.data)

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_file(self):
        response = self.client.post(
            reverse_api('fd-api:post-fd'),
            data=self.invalid_payload,
            format='multipart'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)