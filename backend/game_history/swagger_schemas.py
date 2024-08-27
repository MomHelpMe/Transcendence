from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

def tournament_post_schema():
    return swagger_auto_schema(
        operation_description="Save a new tournament data in Sepolia Ethereum blockchain",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'game_info': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    example='{ "game1": {"Jiko": 1, "PSY": 2}, "game2": {"KimYuna": 2, "BTS": 1}, "game3": {"PSY": 2, "KimYuna": 1} }'
                ),
            },
            required=['game_info'],
        ),
        responses={
            200: openapi.Response(
                description="Tournament added successfully",
                content=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING, example="Tournament added successfully.")
                    }
                )
            ),
            400: "Bad Request",
            401: "Unauthorized",
            500: "Internal Server Error",
        }
    )

def tournament_get_schema():
    return swagger_auto_schema(
        operation_description="Retrieve a list of tournaments for the authenticated user from Sepolia Ethereum blockchain",
        responses={
            200: openapi.Response(
                description="A list of tournaments",
                content=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'tournaments_list': openapi.Schema(
                            type=openapi.TYPE_ARRAY,
                            items=openapi.Schema(
                                type=openapi.TYPE_OBJECT,
                                additional_properties=openapi.Schema(type=openapi.TYPE_INTEGER)
                            ),
                            example=[
                                {
                                    "game1": {"Jiko": 4, "PSY": 2},
                                    "game2": {"KimYuna": 2, "BTS": 1},
                                    "game3": {"Jiko": 2, "KimYuna": 1}
                                }
                            ]
                        )
                    }
                )
            ),
            401: "Unauthorized",
            500: "Internal Server Error",
        }
    )
