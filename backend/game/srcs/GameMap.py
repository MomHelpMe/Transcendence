class GameMap:
    HEIGHT = 6
    WIDTH = 10

    def __init__(self):
        self.map = [[0 for _ in range(self.WIDTH)] for _ in range(self.HEIGHT)]
        self.diff = []
        for i in range(0, self.HEIGHT):
            for j in range(self.WIDTH // 2, self.WIDTH):
                self.map[i][j] = 1

    def debug(self):
        for i in range(0, self.HEIGHT):
            print(self.map[i])

    async def init(self):
        self.diff = []

    def update(self, x, y, value):
        if 0 <= x < self.WIDTH and 0 <= y < self.HEIGHT:
            self.map[y][x] = value
            self.diff.append((y, x, value))