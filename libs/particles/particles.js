let particles = document.querySelectorAll('canvas.particles'), //Отримує всі елементи на сторінці, що мають тег canvas і клас "particles".
		radius = 1.35,
		number = 700

particles.forEach(node => { //Для кожного елемента canvas, знайденого на сторінці, виконує функцію, передаючи його як аргумент.


	
	const color = node.dataset.color, //Отримує колір частинок атрибуту "data-color" елемента canvas.
				ctx = node.getContext('2d'),
				clr = hexToRgbA(color),
				width = window.innerWidth, //Отримує ширину поточного вікна браузера.
				height = window.innerHeight //Отримує висоту поточного вікна браузера.

	node.width = width ///Встановлює ширину елемента canvas, що дорівнює ширині вікна браузера.
	node.height = height //Встановлює висоту елемента canvas дорівнює висоті вікна браузера.
	ctx.fillStyle = clr //Встановлює колір заливки для canvas елемент.

	let dots = {
		num: number,
		distance: 200,
		d_radius: 200,
		velocity: -.9,
		array: []
	}

	function Dot() {//Створює конструктор створення частинок.
		this.x = Math.random() * width
		this.y = Math.random() * height
		this.vx = dots.velocity + Math.random()
		this.vy = dots.velocity + Math.random()
		this.radius = Math.random() * radius
	}

	Dot.prototype = {//Встановлює методи "create" та "animate" для об'єкта "Dot".

		create: function () {
			ctx.beginPath()
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
			ctx.fill()
		},

		animate: function () {
			for (let i = 0; i < dots.num; i++) {
				let dot = dots.array[i]
				if (dot.x < 0 || dot.x > width) {
					dot.vx = - dot.vx
					dot.vy = dot.vy
				} else if (dot.y < 0 || dot.y > height) {
					dot.vx = dot.vx
					dot.vy = - dot.vy
				}
				dot.x += dot.vx
				dot.y += dot.vy
			}
		}
	}

	function createDots() {//Створює функцію для створення та анімації частинок.
		ctx.clearRect(0, 0, width, height)
		for (let i = 0; i < dots.num; i++) {
			dots.array.push(new Dot())
			dot = dots.array[i]
			dot.create()
		}
		dot.animate()
	}

	setInterval(createDots, 1000 / 30)//Запускає функцію "createDots" кожні 33 мілісекунди для створення та анімації частинок.

})

function hexToRgbA(hex) {
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		let c = hex.substring(1).split('')
		if (c.length == 3) { c = [c[0], c[0], c[1], c[1], c[2], c[2]] }
		c = `0x${c.join('')}`
		return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')}, 1`
	} throw new Error('Bad Hex')
}
