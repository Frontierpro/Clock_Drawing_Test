import os
import base64
import subprocess
from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def sketch(request):
    return render(request, 'sketch.html')

def save(request):
    image_data = request.POST.get('img_info')
    image_id = int(request.POST.get('img_id'))

    img_data = base64.b64decode(image_data)
    if image_id == 0:
        file = open('data/1.png',"wb")
    elif image_id == 1:
        file = open('data/2.png',"wb")
    elif image_id == 2:
        file = open('data/3.png',"wb")
    else:
        file = open('data/4.png',"wb")
        hour = int(request.POST.get('time_hour'))
        minute = int(request.POST.get('time_minute'))
    file.write(img_data)
    file.close()
    if image_id == 3:
        '''
        cmd = 'cd.. && '
        cmd += 'cd judge && '
        cmd += 'python -m CDT imgs/1.png imgs/2.png'
        execmd = subprocess.Popen(cmd, shell = True, stdin = subprocess.PIPE, stdout = subprocess.PIPE)
        point = execmd.wait()
        return HttpResponse(point)
        '''
    
    return HttpResponse(-1)
