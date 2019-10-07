from rest_framework import serializers

from facedetection.models import FaceDectection


class ImageSerializer(serializers.Serializer):
    img = serializers.ImageField()
    

class CordsSerializer(serializers.Serializer):
    cords = serializers.CharField()


class FaceDetectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaceDectection
        fields = [
            'unique_id',
            'img',
            'cords'
        ]
        read_only_fields = ['unique_id', 'cords']
