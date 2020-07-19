from django.conf.urls import url
from CDT import view

urlpatterns = [
    url('^index/$', view.index),
    url('^sketch/$', view.sketch),
    url('^save/$', view.save),
]
