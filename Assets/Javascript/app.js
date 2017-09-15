
$("audio").attr('src', 'Assets/Audio/Lion.mp3');
$(".start").click(begin)

var timeInter
var num = 5;
var quess = [];
var chosen;
var left = 4;
var right = 0;
var wrong = 0;
var notGuess = 0;
var running = false;

//build question object	, the last object is always the correct answer
	function buildQues(ques, answ1, answ2, answ3, answ4, img){

		var object = {};
		object.ques = ques;
		object.fir = answ1;
		object.sec = answ2;
		object.thi = answ3;
		object.right = answ4;
		object.img = img;
		quess.push(object)
	}

//build questiones
	function callbuild(){
		buildQues("Which university is the most expensive for Master of Architecture?","Rutger","UC. Berkley","Harvard","Columbia","2.gif")
		buildQues("What is the chance of finding nemo","1/27500","1/28500","1/275000","1/285000","1.gif")
		buildQues("Which is special feature in Venice?", "Pizza","Best Seafood Spaghetti", "Masks", "Gandola","3.gif")
		buildQues("How many statues are there on colonnades in St.Peter Basilica?", "110","120","130","140","4.gif")
	}
	callbuild()

//set up timer

	function begin(){
		
		if(left > 0){
//clear all the divs and reset number
			reset();
			start();

			$(".start").hide();
			$(".time").html("Time Remaining: " + num);

			
	//call display function to display question
			display();
			$(".answer").click(check)

		}else{
			result();

		}
	}

//set up timer-------------------------------------
	function reset(){
		$(".question").empty();
		num = 5;
	}

	function start(){
		if(!running){
		timeInter = setInterval(countDown,1000);
		running = true;
		}
	}

	function countDown(){

		num--;
		if(num < 0){
			num = 0;
			clear();
			showCorrect("What are you waiting for?", "The answer is " + chosen.right);
			notGuess++

		}
		$(".time").html("Time Remaining: " + num);			
	}

	function clear(){

		clearInterval(timeInter);
		running = false;
	}

//-----------------------------------------------------



//make question dispaly on page
	function display(){
		var random = Math.floor(Math.random() * quess.length)
		chosen = quess[random]
		quess.splice(random,1)
	//make a functin that take argument, make div and add it to page
			function makediv(x, i){

				var div = $("<div>" + x + "</div>")
				div.attr("class", i);
				$(".question").append(div);
			}
	//add  question	to page	
			makediv(chosen.ques, "quest") ;
	//make answers display in random order on to page;
		var array2 = ["fir", "sec", "thi", "right"]
			function add(){
				var random2 = Math.floor(Math.random() * array2.length)
				makediv(chosen[array2[random2]], "answer" + " " + array2[random2]);
				array2.splice(random2,1)
			}
		
	//keep add answers to page until all are added
			while(array2.length > 0){
				add()
			}
	}

//user interaction  click-------------------------------------------------------

	function check(){
		clear()
		if(this.className === "answer right"){
			showCorrect("That is Correct!", "")
			right++
		}else{
			showCorrect("Sadly Wrong","The answer is " + chosen.right)

			wrong++
		}
	}

//generate the correct answer
	function showCorrect(x, y){
		$(".question").html(x + "</br>" + y);
		$(".question").append("<img src = 'Assets/Images/" + chosen.img + "' class = 'gif'>" )  

		setTimeout(begin,5000) ;
		left--; 
	}
// final result:
	function result(){
		$(".question").html("Done" + "</br>" + " Here is how you do");
		$(".question").append("<div> Correct Answers: " + right +"</div>");
		$(".question").append("<div> Wrong Answers: " + wrong +"</div>");
		$(".question").append("<div> Unchosen: " + notGuess +"</div>");
		$(".question").append("<div id = 'again'> Start Over</div>");	
	}

	$(".question").on("click","#again", function(){ 
		left = 4;
		callbuild();
		begin();
		console.log("fn")})






