import uuid

from django.db import models

from .utils import get_fd_cords


class FaceDectection(models.Model):
    unique_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    img = models.ImageField(blank=True)
    cords = models.TextField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.cords:
            cords = get_fd_cords(self.img)
            self.cords = cords
        super(FaceDectection, self).save(*args, **kwargs)