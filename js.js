//BETA

var level = "easy"
function start(){
	$("#faces").removeClass("die_smile")
	var ivalue = 0
	var i2value = 0
	var bomblength = 0
	var arajin = 0
	var no_spam = []
	var ok = 0
	var stop_game = false
	$("table").html("")
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
			$(`.${i}`).append(`<td class="${i}x${i2} ${level == 'easy'?'td_easy': level == "medium" ? 'td_medium' : level == "hard"? "td_hard" : ''}"><button class="${i}y${i2}"><p></p></button></td>`)
		}
	}
	update()

function update(){
	//		rigth click

	window.oncontextmenu = (e) => {
		e.preventDefault()
		if (stop_game == false) {
			if ((e.srcElement.localName == "button" && $(`.${e.target.className}`).children("p").html() != "🚩") || (e.srcElement.localName == "p" && e.srcElement.innerHTML != "🚩")) {
				if (e.srcElement.innerHTML[0] == "<") {
					$(`.${e.target.className}`).children("p").html("🚩")
				}
				else{
					e.srcElement.innerHTML = "🚩"
				}
			}
			else{

				if (e.srcElement.innerHTML[0] == "<") {
					$(`.${e.target.className}`).children("p").html("")
				}
				else if(e.target.localName != "td"){
					e.srcElement.innerHTML = ""
				}
				// bomblength--
			}
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

	var kanchel = true

	//empty clear
	function empty(a, a2){
		try{
			if (map[a][a2] == "") {
				$(`.${a}y${a2}`).hide()
				$(`.${a}x${a2}`).html(`<p></p>`)
				try {
					if (map[a][a2 + 1] == "") {
						$(`.${a}y${a2 + 1}`).hide()
						$(`.${a}x${a2 + 1}`).html(`<p></p>`)
					}
				}
				catch{}
				try {
					if (map[a - 1][a2] == "") {
						$(`.${a - 1}y${a2}`).hide()
						$(`.${a - 1}x${a2}`).html(`<p></p>`)
					}
				}
				catch{}
				try {
					if (map[a + 1][a2] == "") {
						$(`.${a + 1}y${a2}`).hide()
						$(`.${a + 1}x${a2}`).html(`<p></p>`)
					}
				}
				catch{}
				try {
					if (map[a - 1][a2 - 1] == "") {
						$(`.${a - 1}y${a2 - 1}`).hide()
						$(`.${a - 1}x${a2 - 1}`).html(`<p></p>`)
					}
				}
				catch{}
				try {
					if (map[a - 1][a2 + 1] == "") {
						$(`.${a - 1}y${a2 + 1}`).hide()
						$(`.${a - 1}x${a2 + 1}`).html(`<p></p>`)
					}
				}
				catch{}
				try {
					if (map[a + 1][a2 - 1] == "") {
						$(`.${a + 1}y${a2 - 1}`).hide()
						$(`.${a + 1}x${a2 - 1}`).html(`<p></p>`)
					}
				}
				catch{}
				try {
					if (map[a + 1][a2 + 1] == "") {
						$(`.${a + 1}y${a2 + 1}`).hide()
						$(`.${a + 1}x${a2 + 1}`).html(`<p></p>`)
					}
				}
				catch{}
				kanchel == true ? kanchi(a, a2) : ""
			}
		}
		catch{}
	}
	function kanchi(a, a2){
		kanchel = false
		empty(a+1, a2+1)
		empty(a-1, a2+1)
		empty(a - 1, a2-1)
		empty(a +1, a2)
		empty(a-1, a2)
		kanchel = true
	}

	//          click
	var map = []
	$("td button").click(function(e){
		if (e.target.innerText  != "🚩" && stop_game == false) {
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
					try{
						if (map[(e.currentTarget.className).split("y")[0]][(e.currentTarget.className).split("y")[1] - i] != "💣") {
							if (map[(e.currentTarget.className).split("y")[0]][(e.currentTarget.className).split("y")[1] - i] == "") {
								empty(Number(e.currentTarget.className.split("y")[0]), Number(e.currentTarget.className.split("y")[1]))
							}
							$(`.${text}`).hide()
							$(`.${text.replace("y", "x")}`).html(`<p class="color_${(map[text.split("y")[0]][text.split("y")[1]])}">${(map[text.split("y")[0]][text.split("y")[1]])} </p>`)
						}
					}
					catch{}
					

					text = `${(e.currentTarget.className).split("y")[0] - 1}y${(e.currentTarget.className).split("y")[1] - i}`

					try{
						if (map[((e.currentTarget.className).split("y")[0] - 1)][((e.currentTarget.className).split("y")[1] - i)] != "💣") {
							if (map[((e.currentTarget.className).split("y")[0] - 1)][((e.currentTarget.className).split("y")[1] - i)] == "") {
								empty(Number(e.currentTarget.className.split("y")[0]), Number(e.currentTarget.className.split("y")[1]))
							}
							$(`.${text}`).hide()
							$(`.${text.replace("y", "x")}`).html(`<p class="color_${(map[text.split("y")[0]][text.split("y")[1]])}">${(map[text.split("y")[0]][text.split("y")[1]])} </p>`)
						}
					}
					catch{}
					text = ''
				}
			}
			else{
				try{
					if (map[Number(e.currentTarget.className.split("y")[0])][Number(e.currentTarget.className.split("y")[1])] == "") {
						empty(Number(e.currentTarget.className.split("y")[0]), Number(e.currentTarget.className.split("y")[1]))
					}
					else{
						$(`.${e.currentTarget.className.replace("y", "x")}`).html(`<p class="color_${map[e.currentTarget.className.split("y")[0]][e.currentTarget.className.split("y")[1]]}">${map[e.currentTarget.className.split("y")[0]][e.currentTarget.className.split("y")[1]]}</p>`)
						$(`.${e.currentTarget.className}`).hide()
					}
				}catch{}
				if ($(`.${e.currentTarget.className.replace("y", "x")} p`).html() == "💣") {
					for (var i = 0; i < map.length; i++) {
						for (var i2 = 0; i2 < map[0].length; i2++) {
							if (map[i][i2] == "💣") {
								$(`.${i}x${i2}`).html("💣")
							}
						}
					}
					alert("game over")
					$("#faces").addClass("die_smile")
					stop_game = true
				}
			}
		}
		stugel_haxtec()
	})
	function stugel_haxtec(){
		if (arajin != 0) {
			for (var i = 0; i < $("button").length; i++) {
				try{
					if (map[(($("button")[i].className).split("y")[0])][(($("button")[i].className).split("y")[1])] != "💣"){
						return ""
					}
				}
				catch{}
			}
			if (stop_game == false) {
				alert("You win😁")
				stop_game = true
			}
		}
	}
	}
	$("#faces").on("mousedown", function(e){
		$(this).addClass("click_smile")
	})
	$("#faces").on("mouseout", function(e){
		$(this).removeClass("click_smile")
	})
	$("#faces").on("mouseup", function(e){
		$(this).removeClass("click_smile")
	})
	$("button").on("mousedown", function(e){
		$("#faces").addClass("hmm_smile")
	})
	$("button").on("mouseout", function(e){
		$("#faces").removeClass("hmm_smile")
	})
	$("button").on("mouseup", function(e){
		$("#faces").removeClass("hmm_smile")
	})
}
start()