from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField()
    image = models.URLField()
    description = models.TextField()

    def __str__(self):
        return self.name
    
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Delivered', 'Delivered'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    status = models.CharField(max_length=20, default='Pending')


    def __str__(self):
        return f"Order {self.id}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.product.name} ({self.quantity})"