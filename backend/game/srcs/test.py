import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches

class Box:
    def __init__(self, x, y, width, height):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.h_width = width / 2
        self.h_height = height / 2


def is_colliding(block, ball):
    face = np.array(
        [
            block.h_width + ball.h_width - abs(block.x - ball.x),
            block.h_height + ball.h_height - abs(block.y - ball.y),
        ]
    )
    if face[0] < 0 or face[1] < 0:
        return False, None, None

    penetration = min(face)
    if face[0] < face[1]:
        if block.x < ball.x:
            return True, "right", penetration
        else:
            return True, "left", penetration
    if block.y < ball.y:
        return True, "top", penetration
    return True, "bottom", penetration


def update_plot():
    ax.clear()
    # 박스 그리기
    rect1 = patches.Rectangle((box.x - box.h_width, box.y - box.h_height), box.width, box.height, linewidth=1, edgecolor='r', facecolor='none')
    rect2 = patches.Rectangle((ball.x - ball.h_width, ball.y - ball.h_height), ball.width, ball.height, linewidth=1, edgecolor='b', facecolor='none')
    ax.add_patch(rect1)
    ax.add_patch(rect2)

    # 축 설정
    ax.set_xlim(-15, 25)
    ax.set_ylim(-15, 25)
    ax.set_aspect('equal', adjustable='box')
    plt.grid(True)
    plt.xticks(np.arange(-15, 26, 1))
    plt.yticks(np.arange(-15, 26, 1))
    plt.xlabel('X-axis')
    plt.ylabel('Y-axis')

    # 충돌 감지
    collision, collision_edges, penetration = is_colliding(box, ball)
    if collision:
        plt.title(f"{collision_edges}, penetration = {penetration}")
    else:
        plt.title("no collision")

    plt.draw()

def on_key(event):
    step = 0.25
    if event.key == 'up':
        ball.y += step
    elif event.key == 'down':
        ball.y -= step
    elif event.key == 'left':
        ball.x -= step
    elif event.key == 'right':
        ball.x += step
    update_plot()

# 예제 박스
box = Box(0, 0, 10, 10)
ball = Box(5, 6, 5, 4)

# 초기 플롯 설정
fig, ax = plt.subplots()
fig.canvas.mpl_connect('key_press_event', on_key)
update_plot()

plt.show()
