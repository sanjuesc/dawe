import {Matrix} from './math.js';

var matriz = new Matrix();

//Ariketa 1
for (var i = 0; i < 10; i++) { //errenkadak
	for (var j = 0; j<10; j++){ //Zutabeak
		matriz.set(i,j,10*i + j);
	}
}

//console.log(matriz);

console.log(matriz.forEach(function(valor,x,y){
	//console.log(valor + " " + x + " " + y);
}));

//Ariketa 2
function get(url){

	return new Promise(function(resolve, reject){

		var req = new XMLHttpRequest();
		req.open('GET',url);

		req.onload = function(){

			if(req.status == 200){
				resolve(req.response);
			}
			else{
				reject(Error(req.statusText));
			}
		};

		req.onerror = function(){
			reject(Error("Network Error"));
		};

		req.send();

	});
}

function loadJSON(url){
	return get(url).then(JSON.parse);
}

//Ariketa 3
export function loadImage(url){
	return get(url).then(Image.parse);
}

console.log(loadJSON("./levels/level.json"))
console.log(loadImage("./levels/level.json"))


//Ariketa 4

function loadSpriteSheet(){

	var sheetSpec = loadJSON("./sprites/sprites.json");
	console.log("Sprites: " + sheetSpec);
}

console.log(loadSpriteSheet())