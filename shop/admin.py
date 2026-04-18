from django.contrib import admin

# Register your models here.
from .models import Product

admin.site.register(Product)

from .models import Product, Order,OrderItem

# admin.site.register(Product)
# admin.site.register(Order)
admin.site.register(OrderItem)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_price', 'status', 'created_at')
    list_editable = ('status',)