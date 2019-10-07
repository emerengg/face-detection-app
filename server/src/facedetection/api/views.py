from django.http import Http404
from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from facedetection.models import FaceDectection
from .serializers import FaceDetectionSerializer, ImageSerializer, CordsSerializer

from facedetection.utils import get_fd_cords

 
class FaceDectectionAPIView(APIView):

    def post(self, request):
        img_serializer = ImageSerializer(data=request.data)
        if img_serializer.is_valid():
            img = img_serializer.validated_data.get('img')
            cords = get_fd_cords(img)
            cords_serializer = CordsSerializer({'cords': cords})
            return Response(cords_serializer.data, status=status.HTTP_201_CREATED)
        return Response(img_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class FaceDectectionCreateView(generics.CreateAPIView):
#     serializer_class    = FaceDetectionSerializer
#     queryset            = FaceDectection.objects.all()


# class FaceDectectionRetrieveView(generics.RetrieveAPIView):
#     lookup_field        = 'pk'
#     serializer_class    = FaceDetectionSerializer
#     queryset            = FaceDectection.objects.all()