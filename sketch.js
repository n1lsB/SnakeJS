var snake;
var food;
var paused = false;

var canvas_size = 600;

function setup() {
	canvas_size = min(window.innerWidth, window.innerHeight) - 20
	canvas_size = canvas_size - canvas_size % size;

	createCanvas(canvas_size, canvas_size)
	background(0)
	frameRate(10)

	snake = new Snake();
	food = new Food();
}

function touchStarted() {
	var third = canvas_size / 3;

	if (mouseX > third && mouseX < third * 2) {
		// change in y-Direction
		if (mouseY < third) {
			snake.setDirection(0, -1)
		} else if (mouseY > third * 2) {
			snake.setDirection(0, 1)
		}
	} else {
		// change in x-Direction
		if (mouseX < third) {
			snake.setDirection(-1, 0)
		} else if (mouseX > third * 2) {
			snake.setDirection(1, 0)
		}
	}
	return false;
}

function draw() {
	if (paused)
		return;

	background(0);

	snake.update();

	if (snake.checkCollision(food.x, food.y)) {
		snake.append();
		food = new Food();
	}

	food.draw();
	snake.draw();
}


function keyPressed() {
	switch (keyCode) {
		case UP_ARROW:
			snake.setDirection(0, -1)
			break;
		case DOWN_ARROW:
			snake.setDirection(0, 1)
			break;
		case LEFT_ARROW:
			snake.setDirection(-1, 0)
			break;
		case RIGHT_ARROW:
			snake.setDirection(1, 0)
			break; 
	}
}