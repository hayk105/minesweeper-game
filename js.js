var level = "easy"
var ivalue = 0
var i2value = 0
var bomblength = 0
var arajin = 0
var no_spam = []
var ok = 0

function start(){
	if (level == "easy") {
		ivalue = 8
		i2value = 10
		bomblength = 10
	}
	else if(level == "medium"){
		i2value = 18
		ivalue = 14
		bomblength = 40
	}
	else if(level == 'hard'){
		i2value = 24
		ivalue = 20
		bomblength = 99
	}
	for (var i = 0; i < ivalue; i++) {
		$("table").append(`<tr class="${i}"></tr>`)
		for (var i2 = 0; i2 < i2value; i2++) {
			$(`.${i}`).append(`<td class="${i}x${i2}"><button class="${i}y${i2}">&#10240;&#10240;</button></td>`)
		}
	}
}
start()

//		rigth click

window.oncontextmenu = (e) => {
	e.preventDefault()
	if ($(`.${e.target.className}`).html() == "🚩" && $(`.${e.target.className}`)[0].localName == "button") {
		$(`.${e.target.className}`).html("&#10240;&#10240;")
		bomblength++
	}
	else if($(`.${e.target.className}`)[0].localName == "button"){
		$(`.${e.target.className}`).html("🚩")
		bomblength--
	}
}

// generate
function generate_bombs(a){
	while(ok != bomblength){
		var rand1 = Math.floor(Math.random() * ivalue)
		var rand2 = Math.floor(Math.random() * i2value)
		var error = 0
		if (map[rand1][rand2] == "" && rand1 != a.split("y")[0] && rand2 != a.split("y")[1]) {
			for (var i = 0; i < no_spam.length; i++) {
				if (rand1 == no_spam[i].split("y")[0] && rand1 == no_spam[i].split("y")[1]) {
					error = 1
				}
			}
			if (error == 0) {
				map[rand1][rand2] = "💣"
				ok++
			}
		}
	}
	number_generate()
}

// number generate

function number_generate(){
	var qani = 0
	for (var i = 0; i < map.length; i++) {
		for (var i2 = 0; i2 < map[0].length; i2++) {
			if (map[i][i2] != "💣")  {
				try{
					if (map[i][i2 - 1] == "💣") {
						qani++
					}
				}
				catch{}
				try {
					if (map[i][i2 + 1] == "💣") {
						qani++
					}
				}
				catch{}
				try {
					if (map[i - 1][i2] == "💣") {
						qani++
					}
				}
				catch{}
				try {
					if (map[i + 1][i2] == "💣") {
						qani++
					}
				}
				catch{}
				try {
					if (map[i - 1][i2 - 1] == "💣") {
						qani++
					}
				}
				catch{}
				try {
					if (map[i - 1][i2 + 1] == "💣") {
						qani++
					}
				}
				catch{}
				try {
					if (map[i + 1][i2 - 1] == "💣") {
						qani++
					}
				}
				catch{}
				try {
					if (map[i + 1][i2 + 1] == "💣") {
						qani++
					}
				}
				catch{}
				map[i][i2] = qani == 0 ? "" : qani
				qani = 0
			}
		}
	}
	console.log(map)
}




//          click
var map = []
$("td button").click(function(e){
	arajin++
	if (arajin == 1) {
		// poqr 3 hide
		for (var i2 = 0; i2 < ivalue; i2++) {
			map.push([])
			for (var i3 = 0; i3 < i2value; i3++) {
				map[i2].push("")
			}
		}
		generate_bombs(e.currentTarget.className)
		var text = ""
		for (var i = -2; i <= 2; i++) {
			text = `${(e.currentTarget.className).split("y")[0]}y${(e.currentTarget.className).split("y")[1] - i}`

			if (map[(e.currentTarget.className).split("y")[0]][(e.currentTarget.className).split("y")[1] - i] != "💣") {
				$(`.${text}`).hide()
				$(`.${text.replace("y", "x")}`).html((map[text.split("y")[0]][text.split("y")[1]]))
			}
			

			text = `${(e.currentTarget.className).split("y")[0] - 1}y${(e.currentTarget.className).split("y")[1] - i}`

			if (map[((e.currentTarget.className).split("y")[0] - 1)][((e.currentTarget.className).split("y")[1] - i)] != "💣") {
				$(`.${text}`).hide()
				$(`.${text.replace("y", "x")}`).html(map[text.split("y")[0]][text.split("y")[1]])
			}
			text = ''
		}
	}
	else{
		$(`.${e.currentTarget.className.replace("y", "x")}`).html(map[e.currentTarget.className.split("y")[0]][e.currentTarget.className.split("y")[1]])
		$(`.${e.currentTarget.className}`).hide()
	}
})