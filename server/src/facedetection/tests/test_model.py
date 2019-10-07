import io
import random

from PIL import Image

from django.core.files import File
from django.core.files.images import ImageFile
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from facedetection.models import FaceDectection



def generate_image_file(file_name, file_format):
    file = io.BytesIO()
    image = Image.new('RGB', size=(100, 100), color=(164,152,0))
    image.save(file, file_format)
    file.seek(0)
    # return SimpleUploadedFile(name=f'{file_name}.{file_format}', content=file.read(), content_type='image/jpeg')
    return ImageFile(file, name=f'{file_name}.{file_format}')

class FaceDectectionTest(TestCase):
    """ Test module for FaceDectection model """

    def setUp(self):
        self.name1 = f'example-{str(random.random())[2:]}'
        self.name2 = f'example-{str(random.random())[2:]}'
        self.t1 = FaceDectection.objects.create(img=generate_image_file(self.name1, 'png'))
        self.t2 = FaceDectection.objects.create(img=generate_image_file(self.name2, 'jpeg'))

    def test_image_upload(self):
        tt1 = FaceDectection.objects.get(pk=self.t1.pk)
        tt2 = FaceDectection.objects.get(pk=self.t2.pk)
        self.assertEqual(tt1.img.name, f'{self.name1}.png')
        self.assertEqual(tt2.img.name, f'{self.name2}.jpeg')
