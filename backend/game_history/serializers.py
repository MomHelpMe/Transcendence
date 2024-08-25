from rest_framework import serializers

class TournamentSerializer(serializers.Serializer):
    game_info = serializers.CharField(required=True, max_length=1000)

    def validate_game_info(self, value):
        if not isinstance(value, str):
            raise serializers.ValidationError("game_info must be a string.")
        return value
