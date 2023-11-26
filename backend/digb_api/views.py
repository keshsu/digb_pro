from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import viewsets, status, filters
from digb_api.paginations import CustomPagination
from .models import *
from .serializers import *

############################
# Tax_DOC CRUD Operation Starts
############################

@permission_classes([IsAuthenticatedOrReadOnly, ])
class Tax_DOCViewSet(viewsets.ModelViewSet):

    def list(self, request):
        tax_doc = list(
            reversed(Tax_DOC.objects.all()))
        serializer = Tax_DOCSerializer(
            tax_doc, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = Tax_DOCSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        tax_docs = get_object_or_404(Tax_DOC, id=pk)
        serializer = Tax_DOCSerializer(
            tax_docs, many=False)
        return Response(serializer.data)

    def update(self, request, pk=None):
        tax_docs = get_object_or_404(Tax_DOC, id=pk)
        serializer = Tax_DOCSerializer(
            instance=tax_docs, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        tax_docs = get_object_or_404(Tax_DOC, id=pk)
        tax_docs.delete()
        return Response("Tax Doc Successfully Deleted")

############################
# Tax_DOC CRUD Operation ends
############################


############################
# Tax_Missing_Info CRUD Operation Starts
############################

@permission_classes([IsAuthenticatedOrReadOnly, ])
class Tax_Missing_InfoViewSet(viewsets.ModelViewSet):

    def list(self, request):
        tax_info = list(
            reversed(Tax_Missing_Info.objects.all()))
        serializer = Tax_Missing_InfoSerializer(
            tax_info, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = Tax_Missing_InfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        tax_info = get_object_or_404(Tax_Missing_Info, id=pk)
        serializer = Tax_Missing_InfoSerializer(
            tax_info, many=False)
        return Response(serializer.data)

    def update(self, request, pk=None):
        tax_info = get_object_or_404(Tax_Missing_Info, id=pk)
        serializer = Tax_Missing_InfoSerializer(
            instance=tax_info, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        tax_info = get_object_or_404(Tax_Missing_Info, id=pk)
        tax_info.delete()
        return Response("University Courses Successfully Deleted")

############################
# Tax_Missing_Info CRUD Operation ends
############################


############################
# Tax CRUD Operation Starts
############################

@permission_classes([IsAuthenticatedOrReadOnly, ])
class TaxViewSet(viewsets.ModelViewSet):
    pagination_class = CustomPagination
    serializer_class = TaxSerializer
    queryset = Tax.objects.all()

    def get_queryset(self):
        sortBy = self.request.query_params.get('sortBy')
        orderBy = self.request.query_params.get('orderBy') or 'asc'
        tax = Tax.objects.all()

        if sortBy and orderBy == 'asc':
            sortBy = sortBy.replace("/", "")
            tax = tax.order_by(sortBy)

        if sortBy and orderBy == 'desc':
            sortBy = sortBy.replace("/", "")
            tax = list(reversed(tax.order_by(sortBy)))

        return tax

    def create(self, request):
        serializer = TaxSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        tax = get_object_or_404(Tax, id=pk)
        serializer = TaxSerializer(tax, many=False)
        return Response(serializer.data)

    def update(self, request, pk=None):
        tax = get_object_or_404(Tax, id=pk)
        serializer = TaxSerializer(
            instance=tax, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        tax = get_object_or_404(Tax, id=pk)
        if tax.image:
            try:
                os.remove(tax.image.path)
            except:
                pass
        tax.delete()
        return Response("Tax Successfully Deleted")

############################
# Tax CRUD Operation ends
############################
