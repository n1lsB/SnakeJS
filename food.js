function Food() {
	this.x = floor(random(canvas_size / size)) * size
	this.y = floor(random(canvas_size / size)) * size

	this.draw = () => {
		fill(255,20,147)
		rect(this.x, this.y, size, size)
	}
}