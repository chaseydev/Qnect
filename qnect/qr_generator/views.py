from django.shortcuts import render
from django.http import HttpResponse
import segno
import json
from segno import helpers

# Create your views here.
def generate(request):
    if request.method == "POST":

        data = json.loads(request.body)

        print(data)
        
        qr = helpers.make_mecard(
            name=data['name'],
            phone=data['phoneNumber'],
            email=data['emailAddress'],
            url=data['urlLink'])
        
        response = HttpResponse(content_type="image/png")
        qr.save(response, kind='png', scale=10)

        return response