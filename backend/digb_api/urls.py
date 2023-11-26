from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'tax', views.taxViewSet, basename="tax")