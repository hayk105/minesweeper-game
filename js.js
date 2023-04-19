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
	var flaglength = bomblength
	flag()
	for (var i = 0; i < ivalue; i++) {
		$("table").append(`<tr class="${i}"></tr>`)
		for (var i2 = 0; i2 < i2value; i2++) {
			$(`.${i}`).append(`<td class="${i}x${i2} td_${level}"><button class="${i}y${i2}"><p></p></button></td>`)
		}
	}
	update()
function flag(){
	var stugel_flag_length = 0
	for (var i = 0; i < $("button").length; i++) {
		if (($("button")[i]).children[0].innerText == "🚩"){
			stugel_flag_length++
		}
	}
	if (bomblength - stugel_flag_length != flaglength) {
		flaglength = bomblength - stugel_flag_length
	}
	delete stugel_flag_length
	$("#mines_hundreds").removeClass()
	$("#mines_tens").removeClass()
	$("#mines_ones").removeClass()

	$("#mines_hundreds").addClass("flag_length")
	$("#mines_tens").addClass("flag_length")
	$("#mines_ones").addClass("flag_length")
	var flaglength_string = String(flaglength).length
	$("#mines_hundreds").addClass(`number${String(flaglength)[flaglength_string-3]}`)
	$("#mines_tens").addClass(`number${String(flaglength)[flaglength_string-2]}`)
	$("#mines_ones").addClass(`number${String(flaglength)[flaglength_string-1]}`)
}
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
				flaglength--
			}
			else{

				if (e.srcElement.innerHTML[0] == "<"  && e.srcElement.innerHTML[1] != "b") {
					$(`.${e.target.className}`).children("p").html("")
					flaglength++
				}
				else if(e.target.localName != "td" && e.target.localName != "span"){
					e.srcElement.innerHTML = ""
					flaglength++
				}
			}
			flag()
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
	var arr =[]
	var method = [[0, 0], [1, 1], [-1, -1], [1, -1], [-1, 1], [0, 1], [0, -1], [1, 0], [-1, 0]]
	//empty clear
	function empty(a, a2){
		try{
			if (map[a][a2] == "") {
				for (var i = 0; i < method.length; i++) {
					try {
						if ((map[a + method[i][0]][a2 + method[i][1]] != "💣" && $(`.${a + method[i][0]}y${a2 + method[i][1]}`).children("p")[0].innerText != "🚩")) {
							$(`.${a+ method[i][0]}y${a2+ method[i][1]}`).hide()
							$(`.${a+ method[i][0]}x${a2+ method[i][1]}`).html(`<span class="color_${map[a + method[i][0]][a2+ method[i][1]]}">${map[a+ method[i][0]][a2+ method[i][1]]}</span>`)
							map[a + method[i][0]][a2 + method[i][1]] == ""?()=>{arr += [[a + method[i][0]], [a2 + method[i][1]]]}:""
						}
					}
					catch{}
				}
				kanchel == true ? kanchi(a, a2) : "";
			}
		}
		catch{}
	}

	function kanchi(a, a2){
		kanchel = false
		for (var i = 0; i < method.length; i++) {
			empty(a+method[i][0], a2+method[i][1])
		}
		arr.length != 0 ?()=>{
			for (var i = 0; i < arr.length; i++) {
				empty(arr[i][0]+method[i][0], arr[i][1]+method[i][1])
			}}
		:""
		arr = []
		kanchel = true
	}

	//game over

	function game_over(){
		for (var i = 0; i < map.length; i++) {
			for (var i2 = 0; i2 < map[0].length; i2++) {
				if (map[i][i2] == "💣") {
					$(`.${i}x${i2}`).addClass("color_💣")
				}
			}
		}
		alert("game over")
		$("#faces").addClass("die_smile")
		stop_game = true
	}

	//split round
	function splitauto(a, b, t){
		var calc = 0
		for(var i = 0; i < method.length; i++){
			try{
				$(`.${eval(a)+method[i][0]}y${eval(b)+method[i][1]}`).children("p")[0].innerText == "🚩" ? calc++ :''
			}
			catch{}
		}
		if (calc == eval(t[0].innerText)) {
			for (var i = 0; i < method.length; i++) {
				try{
					if($(`.${eval(a)+method[i][0]}y${eval(b)+method[i][1]}`).children("p")[0].innerText != "🚩"){
						$(`.${eval(a)+method[i][0]}y${eval(b)+method[i][1]}`).hide()
						$(`.${eval(a)+method[i][0]}x${eval(b)+method[i][1]}`).html(`<span class="color_${map[eval(a)+method[i][0]][eval(b)+method[i][1]]}">${map[eval(a)+method[i][0]][eval(b)+method[i][1]]}</span>`)
						map[eval(a)+method[i][0]][eval(b)+method[i][1]] == "💣"?game_over():''
					}
				}
				catch{}

			}
		}
		stugel_haxtec()
	}
	var a = setInterval(function(){
		$("span").on("click", function(){
			splitauto(($(this).parents("td")[0].classList[0].split('x')[0]), $(this).parents("td")[0].classList[0].split('x')[1], $(this));
					})
	}, 500)
	//          click
	var map = []

	$("td button").click(function(e){
		flag()
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
						if (map[(e.currentTarget.className).split("y")[0]][(e.currentTarget.className).split("y")[1] - i] != "💣" && $(`.${(e.currentTarget.className).split("y")[0]}y${(e.currentTarget.className).split("y")[1] - i}`).children("p")[0].innerText != "🚩") {
							if (map[(e.currentTarget.className).split("y")[0]][(e.currentTarget.className).split("y")[1] - i] == "") {
								empty(Number(e.currentTarget.className.split("y")[0]), Number(e.currentTarget.className.split("y")[1]))
							}
							$(`.${text}`).hide()
							$(`.${text.replace("y", "x")}`).addClass(`color_${map[e.currentTarget.className.split("y")[0]][e.currentTarget.className.split("y")[1] - i]}`)
						}
					}
					catch{}
					

					try{
						if (map[((e.currentTarget.className).split("y")[0] - 1)][((e.currentTarget.className).split("y")[1] - i)] != "💣" && $(`.${(e.currentTarget.className).split("y")[0]}y${(e.currentTarget.className).split("y")[1] - i}`).children("p")[0].innerText != "🚩") {
							if (map[((e.currentTarget.className).split("y")[0] - 1)][((e.currentTarget.className).split("y")[1] - i)] == "") {
								empty(Number(e.currentTarget.className.split("y")[0]), Number(e.currentTarget.className.split("y")[1]))
							}
							$(`.${text}`).hide()
							$(`.${text.replace("y", "x")}`).addClass(`color_${map[e.currentTarget.className.split("y")[0] - 1][e.currentTarget.className.split("y")[1] - i]}`)
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
						$(`.${e.currentTarget.className.replace("y", "x")}`).addClass(`color_${map[e.currentTarget.className.split("y")[0]][e.currentTarget.className.split("y")[1]]}`)
						$(`.${e.currentTarget.className}`).hide()
					}
				}catch{}
				if ($(`.${e.currentTarget.className.replace("y", "x")}`)[0].attributes[0].nodeValue.split(" ")[$(`.${e.currentTarget.className.replace("y", "x")}`)[0].attributes[0].nodeValue.split(" ").length - 1] == "color_💣") {
					game_over()
				}
			}
		}
		for (var i = 1; i < 9; i++) {
			$(`.color_${i}`).html(`<span>${i}</span>`)	
		}
		$(`.color_💣`).html(`<span>💣</span>`)
		stugel_haxtec()
		for (var i = 0; i < $("td").length; i++) {
			if($("td")[i].classList.length == 4){
				try{
					($("td")[i]).removeClass($("td")[i].classList[3])
				}
				catch{}
				($("td")[i]).html(`<span class="${$("td")[i].classList[2]}">${$("td")[i].classList[2].split('color_')[1]}</span>`)
			}
		}
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
		if (e.which == 1){
			$("#faces").addClass("hmm_smile")
		}
	})
	$("button").on("mouseout", function(e){
		if (e.which == 1){
			$("#faces").removeClass("hmm_smile")
		}
	})
	$("button").on("mouseup", function(e){
		if (e.which == 1){
			$("#faces").removeClass("hmm_smile")
		}
	})
}
$("select").on("change", function(e){
	level = $(this).val()
	start()
})

start()