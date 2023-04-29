//BETA
var level="easy"
var record = 999
var coin = 9999
var no_flag = 0
var metal_search = 0
var noric_cnvel = 0
var use_tools = false
var map =[]
function start(){
	map=[]
	use_tools=false
	up_coin()
	$("#you_win").hide()
	$("#you_lose").hide()
	$('#you_win').css("opacity", 0)
	$('#you_lose').css("opacity", 0)
	$("#faces").removeClass("die_smile")
	var h=$("#mines_hundreds")
	var t=$("#mines_tens")
	var o=$("#mines_ones")
	var ivalue=0
	var i2value=0
	var bomblength=0
	var no_spam=[]
	var stop_game=false
	$("table").html("")
	if (level=="easy"){
		ivalue=8
		i2value=10
		bomblength=10
	}
	else if(level=="medium"){
		i2value=18
		ivalue=14
		bomblength=40
	}
	else if(level=='hard'){
		i2value=24
		ivalue=20
		bomblength=99
	}
	var flaglength=bomblength
	flag()
	for (var i=0; i < ivalue; i++){
		$("table").append(`<tr class="${i}"></tr>`)
		for (var i2=0; i2 < i2value; i2++){
			$(`.${i}`).append(`<td class="${i}x${i2} td_${level}"><button class="${i}y${i2}"><p></p></button></td>`)
		}
	}
	update()
function flag(){
	var stugel_flag_length=0
	for (var i=0; i < $("button").length; i++){
		if (($("button")[i]).children[0].innerText=="🚩"){
			stugel_flag_length++
		}
	}
	bomblength-stugel_flag_length!=flaglength?flaglength=bomblength - stugel_flag_length:""
	delete stugel_flag_length
	h.removeClass()
	t.removeClass()
	o.removeClass()
	h.addClass("flag_length")
	t.addClass("flag_length")
	o.addClass("flag_length")
	var flaglength_string=String(flaglength).length
	h.addClass(`number${String(flaglength)[flaglength_string-3]}`)
	t.addClass(`number${String(flaglength)[flaglength_string-2]}`)
	o.addClass(`number${String(flaglength)[flaglength_string-1]}`)
}
function update(){
//rigth click
	window.oncontextmenu=(e)=>{
		e.preventDefault()
		if (stop_game==false && use_tools ==false){
			if ((e.srcElement.localName=="button" && $(`.${e.target.className}`).children("p").html() !="🚩")||(e.srcElement.localName=="p"&&e.srcElement.innerHTML !="🚩")){
				if (e.srcElement.innerHTML[0]=="<"){
					$(`.${e.target.className}`).children("p").html("🚩")
				}
				else{
					e.srcElement.innerHTML="🚩"
				}
				flaglength--
			}
			else{

				if (e.srcElement.innerHTML[0]=="<"  && e.srcElement.innerHTML[1] !="b"){
					$(`.${e.target.className}`).children("p").html("")
					flaglength++
				}
				else if(e.target.localName !="td" && e.target.localName !="span"){
					e.srcElement.innerHTML=""
					flaglength++
				}
			}
			flag()
		}
	}
// generate
	function generate_bombs(a){
		var ok=0
		while(ok !=bomblength){
			var rand1=Math.floor(Math.random()*ivalue)
			var rand2=Math.floor(Math.random()*i2value)
			var error=0
			if (map[rand1][rand2]==""&&rand1!=a.split("y")[0]&&rand2!=a.split("y")[1]){
				for (var i=0; i < no_spam.length; i++){
					if (rand1==no_spam[i].split("y")[0] && rand1==no_spam[i].split("y")[1]){
						error=1
					}
				}
				if (error==0){
					map[rand1][rand2]="💣"
					ok++
				}
			}
		}
		number_generate()
		delete ok, error, rand1, rand2
	}
var method=[[0,0],[1,1],[-1,-1],[1,-1],[-1,1],[0,1],[0,-1],[1,0],[-1,0]]
// number generate
	function number_generate(){
		var qani=0
		for (var i=0; i<map.length; i++){
			for (var i2=0; i2 < map[0].length; i2++){
				if (map[i][i2] !="💣") {
					for (var i3 = 1; i3 <= 8; i3++) {
						try{map[i+method[i3][0]][i2+method[i3][1]]=="💣"?qani++ :""}
						catch{}
					}
					map[i][i2]=qani==0 ?"":qani
					qani=0
				}
			}
		}
		console.log(map)
	}
	var kanchel=true
	var arr=[]
//empty clear
	function empty(a, a2){
		try{
			if (map[a][a2]==""){
				for (var i=0; i < method.length; i++){
					try{
						if ((map[a + method[i][0]][a2 + method[i][1]] !="💣" && $(`.${a + method[i][0]}y${a2 + method[i][1]}`).children("p")[0].innerText !="🚩")){
							$(`.${a+ method[i][0]}y${a2+ method[i][1]}`).hide()
							$(`.${a+ method[i][0]}x${a2+ method[i][1]}`).html(`<span class="color_${map[a + method[i][0]][a2+ method[i][1]]}">${map[a+ method[i][0]][a2+ method[i][1]]}</span>`)
							map[a + method[i][0]][a2 + method[i][1]]==""?()=>{arr +=[[a + method[i][0]], [a2 + method[i][1]]]}:""
						}
					}catch{}
				}
				kanchel==true ? kanchi(a, a2) : "";
			}
		}catch{}
	}
	function kanchi(a, a2){
		kanchel=false
		for (var i=0;i<method.length;i++){
			empty(a+method[i][0], a2+method[i][1])
		}
		arr.length!=0?()=>{
			for (var i=0; i < arr.length; i++){
				empty(arr[i][0]+method[i][0], arr[i][1]+method[i][1])
			}}
		:""
		arr=[]
		kanchel=true
	}
//game over
	function game_over(){
		for (var i3=0;i3<map.length;i3++){
			for (var i4=0;i4<map[0].length;i4++){
				if (map[i3][i4]=="💣"){
					$(`.${i3}x${i4}`).addClass("color_💣")
					$(`.color_💣`).html(`<span>💣</span>`)
				}
			}
		}
		$("#faces").addClass("die_smile")
		$("#you_lose").show()
		$("#you_lose").animate({
			opacity: 1,
		}, 1000)
		stop_game=true
	}
//split round
	function splitauto(a,b,t){
		var calc=0
		for(var i=0;i< method.length;i++){
			try{
				$(`.${eval(a)+method[i][0]}y${eval(b)+method[i][1]}`).children("p")[0].innerText=="🚩"?calc++:''
			}catch{}
		}
		if (calc==eval(t[0].innerText)){
			for (var i=0;i<method.length;i++){
				try{
					if($(`.${eval(a)+eval(method[i][0])}y${eval(b)+eval(method[i][1])}`).children("p")[0].innerText !="🚩"){
						$(`.${eval(a)+eval(method[i][0])}y${eval(b)+eval(method[i][1])}`).hide()
						$(`.${eval(a)+eval(method[i][0])}x${eval(b)+eval(method[i][1])}`).html(`<span class="color_${map[eval(a)+eval(method[i][0])][eval(b)+eval(method[i][1])]}">${map[eval(a)+eval(method[i][0])][eval(b)+eval(method[i][1])]}</span>`)
						if (map[eval(a)+eval(method[i][0])][eval(b)+eval(method[i][1])]=="💣"){
							game_over()
						}
						else if (map[eval(a)+eval(method[i][0])][eval(b)+eval(method[i][1])]==""){
							empty(eval(a)+eval(method[i][0]),eval(b)+eval(method[i][1]))
						}
					}
				}catch{}
			}
		}
		stugel_haxtec()
	}
	$("td").click(function(e){
		if(e.target.localName=="span"){
			try{
				splitauto(($(this).parents("td").prevObject[0].classList[0].split('x')[0]), $(this).parents("td").prevObject[0].classList[0].split('x')[1], $(this));
			}catch{}
		}
	})
	//use noric cnvel
	$(".noric_cnvel2").click(function(){
		if (noric_cnvel!=0&&use_tools==false) {
			noric_cnvel-=1
			use_tools=true
			$("#you_lose").hide()
			for (var i = 0; i < $(".color_💣").length; i++) {
				($(".color_💣")[i]).innerHTML=`<button class="${($(".color_💣")[i].classList[0]).replace("x", "y")}"><p></p></button>`
			}
			$(".color_💣").removeClass("color_💣")
			$("button")[0].click()
			$("#faces").removeClass("die_smile")
			use_tools=false
			stop_game=false
		}
		$("td button").click(function(e){
			click_button(e)
		})
	})
	//          click
	$("td button").click(function(e){
		click_button(e)
	})
	function click_button(e){
		var e_class=e.currentTarget.className
		flag()
		if (e.target.innerText!="🚩"&&stop_game==false&&use_tools==false){
			if (!map.length){
				set(0)
				// poqr 3 hide
				for (var i2=0; i2<ivalue;i2++){
					map.push([])
					for (var i3=0; i3<i2value;i3++){
						map[i2].push("")
					}
				}
				generate_bombs(e_class)
				var text=""
				for (var i=-2; i <=2; i++){
					text=`${(e_class).split("y")[0]}y${(e_class).split("y")[1] - i}`
					var hide=$(`.${text}`).hide()
					try{
						if (map[(e_class).split("y")[0]][(e_class).split("y")[1] - i] !="💣" && $(`.${(e_class).split("y")[0]}y${(e_class).split("y")[1] - i}`).children("p")[0].innerText !="🚩"){
							if (map[(e_class).split("y")[0]][(e_class).split("y")[1] - i]==""){
								empty(Number(e_class.split("y")[0]), Number(e_class.split("y")[1] - i))
							}
							hide
							$(`.${text.replace("y", "x")}`).addClass(`color_${map[(e_class).split("y")[0]][(e_class).split("y")[1] - i]}`)
							$(`.${text.replace("y", "x")}`).html(`<span>${map[(e_class).split("y")[0]][(e_class).split("y")[1] - i]}</span>`)
						}
					}catch{}
					try{
						if (map[((e_class).split("y")[0] - 1)][((e_class).split("y")[1] - i)] !="💣" && $(`.${(e_class).split("y")[0] - 1}y${(e_class).split("y")[1] - i}`).children("p")[0].innerText !="🚩" && $(`.${text.replace("y", "x")}`).children("span")[0].innerText==""){
							if (map[((e_class).split("y")[0] - 1)][((e_class).split("y")[1] - i)]==""){
								empty(Number(e_class.split("y")[0] - 1), Number(e_class.split("y")[1] - i))
							}
							hide
							$(`.${text.replace("y", "x")}`).addClass(`color_${map[e_class.split("y")[0] - 1][e.e_class.split("y")[1] - i]}`)
						}
					}catch{}
					text=''
				}
				delete hide
			}
			else{
				try{
					if (map[Number(e_class.split("y")[0])][Number(e_class.split("y")[1])]==""){
						empty(Number(e_class.split("y")[0]), Number(e_class.split("y")[1]))
					}
					else{
						$(`.${e_class.replace("y", "x")}`).addClass(`color_${map[e_class.split("y")[0]][e_class.split("y")[1]]}`)
						$(`.${e_class}`).hide()
					}
				}catch{}
				if ($(`.${e_class.replace("y", "x")}`)[0].attributes[0].nodeValue.split(" ")[$(`.${e_class.replace("y", "x")}`)[0].attributes[0].nodeValue.split(" ").length - 1]=="color_💣"){
					game_over()
				}
			}
		}
		for (var i=1; i < 9; i++){
			$(`.color_${i}`).html(`<span>${i}</span>`)	
		}
		stugel_haxtec()
	}

	// stugel haxtec xaxy
	function stugel_haxtec(){
		if (map.length){
			if (stop_game==false && $("td button").length==bomblength){
				set(2)
				set(1)<record?record=set(1):''
				$("#record").html(`YOUR RECORD: ${record}s`)
				$("#score").html(`YOUR SCORE: ${set(1)}s`)
				$("#coin").html(`${level=="easy"?"10💰":level=="medium"?"20💰":"50💰"}`)
				level=="easy"?coin+=10:level=="medium"?coin+=20:coin+=50
				$("#you_win").show()
				$("#you_win").animate({
					opacity: 1,
				}, 1000)
				stop_game=true
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
		if (e.which==1){
			$("#faces").addClass("hmm_smile")
		}
	})
	$("button").on("mouseout", function(e){
		if (e.which==1){
			$("#faces").removeClass("hmm_smile")
		}
	})
	$("button").on("mouseup", function(e){
		if (e.which==1){
			$("#faces").removeClass("hmm_smile")
		}
	})
}
$("select").on("change", function(e){
	level=$(this).val()
	start()
})
start()

$("#close").click(function(){
	$("#shop_page").hide()
})
$("#shop").click(function(){
	$("#shop_page").toggle()
})
function akcia_buy(){
	if (coin >= 500) {
		no_flag += 3
		metal_search += 3
		noric_cnvel += 3
		coin-=500
		up_coin()
	}
}

function up_coin(){
	$("#coin_value").html(`${coin}💰`)
	no_flag == 0 ?$(".tools .no_flag").css('filter', " grayscale(100%)"):$(".tools .no_flag").css('filter', " grayscale(0%)")
	metal_search == 0 ?$(".tools .metal").css('filter', " grayscale(100%)"):$(".tools .metal").css('filter', " grayscale(0%)")
	noric_cnvel == 0 ?$(".tools .noric_cnvel2").css('filter', " grayscale(100%)"):$(".tools .noric_cnvel2").css('filter', " grayscale(0%)")
}
function buy(price, add){
	if (coin>=price) {
		coin-=price
		add=="metal_search"?metal_search+=1:add=="no_flag"?no_flag+=1:noric_cnvel+=1
		up_coin()
	}
}
//use metal searcher
$(".metal").click(function(){
	if (metal_search!=0&&use_tools==false) {
		var sxmec=false
		var event
		metal_search-=1
		use_tools=true
		$("table td").on("mouseover", function(e) {
			var method2 = [[0, -2], [1, -2], [-1, -2], [-2, -2], [2, -2], [2, -1], [2, 0], [2, 1], [2, 2],  [2, 2], [1, 2], [0, 2], [-1, 2], [-2, 2], [-2, 1], [-2, 0], [-2, -1]]
			if (sxmec==false) {
				event=e
				$("table td").removeClass("border-right")
				$("table td").removeClass("border-bottom")
				$("table td").removeClass("border-top")
				$("table td").removeClass("border-left")
				for (var i = 0; i < method2.length; i++) {
					var c_e = (e.currentTarget.className.split(' ')[0]).split('x')
					$(`.${eval(c_e[0])-method2[i][0]}x${eval(c_e[1])-method2[i][1]}`).addClass(`${i<=2?"border-right":i==3?"border-right border-bottom":i==4?"border-top border-right":i>=3&&i<=8?"border-top":i>=8&&i<13?"border-left":i==13?"border-left border-bottom":i>13?"border-bottom":""}`)
				}
			}
		})
		$("table td").click(function(){
			if (sxmec==false) {
				var c_e2 = (event.currentTarget.className.split(' ')[0]).split('x')
				sxmec=true
				var hashvel=0
				for (var i =eval(c_e2[0])-2; i <= eval(c_e2[0])+2; i++) {
					for (var i2 = eval(c_e2[1])-2; i2 <= eval(c_e2[1])+2; i2++) {
						try{
							if ((map[i][i2]=="💣") && ($(`.${i}y${i2}`)[0].innerText!="🚩")) {
								if (hashvel>=3) {
									break
								}
								else{
									hashvel++
									$(`.${i}y${i2}`).html(`<p>🚩</p>`)
								}
							}
						}
						catch{}
					}
				}
				$("table td").removeClass("border-right")
				$("table td").removeClass("border-bottom")
				$("table td").removeClass("border-top")
				$("table td").removeClass("border-left")
				hashvel=0
				smxec=false
				$("button")[0].click()
				use_tools=false
		}
		})
	}
})

//use no flag tool
$(".no_flag").click(function(){
	if (no_flag!=0&&use_tools==false) {
		no_flag-=1
		use_tools=true
		for (var i = 0; i < $("p").length; i++) {
			if ($("button")[i].innerText=="🚩") {
				try{
					map[($("button")[i].classList[0]).split("y")[0]][($("button")[i].classList[0]).split("y")[1]]!="💣"?$(`.${$("button")[i].classList[0]}`).html("<p></p>"):""
				}
				catch{}
			}
		}
		use_tools=false
	}
})
// set timer
	var time = 0
	var timer = 0
	function set(a){
		if (a==0&&timer==0) {
			timer = 0
			time = setInterval(function(){
				timer == 999 ? clearInterval(time) : '';
				timer++;
			}, 1000)
		}
		if (a == 1) {
			return timer;
		}
		a==2?clearInterval(time):''
	}