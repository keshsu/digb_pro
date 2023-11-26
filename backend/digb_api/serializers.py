
import os
from rest_framework import serializers
from django.shortcuts import get_object_or_404
from digb_api.models import *

class Tax_DOCSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tax_DOC
        fields = "__all__"

class Tax_Missing_InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tax_Missing_Info
        fields = "__all__"

class TaxSerializer(serializers.ModelSerializer):
    tax_docs = Tax_DOCSerializer(required=False, many=True)
    tax_missing_infos = Tax_Missing_InfoSerializer(required=False, many=True)

    class Meta:
        model = Tax
        fields = "__all__"

    def create(self, validated_data):
        tax_docs = validated_data.pop("tax_docs")
        tax_missing_infos = validated_data.pop("tax_missing_infos")
        tax = Tax.objects.create(**validated_data)

        for tax_doc_data in tax_docs:
            Tax_DOC.objects.create(tax=tax, file=tax_doc_data.get('[file]'))
 
        for tax_missing_info in tax_missing_infos:
            Tax_Missing_Info.objects.create(tax=tax, tax_info=tax_missing_info.get('[tax_info]'))

        return tax


    def update(self, instance, validated_data):
        tax_docs_data = validated_data.pop("tax_docs")
        tax_missing_infos_data = validated_data.pop("tax_missing_infos")
        tax_esign = validated_data.pop("tax_esign")
        instance = instance
        if tax_esign:
            try:
                os.remove(instance.image.path)
            except:
                pass
        instance.image = tax_esign
        instance.save()

        if tax_docs_data:
            for tax_doc in tax_docs_data:
                if tax_doc['[id]']:
                    td = get_object_or_404(
                        Tax_DOC, id=tax_doc['[id]'])
                    if tax_doc['[file]']:
                        try:
                            os.remove(td.file.path)
                        except:
                            pass
                    
                    td.file = tax_doc['[file]']
                    td.save()
                else:
                    Tax_DOC.objects.create(
                        tax_doc=instance,
                        file=tax_doc['[file]'],
                    )

        if tax_missing_infos_data:
            for tax_missing_info in tax_missing_infos_data:
                if tax_missing_info['[id]']:
                    tm = get_object_or_404(
                        Tax_Missing_Info, id=tax_missing_info['[id]'])

                    tm.tax_info = tax_missing_info['[tax_info]']
                    tm.save()
                else:
                    Tax_Missing_Info.objects.create(
                        taxes=instance,
                        tax_info=tax_missing_info['[tax_info]'],
                    )

        return instance
