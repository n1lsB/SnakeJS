const size = 20;


function Snake() {
	this.head_x = 0;
	this.head_y = 0;
	this.speed_x = 1;
	this.speed_y = 0;
	this.taillength = 0;
	this.tail = [];

	this.append = () => {
		this.taillength++;
	}

	this.checkCollision = (_x, _y) => {
		var d = dist(_x, _y, this.head_x, this.head_y);
		if (d < 1) {
			return true;
		} else {
			return false;
		}
	}

	this.checkSelfCollision = () => {
		for (var i = 0; i < this.tail.length; i++) {
			var vector = this.tail[i];
			var d = dist(vector.x, vector.y, this.head_x, this.head_y);

			if (d < 1) {
				this.tail = [];
				this.taillength = 0;
				return true;
			}
		}
		return false;
	}

	this.draw = () => {
		// draw the head of the snake
		fill(255)
		rect(this.head_x, this.head_y, size, size);

		for (var i = 0; i < this.tail.length; i++) {
			rect(this.tail[i].x, this.tail[i].y, size, size)
		}
	}


	this.setDirection = (_x, _y) => {
		this.speed_x = _x;
		this.speed_y = _y;
	}

	this.checkBounce = () => {
		if (this.head_x < 0) {
			this.setDirection(1, 0)
			this.update()
			this.update()
		}
		if (this.head_y < 0) {
			this.setDirection(0, 1)
			this.update()
			this.update()
		}
		if (this.head_x >= canvas_size) {
			this.setDirection(-1, 0)
			this.update()
			this.update()
		}
		if (this.head_y >= canvas_size) {
			this.setDirection(0, -1)
			this.update()
			this.update()
		}
	}

	this.update = () => {
		// Store the x, y values
		var x = this.head_x;
		var y = this.head_y;

		// Move the head
		this.head_x += this.speed_x * size;
		this.head_y += this.speed_y * size;

		this.checkSelfCollision();

		// Shift the tail.
		if (this.tail.length == this.taillength) {
			for (var i = 0; i < this.tail.length - 1; i++) {
				this.tail[i] = this.tail[i+1];
			}
		}
		// Append the tail.
		if (this.taillength > 0) {
			this.tail[this.tail.length] = createVector(x, y)
		}
		
		this.checkBounce();
		this.checkSelfCollision();
	}
}
