var level = "easy"
var ivalue = 0
var i2value = 0
var bomblength = 0

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
			$(`.${i}`).append(`<td class="${i}x${i2}"><button class="${i}y${i2} true"></button></td>`)
		}
	}
}
start()

//		rigth click

// window.oncontextmenu = (e) => {
//   e.preventDefault()
// }
window.oncontextmenu = (e) => {
	e.preventDefault()
	if (e.target.className.split(" ")[1] == "true") {
		$(`.${(e.target.className.split(" ")[0]).replace("y", "x")}`).html(`<img src='flag.png' alt='' class='${e.target.className.split(" ")[0]} false'>`)
	}
	else{
		$(`.${(e.target.className.split(" ")[0]).replace("y", "x")}`).html(`<button class='${e.target.className.split(" ")[0]} true'></button>`)
	}
}