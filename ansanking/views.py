from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def ansan_king(request):
    data = {"message": "AnsanKing!!"}
    return Response(data)
