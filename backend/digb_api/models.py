from django.conf import settings
from django.db import models

# Create your models here.

class TimeStampMixin(models.Model):
    created_at = models.DateField(auto_now_add=True, null=True)
    updated_at = models.DateField(auto_now=True, null=True)

    class Meta:
        abstract = True
 
    
class Tax(TimeStampMixin):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="auth_token",
        on_delete=models.CASCADE,
        verbose_name="User",
    )
    tax_return = models.BooleanField(default=False)
    tax_review = models.TextField(null=True)
    tax_esign = models.FileField(upload_to="tax_esign/", null=True)
    tax_submitted_to_irs = models.BooleanField(default=False)
    tax_accepted = models.BooleanField(default=False)

    def __str__(self):
        return f"Main Banner {self.heading}"

    
class Tax_DOC(TimeStampMixin):
    tax_doc = models.ForeignKey(
        Tax, related_name="tax_docs", on_delete=models.CASCADE, default=True)
    file = models.FileField(upload_to="tax_docs/", null=True)
    
    def __str__(self):
        return f"Tax Docs {self.id}"   
          
class Tax_Missing_Info(TimeStampMixin):
    taxes = models.ForeignKey(
        Tax, related_name="tax_infos", on_delete=models.CASCADE, default=True)
    tax_info = models.TextField(null=True) # this is for the section provide missing info
    
    def __str__(self):
        return f"Tax Docs of {self.tax_id}"