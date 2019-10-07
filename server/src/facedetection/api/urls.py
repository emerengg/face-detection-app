from django.urls import path, re_path

from .views import  FaceDectectionAPIView

app_name = 'fd-api'

urlpatterns = [
    path('', FaceDectectionAPIView.as_view(), name='post-fd'),
] 