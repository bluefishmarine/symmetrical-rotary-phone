var squaresList = document.querySelectorAll(".square");
var mode = "hard";

function setHeader(value){ /***Sets Header value for game*****/
	createRGBList.createList(value);
	colors.textContent = createRGBList.list[getRandomIntInclusive(0, value-1)];
}

function reset(value){
	createRGBList.purgeList();
	setHeader(value);
	colorizeSquares();
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fadeOut(obj) {   
  var pos = 1;
  var id = setInterval(frame, 50);
  function frame() {
    if (pos < 0) {
      clearInterval(id);
    } else {
      pos=pos-0.1; 
      obj.style.opacity = pos;  
    }
  }
}
function fadeIn(obj) {   
  var pos = 0;
  var id = setInterval(frame, 50);
  function frame() {
    if (pos >= 1) {
      clearInterval(id);
    } else {
      pos=pos+0.1; 
      obj.style.opacity = pos; 
    }
  }
}

function generateRGB(){
	var red = getRandomIntInclusive(0, 255);
	var green = getRandomIntInclusive(0, 255);
	var blue = getRandomIntInclusive(0, 255);
	var rgbString = "RGB("+red+", "+green+", "+blue + ")";
	return rgbString; 
}

var createRGBList = {
  list:[],
  createList: function(val){
    for (var x = 1; x<=val; x++){
		createRGBList.list.push(generateRGB());
	  }
  },
  purgeList:function(){
  	createRGBList.list.splice(0);
  }
}

createRGBList.createList(6);
colors.textContent = createRGBList.list[getRandomIntInclusive(0, 5)];
colorizeSquares();

function colorizeSquares(){
	for(var x = 0, rgbLength = createRGBList.list.length; x<rgbLength; x++){
		squaresList[x].style.backgroundColor = createRGBList.list[x];
	}	
}

function matchColor(){
	var currentSquare = this;
	var currentColor = colors.textContent.substring(3,colors.textContent.length-1);
	if (this.style.backgroundColor==colors.textContent.toLowerCase()){
		(function(){
			var pos = 0;
  			var id = setInterval(frame, 50);
  			function frame() {
			    if (pos >= 1) {
			      clearInterval(id);
			    } else {
			      pos=pos+0.1; 
			      header.style.backgroundColor = "rgba" +currentColor + ", "  + pos + ")";
			      	for(var x = 0, rgbLength = createRGBList.list.length; x<rgbLength; x++){
						squaresList[x].style.backgroundColor = colors.textContent;
						squaresList[x].style.opacity = pos;
					}
			    }
			  }
		})();
		alert("Correct!");
		newcolors.textContent = "Play Again?";
	}else{
		fadeOut(currentSquare);
	}
}

for(var x = 0, squareLength = squaresList.length; x<squareLength; x++){
		squaresList[x].addEventListener("click",matchColor);
	}	

newcolors.addEventListener("click",function(){
	header.style.backgroundColor = "rgb(255,255,255)";
	createRGBList.purgeList();
	if (mode=="hard"){
		setHeader(6);
	}else{
		setHeader(3);
	}
	colorizeSquares();
	for(var x = 0, squareLength = squaresList.length; x<squareLength; x++){
		fadeIn(squaresList[x]);
	}
	newcolors.textContent = "New Colors";
})

easy.addEventListener("click",function(){
	this.classList.add("active");
	hard.classList.remove("active");
	squaresList[3].style.visibility = "hidden";
	squaresList[4].style.visibility = "hidden";
	squaresList[5].style.visibility = "hidden";
	reset(3);
	mode = "easy";
})

hard.addEventListener("click",function(){
	this.classList.add("active");
	easy.classList.remove("active");
	squaresList[3].style.visibility = "initial";
	squaresList[4].style.visibility = "initial";
	squaresList[5].style.visibility = "initial";
	reset(6);
	mode = "hard";
})