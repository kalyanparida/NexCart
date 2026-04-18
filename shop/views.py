from django.shortcuts import render
from .models import Product,Order,OrderItem
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

def home(request):
    products = Product.objects.all()
    return render(request, 'index.html', {'products': products})

def cart_page(request):
    return render(request, 'cart.html')

from django.http import JsonResponse
import json
from django.contrib.auth.decorators import login_required

@csrf_exempt
@login_required
def place_order(request):
    if request.method == "POST":
        data = json.loads(request.body)

        items = data.get("items")
        total = data.get("total")

        order = Order.objects.create(
            user=request.user,
            total_price=total
        )

        for item in items:
            product = Product.objects.get(id=item['id'])

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item['quantity']
            )

        return JsonResponse({"message": "Order saved"})
    


@login_required
def my_orders(request):
    orders = Order.objects.filter(user=request.user).order_by('-id')
    return render(request, 'my_orders.html', {'orders': orders})