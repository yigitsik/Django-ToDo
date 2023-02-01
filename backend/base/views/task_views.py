from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from rest_framework import status

from base.models import Task
from base.serializers import TaskSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTasks(request):

    user = request.user

    tasks = Task.objects.filter(user_id=user.id)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTask(request):
    user = request.user

    print(request.data["deadline"])

    product = Task.objects.create(
        user=user,
        title=request.data["title"],
        status=request.data["status"],
        deadline=request.data["deadline"],
        priority=request.data["priority"],
    )

    serializer = TaskSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteTask(request, pk):

    user = request.user
    tasks = Task.objects.get(id=pk)
    tasks.delete()

    tasks = Task.objects.filter(user_id=user.id)
    serializer = TaskSerializer(tasks, many=True)

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateTask(request, pk):

    data = request.data
    user = request.user

    task = Task.objects.get(id=pk)

    print(data)

    task.user = user
    task.title = data['title']
    task.status = data['status']
    task.deadline = data['deadline']
    task.priority = data['priority']

    task.save()

    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)
