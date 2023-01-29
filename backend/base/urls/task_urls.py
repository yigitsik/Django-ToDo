from django.urls import path
from base.views import task_views as views


urlpatterns = [

    path('', views.getTasks),

    path('create', views.createTask),

    path('delete/<str:pk>', views.deleteTask),

    path('update/<str:pk>', views.updateTask),

]
