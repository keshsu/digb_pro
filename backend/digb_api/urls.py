from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'tax', views.TaxViewSet, basename="tax")
router.register(r'tax-doc', views.Tax_DOCViewSet, basename="tax-doc")
router.register(r'tax-missing-info', views.Tax_Missing_InfoViewSet, basename="tax-missing-info")

urlpatterns = [
    path('', include(router.urls)),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
